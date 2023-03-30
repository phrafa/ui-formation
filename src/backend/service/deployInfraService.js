const YamlService = require("./yamlService");

class DeployInfraService {
    async getProjects(fileContent) {
        const yamlService = new YamlService()
        return await yamlService.getFileContents(fileContent)
    }
}

module.exports = DeployInfraService;
