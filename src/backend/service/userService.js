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


        return this.octokitService.getProjectsByTeamNamespace(this.teams)
        
    }

    async loadProjectContents(project, environment) {
        return await this.octokitService.getDeployInfraContent(project, environment)
    }

    async createProjectRepository(app, template) {
        return await this.octokitService.createProjectRepository(app, template)
          .then((response) => setTimeout(() => this.octokitService.updateRepositoryWorkflow(app, response.data), 2000))
    }
    
    async createApp(app, user) {
        // criar repositorio do projeto verificando linguagem
        const template = this.getTemplate(app)
        this.createProjectRepository(app,  template)
        // criar branch para o projeto criado
        // criar commits para deploy-infra
        // criar PR para master
    }

    async getTemplate(app) {
        template = "ui-formation-example-nodejs"
        if (app.language == "nodejs") {
            template = "ui-formation-example-nodejs"
        }
    }

}


