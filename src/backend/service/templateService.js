class TemplateService {
    image = "861104244336.dkr.ecr.eu-west-1.amazonaws.com/"

    constructor(app) {
        this.app = app
        this.appname = app.name
        this.chartTemplate = require("./../templates/chart.json");
        this.valuesTemplate = require("./../templates/values.json");
    }

    buildChartContent() {
        this.chartTemplate.name = this.appname
        return this.chartTemplate
    }

    buildValuesContent() {
        this.buildGlobal()
        this.buildIngress()
        //this.buildDBSecrets()
        this.buildAwsResources()

        this.valuesTemplate['fleet-web-service'].appname = this.appname
        this.valuesTemplate['fleet-web-service'].app.image = `${this.image}/receivables-br/tobepaid-proxy:latest`

        return this.valuesTemplate
    }

    buildGlobal() {
        this.valuesTemplate.global.tribe = this.app.tribeName
        this.valuesTemplate.global.squad = this.app.squadName
    }

    buildIngress() {
        this.valuesTemplate['fleet-web-service'].ingress = [
            {
                accessType: "private-svc-only",
                hosts: [
                    `${this.appname}.fleet.dev.eu-west-1.sumup.net`,
                    `${this.appname}.fleet.dev.sumup.net`,
                ]
            }
        ]
    }

    buildDBSecrets() {
        const dbSecrets = [
            {
                "name": "DATABASE_HOST",
                "valueFrom": {
                    "secretKeyRef": {
                        "name": `${this.appname}-aurorapsqlcluster`,
                        "key": "endpoint"
                    }
                }
            },
            {
                "name": "DATABASE_USER",
                "valueFrom": {
                    "secretKeyRef": {
                        "name": `${this.appname}-aurorapsqlcluster`,
                        "key": "username"
                    }
                }
            },
            {
                "name": "DATABASE_PASSWORD",
                "valueFrom": {
                    "secretKeyRef": {
                        "name": `${this.appname}-aurorapsqlcluster`,
                        "key": "password"
                    }
                }
            }
        ]

        dbSecrets.map(secret => {
            this.valuesTemplate['fleet-web-service'].app.env.push(secret)
        })
    }

    buildAwsResources() {
        this.valuesTemplate['fleet-aws-resources'] =
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