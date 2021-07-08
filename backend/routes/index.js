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
  const reslPath = jsonDirPath + "resolution.json";

  const agentsData = readFromPathSync(agentPath);
  const logData = readFromPathSync(logPath);
  const reslData = readFromPathSync(reslPath);

  const dataMap = new Map();
  const mainDataMap = aggregateDataForTable(agentsData, logData, dataMap);
  console.log([...mainDataMap.values()]);
  res.end(JSON.stringify([...mainDataMap.values()]));
});

/**
 *  GET specific agent call log
 *  Read json data, prepare dashboard display json
 */
router.get("/agent/:agentId", function (req, res, next) {
  const jsonDirPath = "public/json-data/";

  const agentPath = jsonDirPath + "agents.json";
  const logPath = jsonDirPath + "logs.json";
  const reslPath = jsonDirPath + "resolution.json";

  const agentsData = readFromPathSync(agentPath);
  const logData = readFromPathSync(logPath);
  const reslData = readFromPathSync(reslPath);

  res.send(req.params);
});

module.exports = router;
