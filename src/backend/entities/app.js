class App {
    constructor(name, namespace, squadName, tribeName,language, ingress, database, queues, buckets, envs) {
        this.name = name 
        this.namespace = namespace
        this.squadName = squadName
        this.tribeName = tribeName
        this.language = language
        this.ingress = ingress
        this.database = database
        this.queues = queues
        this.buckets = buckets
        this.envs = envs
    }
}

module.exports = App
