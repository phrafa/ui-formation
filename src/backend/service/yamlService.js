const yaml = require("js-yaml");

class YamlService {
    async getFileContents(fileContent) {
        let data
        try {
          data = yaml.load(fileContent);
        } catch (e) {
          console.log(e);
        }

        return data
    }
}

module.exports = YamlService;