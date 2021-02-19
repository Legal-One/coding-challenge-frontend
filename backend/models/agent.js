const fs = require("fs");
const path = require("path");

module.exports = class Agent {
  constructor() {}

  static fetchAll() {
    return new Promise((resolve, reject) => {
      const pathName = path.join(
        path.dirname(require.main.filename),
        "data",
        "agents.json"
      );
      fs.readFile(pathName, (error, fileContent) => {
        if (error) {
          reject(new Error(error))
        }
        resolve(JSON.parse(fileContent));
      });
    });
  }
};
