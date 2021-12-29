var agents = require('../json-data/agents.json');
var logs = require('../json-data/logs.json');
var resolution = require('../json-data/resolution.json');

module.exports = function () {
  return {
    agents: agents,
    logs: logs,
    resolution: resolution
  }
}