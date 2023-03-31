const YamlService = require("./yamlService");
const TemplateService = require("./templateService");

class DeployInfraService {
    image = "861104244336.dkr.ecr.eu-west-1.amazonaws.com"

    createAppContent(app) {
        const template = (new TemplateService(app)).buildValuesContent()

        return (new YamlService()).createFileContents(template)
    }

    createChartContent(app) {
        const template = (new TemplateService(app)).buildChartContent()

        return (new YamlService()).createFileContents(template)
    }
}

module.exports = DeployInfraService;
