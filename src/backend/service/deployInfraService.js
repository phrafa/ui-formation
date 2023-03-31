const YamlService = require("./yamlService");

class DeployInfraService {
    getProjectContent(fileContent) {
        const yamlService = new YamlService()
        return yamlService.getFileContents(fileContent)
    }
}

module.exports = DeployInfraService;
