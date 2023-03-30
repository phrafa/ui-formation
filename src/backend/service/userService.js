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
        this.sumupEmail = this.octokitService.getSumupEmailI()
    }

    loadAvatar() {
        return this.avatar = this.octokitService.getAuthenticatedAvatar()
    }

    loadToken() {
        this.token = ''
    }
    async loadTeams() {
        this.teams = await this.octokitService.getAuthenticatedTeams()
    }

    async loadProjects() {

        if(this.teams.length === 0) {
            await this.loadTeams();
        }
        
        const teamsName = this.teams.map((team) => {
            return team.getNamespaces()
        })

        return this.octokitService.getProjectsByTeamNamespace(teamsName)
        
    }
    
}

module.exports = UserService

