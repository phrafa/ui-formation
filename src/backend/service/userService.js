const OctokitService = require("./octokitService")
import { LoginAuthService } from './loginAuthService'


export class UserService {
    teams = []
    projects = []
    sumupEmail = []
    avatar = null
    token = null

    constructor() {
        this.loadToken()
        this.octokitService = new OctokitService(this.token)
        this.loadAvatar()
    }

    async loadSumupEmail() {
        this.sumupEmail = await this.octokitService.getSumupEmail()
    }

    loadAvatar() {
        return this.avatar = this.octokitService.getAuthenticatedAvatar()
    }

    loadToken() {
        const loginService = new LoginAuthService()

        this.token = loginService.getLoginToken()
    }
    async loadTeams() {
        this.teams = await this.octokitService.getAuthenticatedTeams()
    }

    async loadProjects() {

        if (this.teams.length === 0) {
            await this.loadTeams();
        }

        const teamsName = this.teams.map((team) => {
            return team.getNamespaces()
        })

        return this.octokitService.getProjectsByTeamNamespace(teamsName)

    }

}

