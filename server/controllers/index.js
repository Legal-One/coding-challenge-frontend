const logs = require('../json-data/logs.json');
const agents = require('../json-data/agents.json');
const resolutions = require('../json-data/resolution.json');

const {
  countLogs,
  logIntersectAgent,
  logIntersectResolution,
} = require('../helpers');

class logsController {
  // get all call log
  static getLogs(request, response) {
    response.status(200).json(logs);
  }

  // get aggregate logs
  static getAggregateLogs(request, response) {
    const aggregateLogs = logs
      .map((elem) => logIntersectAgent(elem, agents))
      .reduce(countLogs, []);
    response.status(200).json(aggregateLogs);
  }
  // get an agent's specific call log
  static getAgentLogs(request, response) {
    const {
      params: { id },
    } = request;

    const agentLogs = logs
      .filter((log) => log.agentIdentifier === id)
      .map((elem) => logIntersectResolution(elem, resolutions));
    response.status(200).json(agentLogs);
  }

  // get call logs of a specific number
  static getNumberLogs(request, response) {
    const {
      params: { number },
    } = request;

    const callLogs = logs
      .filter((log) => log.number === number)
      .map((elem) => logIntersectAgent(elem, agents))
      .map((elem) => logIntersectResolution(elem, resolutions));
    response.status(200).json(callLogs);
  }
}

module.exports = logsController;
