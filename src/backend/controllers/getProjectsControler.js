import { UserService } from '../service/userService'


export async function execute(event, args) {
    try {

        const user = new UserService();

        const projects = await user.loadProjects()

        console.log({ projects })
        await user.loadSumupEmail()
        console.log(user.sumupEmail)

        event.reply('getProjectsControler', projects)
    } catch (error) {
        console.log({ error })
    }
}
