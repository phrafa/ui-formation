const YamlService = require("./yamlService");

class PermissionService {
    async getTeam(filePath) {
        const yamlService = new YamlService()
        const fileContents = await yamlService.getFileContents(filePath)

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

class Team {
    constructor(squad, tribe, namespaces, environments, members) {
        this.squad = squad
        this.tribe = tribe
        this.namespaces = namespaces
        this.environments = environments
        this.members = members
    }

    getSquad() {
        return this.squad
    }

    getTribe() {
        return this.tribe
    }

    getNamespaces() {
        return this.namespaces
    }

    getEnvironments() {
        return this.environments
    }

    getMembers() {
        return this.members
    }

    isMember(email) {
        return this.members.includes(email)
    }
}

module.exports = PermissionService;
