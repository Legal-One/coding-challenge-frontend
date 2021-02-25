
const agents = require('../json-data/agents.json')
const agentController = {
    getAll(req,res){
        res.setHeader('Content-Type', 'application/json');
        res.send(agents);
    }
}

module.exports = agentController