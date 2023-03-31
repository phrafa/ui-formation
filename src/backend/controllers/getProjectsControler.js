import { UserService } from '../service/userService'


export async function execute(event, args) {
    try {

        const user = new UserService();

        const projects = await user.loadProjects()

        const formatedResponse = projects.map(project => {
            const splited = project.split('/')
            return {
                squad: splited[0],
                project: splited[1]
            }
        })

        event.reply('getProjectsControler', formatedResponse)
    } catch (error) {
        console.log({ error })
    }
}
