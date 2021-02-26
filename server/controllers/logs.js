const fs = require("fs");
const lodash = require("lodash");


export default class LogsController {
    static async getAllLogs(request, response) {
        try {

            const data = {};
            const finalData= [];

            const logs = lodash.cloneDeep(JSON.parse(fs.readFileSync(".././json-data/logs.json")));
            const agents = lodash.cloneDeep(JSON.parse(fs.readFileSync(".././json-data/agents.json")));

            for (let log of logs) {
                if (data[log.number]) {
                    data[log.number].count++
                } else {
                    data[log.number] = {};
                    data[log.number].agent = agents.find((agent) => agent.identifier === log.agentIdentifier);
                    data[log.number].dateTime = log.dateTime;
                    data[log.number].duration = log.duration;
                    data[log.number].number = log.number;
                    data[log.number].id = log.identifier;
                    data[log.number].count = 1;
                }
            }

            for (let record in data) {
                finalData.push(data[record]);
            }

            return response.status(200).json({
                success: true,
                message: 'Success',
                logs: finalData,
            });
        } catch (error) {
            return response.status(500).json({
                success: true,
                message: error
            });
        }
    }

    static async getLog(request, response) {
        try {
            const {
                params: { number },
            } = request;

            const logs = lodash.cloneDeep(JSON.parse(fs.readFileSync(".././json-data/logs.json")));
            const agents = lodash.cloneDeep(JSON.parse(fs.readFileSync(".././json-data/agents.json")));
            const resolutions = lodash.cloneDeep(JSON.parse(fs.readFileSync(".././json-data/resolution.json")));

            const foundLogs = logs.filter((log) => log.number === number);

            foundLogs.forEach((log) => {
                log.id = log.identifier;
                log.agent = agents.find((agent) => agent.identifier === log.agentIdentifier);
                log.resolution = resolutions.find((resolution) => resolution.identifier === log.identifier);
            });

            return response.status(200).json({
                success: true,
                message: 'Success',
                logs: foundLogs,
            });
        } catch (error) {
            return response.status(500).json({
                success: true,
                message: 'Server error'
            });
        }
    }
}
