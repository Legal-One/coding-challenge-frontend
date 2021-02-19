const fs = require("fs");
const path = require("path");

module.exports = class Log {
  constructor() {}

  static fetchAll() {
    return new Promise((resolve, reject) => {
      const pathName = path.join(
        path.dirname(require.main.filename),
        "data",
        "logs.json"
      );
      fs.readFile(pathName, (error, fileContent) => {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(fileContent));
      });
    });
  }
};
