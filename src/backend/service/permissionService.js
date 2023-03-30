const YamlService = require("./yamlService");
const Team = require("./../entities/team");

class PermissionService {
    async getTeam(fileContent) {
        const yamlService = new YamlService()
        const fileContents = await yamlService.getFileContents(fileContent)

        if (fileContents[0] !== undefined && fileContents[0].members !== undefined) {
            const team = fileContents[0]
            return new Team(
              team.squad,
              team.tribe,
              team.namespaces,
              team.environments,
              team.members
            )
        }

        return null
    }
}


module.exports = PermissionService;
