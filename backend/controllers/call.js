const Log = require("../models/log");
const Agent = require("../models/agent");
const Resolution = require("../models/resolution");

const { formatDate } = require("../util/formatDate");

function getLogsByNumber(logs, number) {
  return logs.filter((log) => log.number === number);
}

function getLatestCall(logs) {
  return logs.reduce((previousCall, currentCall) =>
    Date.parse(previousCall.dateTime) > Date.parse(currentCall.dateTime)
      ? previousCall
      : currentCall
  );
}

function getAgent(agents, agentIdentifier) {
  return agents.find((agent) => agent.identifier === agentIdentifier);
}

function getCallsSummary(logs, agents) {
  const calls = [];

  for (log of logs) {
    const number = log.number;
    if (calls.some((call) => call.number === number)) {
      continue;
    }
    const filteredLogs = getLogsByNumber(logs, number);
    const callsCount = filteredLogs.length;
    const latestCall = getLatestCall(filteredLogs);
    let agent = getAgent(agents, latestCall.agentIdentifier);

    calls.push({
      number: number,
      calls: callsCount,
      lastCall: {
        agentIdentifier: agent.identifier,
        name: agent.firstName + " " + agent.lastName,
        date: formatDate(new Date(latestCall.dateTime)),
      },
    });
  }
  return calls;
}

exports.getCalls = async (req, res, next) => {
  let logs;
  let agents;
  try {
    logs = await Log.fetchAll();
    agents = await Agent.fetchAll();
    res.status(200).json({
      calls: getCallsSummary(logs, agents),
    });
  } catch (error) {
    throw new Error(error);
  }
};

function getResolution(resolutions, identifier) {
  return resolutions.find((resultion) => resultion.identifier === identifier);
}

function getCallLogs(logs, agents, resolutions, number) {
  const filteredLogs = getLogsByNumber(logs, number);
  const callLogs = [];
  for (log of filteredLogs) {
    if (log.number != number) {
      continue;
    }
    const agent = getAgent(agents, log.agentIdentifier);
    const resolution = getResolution(resolutions, log.identifier);
    callLogs.push({
      agent: {
        agentIdentifier: agent.identifier,
        name: agent.firstName + " " + agent.lastName,
      },
      date: formatDate(new Date(log.dateTime)),
      resolution: resolution.resolution,
    });
  }
  return callLogs;
}

exports.getCallsByNumber = async (req, res, next) => {
  const number = req.params.number;
  let logs;
  let agents;
  let resolutions;
  try {
    logs = await Log.fetchAll();
    agents = await Agent.fetchAll();
    resolutions = await Resolution.fetchAll();
    res.status(200).json({
      callLogs: getCallLogs(logs, agents, resolutions, number),
    });
  } catch (error) {
    throw new Error(error);
  }
};
