const agents = require('../../json-data/agents.json');
const logs = require('../../json-data/logs.json');
const resolution = require('../../json-data/resolution.json');

    function agents_data(){
        let data = {}
        agents.forEach(element => {
            data[element.identifier] = element
        });
        return data;
    }
    function resolution_data(){
        let data = {}
        resolution.forEach(element => {
            data[element.identifier] = element.resolution
        });
        return data;
    }
        
exports.home = async (req, res) => {
    let agent = agents_data();
    let result = [];
    try{
        let logsDataByNumber = {}
        logs.forEach(element => {
            if(!logsDataByNumber[element.number]){
                logsDataByNumber[element.number] = [element]
            }else{
                logsDataByNumber[element.number].push(element)
            }
        });
        for(const number in logsDataByNumber){
            const object = logsDataByNumber[number];
            const last = object[object.length-1];
            const _agent = agent[last.agentIdentifier];
            // console.log(_agent, last.agentIdentifier)
            const data = {
                number,
                numberOfCall: object.length,
                name: _agent.firstName + " " + _agent.lastName,
                duration: last.duration
            };
             result.push(data);
             console.log(result)
              
        }
    }catch(err){
        return res.status(500).json({ message: "data not found" });
    }
    res.status(200).json(result);
};

 exports.getAgent = async (req, res) => {
    const id = req.params.id;
    const resol = resolution_data();
    let result = [];
     try{
    
    logs.forEach(element => {
      if(element.agentIdentifier === id){
        result.push({
            number: element.number,
            dateTime: element.dateTime,
            resolution: resol[element.identifier]
        })
    }
    console.log(result);
})
}catch(err){
    return res.status(500).json({ message: "data not found" });
}
res.status(200).json(result);
};

exports.getByNumber = async (req, res) => {
    const num = req.params.number;
        let result = [];
    try{
        const resol = resolution_data();
        const agent = agents_data();
        
        logs.forEach(element => {
          if(element.number === num){  
            const agentData = agent[element.agentIdentifier]
            result.push({
                name: agentData.firstName + " " + agentData.lastName,
                time : element.dateTime,
                resolution: resol[element.identifier]
            })
          } 
        })
    }catch(err){
        return res.status(500).json({ message: "data not found" });
    }
    res.status(200).json(result);
};
