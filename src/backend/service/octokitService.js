const { Octokit } = require("octokit");


class OctokitService {
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

    


}

module.exports = OctokitService;

(async () => {
    os = new OctokitService('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')
    console.log(await os.getSumupEmail())
})();