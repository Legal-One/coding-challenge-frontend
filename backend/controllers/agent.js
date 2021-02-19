const Log = require("../models/log");
const Resolution = require("../models/resolution");
const Agent = require("../models/agent")

const { formatDate } = require("../util/formatDate");

function getResolution(resolutions, identifier) {
  return resolutions.find((resultion) => resultion.identifier === identifier);
}

function getAgentLogs(logs, resolutions, agentID) {
  const agentLogs = [];
  for (log of logs) {
    if (log.agentIdentifier != agentID) {
      continue;
    }
    const resolution = getResolution(resolutions, log.identifier);
    agentLogs.push({
      number: log.number,
      date: formatDate(new Date(log.dateTime)),
      resolution: resolution.resolution,
    });
  }
  return agentLogs;
}

function getAgentName(agents, agentIdentifier) {
  const agent = agents.find((agent) => agent.identifier === agentIdentifier);

  return agent.firstName + " " + agent.lastName;
}

exports.getCallsByAgent = async (req, res, next) => {
  const agentID = req.params.agentID;
  let logs;
  let resolutions;
  let agents;
  try {
    logs = await Log.fetchAll();
    resolutions = await Resolution.fetchAll();
    agents = await Agent.fetchAll();
    res.status(200).json({
      name: getAgentName(agents, agentID),
      agentLogs: getAgentLogs(logs, resolutions, agentID),
    });
  } catch (error) {
    throw new Error(error);
  }
};
