import { UserService } from '../service/userService'


export async function execute(event, args) {
    try {

        const user = new UserService();

        const projects = await user.loadProjects()
        
        const namespaces = projects.filter((item, index) => {
            return projects.findIndex(obj => obj.namespace === item.namespace) === index;
        }).map(item => {
            return { namespace: item.namespace, teamName: item.teamName, projects: {} };
          });

        for (let x in namespaces) {
            namespaces[x].projects = projects.filter((item, index) => {
               return namespaces[x].namespace === item.namespace
            }).map(item => {
                return { name: item.name};
            });
        }

        event.reply('getProjectsControler', namespaces)
    } catch (error) {
        console.log({ error })
    }
}
