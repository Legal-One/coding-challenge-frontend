const fs = require("fs");
const lodash = require("lodash");

export default class AgentsController {
    static async getAgent(request, response) {
        try {
            const {
                params: { agentId },
            } = request;

            const agents = lodash.cloneDeep(JSON.parse(fs.readFileSync(".././json-data/agents.json")));
            const logs = lodash.cloneDeep(JSON.parse(fs.readFileSync(".././json-data/logs.json")));
            const resolutions = lodash.cloneDeep(JSON.parse(fs.readFileSync(".././json-data/resolution.json")));

            const foundAgent = agents.find((agent) => agent.identifier === agentId);
            const agentsLogs = logs.filter((log) => log.agentIdentifier === foundAgent.identifier);

            agentsLogs.forEach((agentlog) => {
                agentlog.id = agentlog.identifier;
                agentlog.resolution = resolutions.find((resolution) => agentlog.identifier === resolution.identifier);
            })

            return response.status(200).json({
                success: true,
                message: 'Success',
                agent: {
                    ...foundAgent,
                    logs: agentsLogs
                },
            });
        } catch (error) {
            return response.status(500).json({
                success: true,
                message: 'Server error'
            });
        }
    }
}
