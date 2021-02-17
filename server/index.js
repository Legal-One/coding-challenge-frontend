const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const fs = require("fs");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get("/api", (req, res) => {
  let rawData = fs.readFileSync("./json-data/logs.json");
  const logs = JSON.parse(rawData);
  res.send(JSON.stringify({ data: logs }));
});

app.get("/agent", (req, res) => {
  const ID = req.query.id;
  let rawData = JSON.parse(fs.readFileSync("./json-data/agents.json"));
  const results = rawData.filter(x => {
    return x.identifier === ID;
  });
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ data: results }));
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
  const number = req.query.number;
  let rawLogs = JSON.parse(fs.readFileSync("./json-data/logs.json"));
  let rawAgents = JSON.parse(fs.readFileSync("./json-data/agents.json"));
  let rawResolution = JSON.parse(
    fs.readFileSync("./json-data/resolution.json")
  );

  const logs = rawLogs.filter(x => {
    return x.number == number;
  });

  const results_resolution = logs.map(ele => {
    return rawResolution.filter(x => {
      return x.identifier === ele.identifier;
    });
  });

  const results_agent = logs.map(ele => {
    return rawAgents.filter(x => {
      return x.identifier === ele.agentIdentifier;
    });
  });

  res.setHeader("Content-Type", "application/json");
  res.send(
    JSON.stringify({
      data: mergeArrayObjects(results_resolution, results_agent)
    })
  );
});

app.get("/api/greeting", (req, res) => {
  const name = req.query.name || "World";
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
