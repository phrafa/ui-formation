const OctokitService  = require("./octokitService")

class UserService {
    teams = []
    projects = []
    sumupEmail = []
    avatar = null
    token = null

    constructor(){
        this.loadToken()
        this.octokitService = new OctokitService(this.token)
        this.loadAvatar()
    }
    
    loadSumupEmail() {
        this.sumupEmail = this.octokitService.getSumupEmail()
    }

    loadAvatar() {
        return this.avatar = this.octokitService.getAuthenticatedAvatar()
    }

    loadToken() {
        this.token = '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'
    }

    async loadTeams() {
        this.teams = await this.octokitService.getAuthenticatedTeams()
    }

    async loadProjects() {

        if(this.teams.length === 0) {
            await this.loadTeams();
        }

        return this.octokitService.getProjectsByTeamNamespace(this.teams)
        
    }
    
}

module.exports = UserService;

(async() =>{
    const us = new UserService()
    console.log( await us.loadProjects())
})()