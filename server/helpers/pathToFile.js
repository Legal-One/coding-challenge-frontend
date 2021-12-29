const path = require('path');
const basePath = path.dirname(process.mainModule.filename);

module.exports = {
  agent: path.join(basePath, '..', '/json-data/agents.json'),
  logs: path.join(basePath, '..', '/json-data/logs.json'),
  resolution: path.join(basePath, '..', '/json-data/resolution.json'),
};