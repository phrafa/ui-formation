class TemplateService {
    image = "861104244336.dkr.ecr.eu-west-1.amazonaws.com"

    constructor(project) {
        this.project = project
        this.appname = project.name
        this.template = require("./../templates/values.json");
    }

    buildContent() {
        this.buildGlobal()
        this.buildIngress()
        this.buildAwsResources()

        this.template['fleet-web-service'].appname = this.appname
        this.template['fleet-web-service'].app.image = `${this.image}/${this.project.team.getSquad()}/${this.appname}:latest`

        return this.template
    }

    buildGlobal() {
        this.template.global.tribe = this.project.team.getTribe()
        this.template.global.squad = this.project.team.getSquad()
    }

    buildIngress() {
        this.template['fleet-web-service'].ingress = [
            {
                accessType: "private-svc-only",
                hosts: [
                    `${this.appname}.fleet.dev.eu-west-1.sumup.net`,
                    `${this.appname}.fleet.dev.sumup.net`,
                ]
            }
        ]
    }

    buildAwsResources() {
        this.template['fleet-aws-resources'] =
        {
            s3Bucket: {
                enabled: false
            },
            auroraPSQLCluster: {
                enabled: false,
                parameters: {
                    databaseName: this.appname,
                    dbInstanceClass: "db.t3.medium",
                    engineVersion: "14.6"
                }
            },
        }
    }
}

module.exports = TemplateService