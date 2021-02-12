const agents = require("../data/agents.json");
const logs = require("../data/logs.json");
const resolutions = require("../data/resolution.json");
function getAgentLogs(identifier) {
    return logs.filter(log => identifier === log.agentIdentifier);
}
function getResolutions(identifier) {
    return resolutions.find(resolution => resolution.identifier === identifier);
}
module.exports.getAgents= (req, res) => {
    agents.map(agent => {
        return agent.logs = getAgentLogs(agent.identifier);
    });
    res.status(200).send({
        message: "Agents fetched successfully.",
        data: agents,
        error: false
    });
}
module.exports.getAgent = (req, res) => {
    const { id } = req.params;
    const agent = agents.find(agent => agent.identifier === id);
    agent.logs = getAgentLogs(agent.identifier);
    agent.logs.forEach(log => {
        log.resolutions = getResolutions(log.identifier);
        return log;
    })
    res.status(200).send({
        message: "Agent fetched successfully.",
        data: agent,
        error: false
    });
}
module.exports.getAgentByNumber = (req, res) => {
    const { number } = req.params;
    const agentsLogs = logs.filter(log => log.number === number);
    const agent = agents.find(agent => agent.identifier === agentsLogs[0].agentIdentifier);
    agent.logs = agentsLogs;
    agent.logs.forEach(log => {
        log.resolutions = getResolutions(log.identifier);
        return log;
    })
    res.status(200).send({
        message: "Agent fetched successfully.",
        data: agent,
        error: false
    });
}