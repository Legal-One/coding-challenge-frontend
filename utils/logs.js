const fs = require('fs');

const Logs = {
    getResolutionsMap: (path = 'json-data/resolution.json') => new Promise((resolve, _) => {
        fs.readFile(path, (err, data) => {
            const resolutionMap = new Map();
            if (err) { 
                resolve(resolutionMap); 
                return;
            }

            const resolutions = JSON.parse(data);
            resolutions.forEach(({ identifier, resolution }) => (resolutionMap.set(identifier, resolution)));
            resolve(resolutionMap);
        });
    }),
    getPhoneLogsByAgent: (targetAgentIdentifier) => new Promise((resolve, reject) => {
        Logs.getResolutionsMap().then((resolutions) => {
            fs.readFile('json-data/logs.json', (err, data) => {
                if (err) reject(err);
                const logs = JSON.parse(data);
                let filteredLogs = logs.filter(({ agentIdentifier }) => agentIdentifier === targetAgentIdentifier);
                filteredLogs = filteredLogs.map((log) => ({ ...log, resolution: resolutions.get(log.identifier) || 'unknow' }));
                resolve(filteredLogs);
            });
        });
    }),
    getPhoneLogsByNumber: (targetNumber, agentsMap = new Map(), path = 'json-data/logs.json') => new Promise((resolve, reject) => {
        Logs.getResolutionsMap().then((resolutions) => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }

                const logs = JSON.parse(data);
                let filteredLogs = logs.filter(({ number }) => number === targetNumber);
                filteredLogs = filteredLogs.map((log) => ({ 
                    ...log, 
                    resolution: resolutions.get(log.identifier) || 'unknow',
                    agent: agentsMap.get(log.agentIdentifier) || null,
                }));
                resolve(filteredLogs);
            });
        });
    }),
};

module.exports = Logs;