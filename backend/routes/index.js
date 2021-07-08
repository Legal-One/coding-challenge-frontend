var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");

function readFromPathSync(filePath) {
  const rawData = fs.readFileSync(filePath, {});
  return JSON.parse(rawData);
}

function findAgentById(agentId, agents) {
  const agentObj = agents.find((el) => el.identifier === agentId);
  return agentObj.firstName + " " + agentObj.lastName;
}

function aggregateDataForTable(agents, log, dataMap) {
  for (let it = 0; it < log.length; it++) {
    const data = log[it];
    let prevData = null;
    if (dataMap.get(data.number) != null) {
      prevData = dataMap.get(data.number);
    } else {
      prevData = {
        number: data.number,
        num_calls: 0,
        last_agent: "",
        last_call: "1974",
        duration_sum: 0,
      };
    }

    // setup new data and update prev if exists
    // desired data format
    // phone number, # of calls, last agent name, last call time, durationSum
    let newData = {
      number: prevData.number,
      num_calls: prevData.num_calls + 1,
      agent_id: data.agentIdentifier,
      last_agent:
        prevData.last_call < data.dateTime
          ? findAgentById(data.agentIdentifier, agents)
          : prevData.last_agent,
      call_id: data.identifier,
      last_call:
        prevData.last_call < data.dateTime ? data.dateTime : prevData.last_call,
      duration_sum: prevData.duration_sum + data.duration,
    };
    dataMap.set(newData.number, newData);
  }
  return dataMap;
}

/**
 *  GET home page
 *  Read json data, prepare dashboard display json
 */
router.get("/", function (req, res, next) {
  const jsonDirPath = "public/json-data/";

  const agentPath = jsonDirPath + "agents.json";
  const logPath = jsonDirPath + "logs.json";
  
  const agentsData = readFromPathSync(agentPath);
  const logData = readFromPathSync(logPath);

  const dataMap = new Map();
  const mainDataMap = aggregateDataForTable(agentsData, logData, dataMap);
  console.log([...mainDataMap.values()]);
  res.end(JSON.stringify([...mainDataMap.values()]));
});

function findResolutionById(id, reslData) {
  const instance = reslData.find(el => el.identifier == id);
  return instance.resolution;
} 

function aggregateDataForAgent(agentId, logData, reslData) {
  let agentLog = []
  for (let it=0;it<logData.length;it++) {
    const log = logData[it];
    if (log.agentIdentifier != agentId) {
      continue;
    }
    const newEntry = {
      number: log.number,
      date_time: log.dateTime,
      duration: log.duration,
      resolution: findResolutionById(log.identifier, reslData)
    }
    agentLog.push(newEntry);
  }
  return agentLog;
}

function aggregateDataForNumber(num, agentsData, logData, reslData) {
  let numLog = []
  for (let it=0;it<logData.length;it++) {
    const log = logData[it];
    if (log.number != num) {
      continue;
    }
    const newEntry = {
      agent_name: findAgentById(log.agentIdentifier, agentsData),
      date_time: log.dateTime,
      duration: log.duration,
      resolution: findResolutionById(log.identifier, reslData)
    }
    numLog.push(newEntry);
  }
  return numLog;
}

/**
 *  GET specific agent call log
 *  Agent specific call log, show all numbers, date-time, resolution for selected agent
 */
router.get("/call/:number", function (req, res, next) {
  
  const selectedNum = req.params.number;
  const jsonDirPath = "public/json-data/";

  const agentPath = jsonDirPath + "agents.json";
  const logPath = jsonDirPath + "logs.json";
  const reslPath = jsonDirPath + "resolution.json";

  const agentsData = readFromPathSync(agentPath);
  const logData = readFromPathSync(logPath);
  const reslData = readFromPathSync(reslPath);

  const numberLog = aggregateDataForNumber(selectedNum, agentsData, logData, reslData);
  res.send(JSON.stringify(numberLog));
});

/**
 *  GET specific number call log
 *  Number specific call log, show all agent names, date-time, resolution for selected number
 */
 router.get("/agent/:agentId", function (req, res, next) {
  
  const agentId = req.params.agentId;
  const jsonDirPath = "public/json-data/";

  const logPath = jsonDirPath + "logs.json";
  const reslPath = jsonDirPath + "resolution.json";

  const logData = readFromPathSync(logPath);
  const reslData = readFromPathSync(reslPath);

  const agentLogs = aggregateDataForAgent(agentId,logData, reslData);
  res.send(JSON.stringify(agentLogs));
});

module.exports = router;
