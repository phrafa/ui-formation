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
        this.token = ''
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

    async loadProjectContents(project, environment) {
        return await this.octokitService.getDeployInfraContent(project, environment)
    }
    
}

module.exports = UserService;

(async() =>{
    const us = new UserService()
    us.loadProjects().then(projects => {
        projects.map(async project => {
            const contents = await us.loadProjectContents(project, project.environments[0])

            console.log(project)
            console.log(contents)
        })
    })
})()