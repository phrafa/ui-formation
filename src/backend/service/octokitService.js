const { Octokit } = require("octokit");
const PermissionService = require("./permissionService");
const Project = require("./../entities/project");
const Environment = require("../entities/environment");
const YamlService = require("./yamlService");
const DeployInfraService = require("./deployInfraService");

class OctokitService {
    fleetRepository = "fleet"
    deployInfraRepository = "deploy-infra"
    sumupOwner = "sumup"

    constructor(gitHubToken) {
        this.octokit = new Octokit({ auth: `${gitHubToken}` });
    }

    async getAuthenticatedAvatar() {
        const data = await this.octokit.rest.users.getAuthenticated();
        return data['data']['avatar_url']
    }

    async getAuthenticatedUsername() {
        const data = await this.octokit.rest.users.getAuthenticated();
        return data['data']['login']
    }

    async getAuthenticatedEmailList() {
        const data = await this.octokit.request('GET /user/emails', {
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          });
          return data['data']
    }

    async getSumupEmail() {
        const emails = await this.getAuthenticatedEmailList()
        const sumupEmail = emails.filter((email) => {
            return email['email'].includes("sumup.com");
        });
        if(sumupEmail.length > 0) {
            return sumupEmail[0]['email']
        }
        return null
    }
    
    async getAuthenticatedTeams() {
        const authenticatedEmail = await this.getSumupEmail()

        const yamlFiles = await this.readDirContent(this.sumupOwner, this.fleetRepository, "permissions");
        const ps = new PermissionService();

        const promises = await yamlFiles.map(async (file)=> {
            const content = await this.readFileContent(this.sumupOwner, this.fleetRepository, file.path)
            const team = await ps.getTeam(content)
            if(team.isMember(authenticatedEmail)) {
                return team
            }
        })
        
        // TODO: refactor promises function
        return (await Promise.all(promises)).filter((team) => team !== undefined)
    }

    async readFileContent(owner, repository, path) {
        try {
            const contentData = await this.octokit.rest.repos.getContent({
                owner: owner,
                repo: repository,
                path: path
              })

            return Buffer.from(contentData.data.content, 'base64').toString();
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async readFiles(owner, repository, path) {
        return await this.octokit.rest.repos.getContent({
            owner: owner,
            repo: repository,
            path: path,
        });
    }

    async readDirContent(owner, repository, path) {
        const files = await this.readFiles(owner, repository, path);

        return files.data.filter((file) => {
            return file.name.includes(".yaml");
        })
    }

    async readDirs(owner, repository, path) {
        const files = await this.readFiles(owner, repository, path);

        return files.data.filter((file) => {
            return file.type === "dir";
        })
    }

    async getProjectsByTeamNamespace(teams) {
        const namespaces = await teams.map(async (team) => {
            const projects = await this.readDirs(this.sumupOwner, this.deployInfraRepository, `projects/${team.getNamespace()}`)
            return projects.map((file) => {
                return new Project(file.name, team, null)
            })
        })

        const projects = (await Promise.all(namespaces)).flat()
        return await Promise.all(projects.map(async (project) => {
            const environmentsData = await this.readDirs(this.sumupOwner, this.deployInfraRepository, `projects/${project.team.getNamespace()}/${project.name}`)
            project.environments = environmentsData.map((envData)=> new Environment(envData["name"]))
            return project
        }))
    }

    async getDeployInfraContent(project, environment) {
        const content = await this.readFileContent(this.sumupOwner, this.deployInfraRepository, `projects/${project.team.getNamespace()}/${project.name}/${environment.name}/values.yaml`)
        return (new YamlService()).getFileContents(content)
    }

    async createProjectRepository(app, template) {
        return await this.octokit.rest.repos.createUsingTemplate({
            template_owner: this.sumupOwner,
            template_repo: template,
            owner: this.sumupOwner,
            name: app.name,
            include_all_branches: true,
            private: true
        });
    }

    async updateRepositoryWorkflow(app, repo) {
        const ys = new YamlService()
        let config = require("./../templates/ci-cd.json")

        if (config !== null) {
            config.env.DEPLOY_INFRA_SERVICE_PATH = `${app.namespace}/${app.name}/fleet`
            config.env.ECR_REPOSITORY = 'receivables-br/tobepaid-proxy'
        }

        const configYaml = Buffer.from(ys.createFileContents(config)).toString('base64')

        return this.createCommit(repo.owner.login, repo.name, `.github/workflows/ci-cd.yaml`, "develop", configYaml, "Update ci-cd workflow")
    }

    async getBranchSha(repository, branchName) {
        const branches = await this.octokit.request('GET /repos/{owner}/{repo}/branches/{branch}', {
            owner: this.sumupOwner,
            repo: repository,
            branch: branchName,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        return branches['data']['commit']['sha']   
    }

    async createBranch(repository, branchName) {
        const sha = await this.getBranchSha(repository, "master")
        const branch = await this.octokit.request('POST /repos/{owner}/{repo}/git/refs', {
            owner: this.sumupOwner,
            repo: repository,
            ref: `refs/heads/${branchName}`,
            sha: sha,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        return branch['data']
    }

    async createCommit(owner, repository, path, branch, content, message) {
        const sha = await this.getBranchSha(repository, branch)
        const commit = this.octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: owner,
            repo: repository,
            path: path,
            branch: branch, 
            sha: sha,
            message: message,
            content: content
        });
        
        return commit
    }

    async createPullRequest(repository, appName, branchName) {
        const pr = await this.octokit.request('POST /repos/{owner}/{repo}/pulls', {
            owner: this.sumupOwner,
            repo: repository,
            title: `create app ${appName}`,
            body: 'Automation to create fleet app!',
            head: branchName,
            base: 'master',
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        return pr
    }

    createDeployInfraFiles(app) {
        const ds = new DeployInfraService()

        return [
            {
                name: "Chart.yaml",
                content: Buffer.from(ds.createChartContent(app)).toString('base64')
            },
            {
                name: "values.yaml",
                content: Buffer.from(ds.createAppContent(app)).toString('base64')
            }
        ]
    }

}

module.exports = OctokitService;
