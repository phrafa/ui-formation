const { Octokit } = require("octokit");
const PermissionService = require("./permissionService");

class OctokitService {
    fleetRepository = "fleet"
    sumupOwner = "sumup"

    constructor(gitHubToken) {
        this.octokit = new Octokit({ auth: `${gitHubToken}` });
    }

    async getAutenticatedAvatar() {
        const data = await this.octokit.rest.users.getAuthenticated();
        return data['data']['avatar_url']
    }

    async getAutenticatedEmailList() {
        const data = await this.octokit.request('GET /user/emails', {
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          });
          return data['data']
    }

    async getSumupEmail() {
        const emails = await this.getAutenticatedEmailList()
        const sumupEmail = emails.filter((email)=>{
            if(!email['email'].includes("sumup.com")) {
                return false;
            }
            return true;
        });
        if(sumupEmail.length > 0) {
            return sumupEmail[0]['email']
        }
        return null
    }
    
    async getAutenticatedTribes() {
        const authenticatedEmail = await this.getSumupEmail()

        const files = await this.octokit.rest.repos.getContent({
            owner: this.sumupOwner,
            repo: this.fleetRepository,
            path: "permissions",
        });

        const yamlFiles = files['data'].filter((file) => {
            if(!file.name.includes(".yaml")) {
                return false
            }
            return true
        })

        const promises = await yamlFiles.map(async (file)=> {
            const content = await this.readFileContent(this.sumupOwner, this.fleetRepository, file.path)
            const ps = new PermissionService();
            const team = await ps.getTeam(content)
            if(team.isMember(authenticatedEmail)) {
                return team
            }
        })
        
        // TODO: refactor promises function
        const teams = (await Promise.all(promises)).filter((team)=> team != undefined)
        return teams
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

        const content = Buffer.from(contentData['data'].content, 'base64').toString();
        return content

    }

}

module.exports = OctokitService;

