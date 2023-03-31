import { UserService } from "./userService";

export class createApplicationService {
    constructor(app, event) {
        this.app = app
        this.event = event
        this.user = new UserService()
    }


    async createApp() {
        this.event.reply('sendApplication', {
            "title": "Await creating resource...",
            "describe": "<3"
        })
        
        await this.user.createApp(this.app)

        this.event.reply('sendApplication', {
            "title": "Deploy complete",
            "describe": "Make with love"
        })
    }
c}


