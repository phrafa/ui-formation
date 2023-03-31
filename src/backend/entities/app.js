class App {
    constructor(name, namespace, squadName,language, ingress, database, queues, bucket, envs) {
        this.name = name 
        this.namespace = namespace
        this.squadName = squadName
        this.language = language
        this.ingress = ingress
        this.database = database
        this.queues = queues
        this.bucket = bucket
        this.envs = envs
    }
}

module.exports = App
