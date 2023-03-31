const { Octokit } = require("octokit");
const PermissionService = require("./permissionService");
const Project = require("./../entities/project");
const Environment = require("../entities/environment");
const YamlService = require("./yamlService");
const Team = require("./../entities/team");

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

    async createProjectRepository(project, template) {
        return await this.octokit.rest.repos.createUsingTemplate({
            template_owner: this.sumupOwner,
            template_repo: template,
            owner: "phrafa", // TODO: change to sumup
            name: project.name,
            private: true
        });
    }

    async updateRepositoryWorkflow(project, repo) {
        return this.readFileContent(repo.owner.login, repo.name, `.github/workflows/ci-cd.yaml`)
            .then(content => {
                let config = (new YamlService()).getFileContents(content)

                if (config !== null) {
                    config.env.DEPLOY_INFRA_SERVICE_PATH = `${project.team.getNamespace()}/${project.name}/fleet`
                    config.env.ECR_REPOSITORY = `${project.team.getNamespace()}/${project.name}`
                }

                // TODO: commit file
                return config
            })
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

    async createBranch(repository, branchName, sha) {
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

    async createCommit(repository, path, content, message, userData) {
        const commit = await this.octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: this.sumupOwner,
            repo: repository,
            path: path,
            message: message,
            committer: {
              name: userData.name,
              email: userData.email
            },
            content: content,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        return commit
    }

}

module.exports = OctokitService;
