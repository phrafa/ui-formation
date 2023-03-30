const yaml = require("js-yaml");
const fs = require("fs");

class YamlService {
    async getFileContents(filePath) {
        let data
        try {
          data = yaml.load(fs.readFileSync(filePath, 'utf8'));
        } catch (e) {
          console.log(e);
        }

        return data
    }
}

module.exports = YamlService;