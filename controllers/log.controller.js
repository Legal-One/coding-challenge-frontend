const logs = require('../json-data/logs.json')
const logController = {
    getAll(req,res){
        res.setHeader('Content-Type', 'application/json');
        res.send(logs);
    }
}

module.exports = logController