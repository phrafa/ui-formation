import { UserService } from "./userService";

export class createApplicationService {
    constructor(app, event) {
        this.app = app
        this.event = event
        this.user = new UserService()
    }


    async createApp() {
        this.event.reply('sendApplication', {
            "title": "Loading user info",
            "describe": "connecting into github"
        })

        this.event.reply('sendApplication', {
            "title": "waiting resource create...",
            "describe": "[...]"
        })

        await this.user.createApp(this.app)

        this.event.reply('sendApplication', {
            "title": "Deploy completed",
            "describe": "XBOX!"
        })
    }
c}


