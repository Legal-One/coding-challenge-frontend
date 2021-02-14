const agents = require("./json-data/agents.json");
const logs = require("./json-data/logs.json");
const resolutions = require("./json-data/resolution.json");

function getAgentLogs(id) {
  return logs.find((log) => log.agentIdentifier === id);
}

function getResolution(id) {
  return resolutions.find((resolution) => resolution.identifier === id);
}

module.exports.getAgents = (req, res) => {
  try {
    agents.map((agent) => {
      return (agent.logs = getAgentLogs(agent.identifier));
    });
    res.status(200).send({
      message: "Agents fetched successfully.",
      data: agents,
      error: false,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

module.exports.getAgent = (req, res) => {
  try {
    const { id } = req.params;
    const agent = agents.find((agent) => agent.identifier === id);
    agent.logs = getAgentLogs(agent.identifier);
    agent.logs.map((log) => {
      log.resolutions = getResolution(log.identifier);
      return log;
    });
    res.status(200).send({
      message: "Agent fetched successfully.",
      data: agent,
      error: false,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

module.exports.getAgentByNumber = (req, res) => {
  try {
    const { number } = req.params;
    const agentsLogs = logs.filter((log) => log.number === number);
    const agent = agents.find(
      (agent) => agent.identifier === agentsLogs[0].agentIdentifier
    );
    agent.logs = agentsLogs;
    agent.logs.map((log) => {
      log.resolutions = getResolution(log.identifier);
      return log;
    });
    res.status(200).send({
      message: "Agent fetched successfully.",
      data: agent,
      error: false,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};
