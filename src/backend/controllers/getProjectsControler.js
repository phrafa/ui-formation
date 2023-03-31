import { UserService } from '../service/userService'


export async function execute(event, args) {
    try {

        const user = new UserService();

        const projects = await user.loadProjects()
        
        const namespaces = projects.filter((item, index) => {
            return projects.findIndex(obj => obj.team.getNamespace() === item.team.getNamespace()) === index;
        }).map(item => {
            return { namespace: item.team.getNamespace(), teamName: item.team.getSquad(), projects: {} };
          });

        for (let x in namespaces) {
            namespaces[x].projects = projects.filter((item, index) => {
               return namespaces[x].namespace === item.team.getNamespace()
            }).map(item => {
                return { name: item.name};
            });
        }

        event.reply('getProjectsControler', namespaces)
    } catch (error) {
        console.log({ error })
    }
}
