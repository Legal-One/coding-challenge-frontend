const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const fs = require("fs");
const d3 = require("d3-array");
const {
  json
} = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(pino);

app.get("/api", (req, res) => {
  const jsonLogs = JSON.parse(fs.readFileSync("./json-data/logs.json"));
  const jsonAgents = JSON.parse(fs.readFileSync("./json-data/agents.json"));
  const groupData = Array.from(d3.group(jsonLogs, d => d.number), ([key, value]) => ({
    key,
    value
  }))
  const result = groupData.map((item) => {
    const lastLog = item.value[d3.maxIndex(item.value, d => d.dateTime)];
    const lastCallAgent = jsonAgents.find((i) => i.identifier == lastLog.agentIdentifier)
    return {
      phone: item.key,
      cnt: item.value.length,
      agent: lastCallAgent.firstName + " " + lastCallAgent.lastName,
      dateTime: lastLog.dateTime
    }
  })
  res.send(JSON.stringify({
    data: result
  }));
});

app.get("/agent", (req, res) => {
  const agentId = req.query.id;
  const jsonLogs = JSON.parse(fs.readFileSync("./json-data/logs.json"));
  const jsonResolution = JSON.parse(fs.readFileSync("./json-data/resolution.json"));
  const agentLogs = jsonLogs.filter((item) => item.agentIdentifier == agentId);
  const result = agentLogs.map((item) => {
    return {
      phone: item.number,
      dateTime: item.dateTime,
      resolution: (jsonResolution.find((i) => i.identifier == item.identifier)).resolution
    }
  })
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({
    data: result
  }));
});

function mergeArrayObjects(arr1, arr2) {
  return arr1.map((item, i) => {
    if (item.identifier === arr2[i].identifier) {
      //merging two objects
      return Object.assign({}, item, arr2[i]);
    }
  });
}

app.get("/call", (req, res) => {
  const phoneNumber = req.query.number;
  const jsonLogs = JSON.parse(fs.readFileSync("./json-data/logs.json"));
  const jsonResolution = JSON.parse(fs.readFileSync("./json-data/resolution.json"));
  const jsonAgents = JSON.parse(fs.readFileSync("./json-data/agents.json"));
  const agentLogs = jsonLogs.filter((item) => item.number.includes(phoneNumber));
  const result = agentLogs.map((item) => {
    const agent = jsonAgents.find((i) => i.identifier == item.agentIdentifier)
    return {
      agent: agent.firstName + " " + agent.lastName,
      dateTime: item.dateTime,
      resolution: (jsonResolution.find((i) => i.identifier == item.identifier)).resolution
    }
  })

  res.setHeader("Content-Type", "application/json");
  res.send(
    JSON.stringify({
      data: result
    })
  );
});

app.get("/api/greeting", (req, res) => {
  const name = req.query.name || "World";
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({
    greeting: `Hello ${name}!`
  }));
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);