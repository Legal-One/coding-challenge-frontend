const agents = require("./json-data/agents.json");
const logs = require("./json-data/logs.json");
const resolution = require("./json-data/resolution.json");

function arrToObject(arr) {
  return arr.reduce((acc, curr) => {
    acc[curr.identifier] = curr;
    return acc;
  }, {});
}

const agentsObj = arrToObject(agents);
const resolutionsObj = arrToObject(resolution);
const mappedLogs = logs.map((log) => {
  const resolution = resolutionsObj[log.identifier].resolution;
  const agent = agentsObj[log.agentIdentifier];
  const agentName = `${agent.firstName} ${agent.lastName}`;
  return { ...log, resolution, agentName };
});

module.exports.getAgents = (req, res) => {
  try {
     const agentsData = mappedLogs.reduce((acc, curr) => {
    const last = curr;
    if (!acc[curr.number]) {
      acc[curr.number] = { callCount: 1, last };
    } else {
      acc[curr.number].callCount++;
      acc[curr.number].last;
    }
    return acc;
  }, {})
    res.status(200).send({
      message: "Agents fetched successfully.",
      data: agentsData,
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
    const agent = mappedLogs.filter(log => log.agentIdentifier === id);
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
    const data = mappedLogs.filter(log => log.number === number);
    res.status(200).send({
      message: "Data fetched successfully.",
      data: data,
      error: false,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};
