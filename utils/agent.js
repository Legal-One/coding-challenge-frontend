const fs = require('fs');

const Agent = {
    getAgentsMap: (path = 'json-data/agents.json') => new Promise((resolve, _) => {
        fs.readFile(path, (err, data) => {
            if (err) { 
                resolve(new Map()); 
                return;
            }

            const agents = JSON.parse(data);
            const agentsMap = new Map();
            agents.forEach((value) => {
                const { identifier } = value;
                agentsMap.set(identifier, value);
            })
            resolve(agentsMap);
        });
    }),
    getAgentById: (agentIdentifier, path = 'json-data/agents.json') => new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) { 
                reject(err); 
                return;
            }
            
            const agents = JSON.parse(data);
            const agent = agents.find(({ identifier }) => agentIdentifier === identifier);
            if (!agent) {
                reject({ message: 'Agent could not be found' });
                return;
            }

            resolve(agent);
        });
    }),
};

module.exports = Agent;