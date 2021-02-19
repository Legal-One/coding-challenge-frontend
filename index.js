const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require('cors')

const app = express();

const port = process.env.PORT || 3001;
let agentsRaw = fs.readFileSync("json-data/agents.json");
let logsRaw = fs.readFileSync("json-data/logs.json");
let resolutionRaw = fs.readFileSync("json-data/resolution.json");
let agents = JSON.parse(agentsRaw);
let logs = JSON.parse(logsRaw);
let resolution = JSON.parse(resolutionRaw);

//enable cors for binding all localhost
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let getHomePathData = (req, res) => {
  let homePathData = [];
  let data = {};
  logs.forEach((item) => {
    if (!data[item.number]) {
      data[item.number] = [item];
    } else {
      data[item.number].push(item);
    }
  });
  for (const [key, value] of Object.entries(data)) {
    let localData = {};
    let agentId = value[value.length - 1].agentIdentifier;
    localData.number = value[value.length - 1].number;
    localData.numberOfCalls = value.length;
    localData.lastCall = value[value.length - 1].dateTime;
    localData.agentId = agentId;
    agents.forEach((item) => {
      if (agentId === item.identifier) {
        localData.agentName = `${item.firstName} ${item.lastName}`;
      }
    });
    homePathData.push(localData);
  }
  return res.json(homePathData);
};

let getAgentIdPathData = async (req, res) => {
  const id = await req.params.id;
  const localData = [];
  logs.forEach((item) => {
    if (item.agentIdentifier === id) {
      localData.push({
        number: item.number,
        date: item.dateTime,
        res: resolution.find((x) => x.identifier === item.identifier).resolution,
      });
    }
  });
  return res.json(localData);
};

let getCallNumberPathData = async (req, res) => {
  const number = req.params.number;
  const localData = [];
  logs.forEach((item) => {
    if (item.number === number) {
      let agentName = agents.find((x) => x.identifier === item.agentIdentifier).firstName;
      let agentLastName = agents.find((x) => x.identifier === item.agentIdentifier).lastName;
      localData.push({
        name: `${agentName} ${agentLastName}`,
        res: resolution.find((x) => x.identifier === item.identifier).resolution,
        date: item.dateTime,
      });
    }
  });
  return res.json(localData);
};

app.get("/", getHomePathData);
app.get("/agent", (req, res) => {
  res.json(agents);
  res.end();
});
app.get("/agent/:id", getAgentIdPathData);
app.get("/call/:number", getCallNumberPathData);

app.listen(process.env.PORT || 3001, '0.0.0.0', function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
