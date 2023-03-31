const yaml = require("js-yaml");

class YamlService {
    getFileContents(fileContent) {
        let data
        try {
          data = yaml.load(fileContent);
        } catch (e) {
          console.log(e);
        }

        return data
    }

    createFileContents(fileContent) {
        let data
        try {
          data = yaml.dump(fileContent);
        } catch (e) {
          console.log(e);
        }

        return data
    }
}

module.exports = YamlService;