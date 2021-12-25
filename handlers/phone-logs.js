const fs = require('fs');

const PhoneLogs = {
    updateOrCreatePhoneLog: (agentsMap, phoneNumbers, newValue) => {
        const { number, agentIdentifier } = newValue;
        let PhoneLog = phoneNumbers.get(number) || { number, logs: [], };
        PhoneLog.logs = [...PhoneLog.logs, {...newValue, agent: agentsMap.get(agentIdentifier)}];
        return PhoneLog;
    },
    getPhoneLogsMap: (agentsMap) => new Promise((resolve, reject) => {
        fs.readFile('json-data/logs.json', (err, data) => {
            if (err) reject(err);
            const logs = JSON.parse(data);
            const phoneLogsMap = new Map();
            logs.forEach((value) => {
                const { number } = value;
                phoneLogsMap.set(number, PhoneLogs.updateOrCreatePhoneLog(agentsMap, phoneLogsMap, value));
            })
            resolve(phoneLogsMap);
        });
    }),
    getAgentsMap: () => new Promise((resolve, _) => {
        fs.readFile('json-data/agents.json', (err, data) => {
            if (err) resolve(new Map());
            const agents = JSON.parse(data);
            const agentsMap = new Map();
            agents.forEach((value) => {
                const { identifier } = value;
                agentsMap.set(identifier, value);
            })
            resolve(agentsMap);
        });
    }),
    getPhoneNumberFromLogs: () => new Promise((resolve, reject) => {
        PhoneLogs.getAgentsMap().then((agentsMap) => {
            PhoneLogs.getPhoneLogsMap(agentsMap).then((phoneLogsMap) => {
                resolve(Array.from(phoneLogsMap.values()));
            });
        });
    }),
    getPhoneNumbers: (req, res) => {
        PhoneLogs.getPhoneNumberFromLogs().then((phoneLogs, reject) => {
            res.json({ phoneLogs });
        });
    },
};

module.exports = PhoneLogs;