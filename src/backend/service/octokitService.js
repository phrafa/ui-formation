const { Octokit } = require("octokit");
const PermissionService = require("./permissionService");
const Project = require("./../entities/project");

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

        const promises = await yamlFiles.map(async (file)=> {
            const content = await this.readFileContent(this.sumupOwner, this.fleetRepository, file.path)
            const ps = new PermissionService();
            const team = await ps.getTeam(content)
            if(team.isMember(authenticatedEmail)) {
                return team
            }
        })
        
        // TODO: refactor promises function
        return (await Promise.all(promises)).filter((team) => team !== undefined)
    }

    async readFileContent(owner, repository, path) {
        const contentData = await this.octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: owner,
            repo: repository,
            path: path,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          })

        return Buffer.from(contentData['data'].content, 'base64').toString();

    }

    async readFiles(owner, repository, path) {
        return await this.octokit.rest.repos.getContent({
            owner: this.sumupOwner,
            repo: repository,
            path: path,
        });
    }

    async readDirContent(owner, repository, path) {
        const files = await this.readFiles(owner, repository, path);

        return files['data'].filter((file) => {
            return file.name.includes(".yaml");
        })
    }

    async readDirs(owner, repository, path) {
        const files = await this.readFiles(owner, repository, path);

        return files['data'].filter((file) => {
            return file.type === "dir";
        })
    }

    async getProjectsByTeamNamespace(teams) {
        const namespaces = await teams.map(async (team) => {
            const projects = await this.readDirs(this.sumupOwner, this.deployInfraRepository, `projects/${team.getNamespace()}`)
            return projects.map((file) => new Project(file.name, team.getNamespace(), team.getSquad()))
        })

        return (await Promise.all(namespaces)).flat()
    }
}

module.exports = OctokitService;
