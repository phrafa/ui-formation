const { Octokit, App } = require("octokit");


class OctokitService {
    constructor(gitHubToken) {
        this.octokit = new Octokit({ auth: `${gitHubToken}` });
    }

    async getAutenticatedAvatar() {
        const data = await this.octokit.rest.users.getAuthenticated();
        return data['data']['avatar_url']
    }

    async getAutenticatedEmailList() {
        const data = await octokit.request('GET /user/emails', {
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          })
          return data
    }

}

module.exports = OctokitService;
