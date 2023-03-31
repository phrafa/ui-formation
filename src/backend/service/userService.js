const OctokitService = require("./octokitService")
import { LoginAuthService } from './loginAuthService'


export class UserService {
    teams = []
    projects = []
    sumupEmail = []
    avatar = null
    username = null
    token = null

    constructor() {
        this.loadToken()
        this.octokitService = new OctokitService(this.token)
        this.loadAvatar()
        this.loadUsername()
    }


    async loadSumupEmail() {
        this.sumupEmail = await this.octokitService.getSumupEmail()

    }

    loadAvatar() {
        return this.avatar = this.octokitService.getAuthenticatedAvatar()
    }

    loadUsername() {
        return this.username = this.octokitService.getAuthenticatedUsername()
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
    
    async createApp(app) {
        // criar repositorio do projeto verificando linguagem
        const template = this.getTemplate(app)
        await this.createProjectRepository(app, template)

        // criar branch para o projeto criado
        const createBranchName = `${app.name}-create`
        const createBranch = await this.octokitService.createBranch(this.octokitService.deployInfraRepository, createBranchName)

        // criar commits para deploy-infra
        const filesToCommit = this.octokitService.createDeployInfraFiles(app)

        const commits = filesToCommit.map((file) => {
            const message = `Added ${file.name} to ${app.name}`
            this.octokitService.createCommit(
                this.octokitService.sumupOwner,
                this.octokitService.deployInfraRepository,
                `projects/${app.namespace}/${app.name}/fleet-dev/${file.name}`,
                createBranchName,
                file.content,
                message
            )
        })

        return Promise.all(commits).then(() => {
            // criar PR para master
            setTimeout(() => {
                this.octokitService.createPullRequest(this.octokitService.deployInfraRepository, app.name, createBranchName, this.username)
            }, 2000)
        })
    }

    getTemplate(app) {
        let template = "ui-formation-example-nodejs"
        if (app.language === "nodejs") {
            template = "ui-formation-example-nodejs"
        }

        return template
    }

}


