const YamlService = require("./yamlService");
const TemplateService = require("./templateService");

class DeployInfraService {
    image = "861104244336.dkr.ecr.eu-west-1.amazonaws.com"

    createProjectContent(project) {
        const template = (new TemplateService(project)).buildValuesContent()

        return (new YamlService()).createFileContents(template)
    }

    createChartContent(project) {
        const template = (new TemplateService(project)).buildChartContent()

        return (new YamlService()).createFileContents(template)
    }
}

module.exports = DeployInfraService;
