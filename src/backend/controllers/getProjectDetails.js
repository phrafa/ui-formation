import { UserService } from '../service/userService'

export async function execute(event, args) {
    try {
        const projectName = args.split('/')[1]
        const user = new UserService();

        const projects = await user.loadProjects()
        const project = projects.find(p => p.name == projectName)
        console.log(JSON.stringify(project))


        const repo = await user.loadProjectContents(project, 'dev')


        console.log({ repo })


        event.reply('getProjectDetails', 'namespaces')
    } catch (error) {
        console.log({ error })
    }
}
