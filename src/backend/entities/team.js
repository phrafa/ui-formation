
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

    getNamespace() {
        return this.namespaces[0]
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

module.exports = Team