const resolution = require('../json-data/resolution.json')
const resolutionController = {
    getAll(req,res){
        res.setHeader('Content-Type', 'application/json');
        res.send(resolution);
    }
}

module.exports = resolutionController