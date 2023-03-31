import { UserService } from '../service/userService'


export async function execute(event, args) {
    try {

        const user = new UserService();

        const projects = await user.loadProjects()

        

        event.reply('getProjectsControler', projects)
    } catch (error) {
        console.log({ error })
    }
}
