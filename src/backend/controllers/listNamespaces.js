import { UserService } from '../service/userService'


export async function execute(event, args) {
    try {
        const user = new UserService();
        const projects = await user.loadProjects()
        const namespaces = projects.filter((item, index) => {
            return projects.findIndex(obj => obj.team.getNamespace() === item.team.getNamespace()) === index;
        }).map(item => {
            return `${item.team.getTribe()}/${item.team.getSquad()}`
        });

        event.reply('listNamespaces', namespaces)
    } catch (error) {
        console.log({ error })
    }
}
