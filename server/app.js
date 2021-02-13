const express = require("express");
const logs = require("./json-data/logs.json");
const agents = require("./json-data/agents.json");
const resolutions = require("./json-data/resolution.json");

const app = express();
const port = process.env.PORT || 3500;

app.use(express.json());

app.get("/", (request, response) => {
  response.send("Welcome to our challenge");
});

const logIntersectAgent = (log) => {
  const agent = agents.find((agent) => agent.identifier == log.agentIdentifier);
  return { ...log, agent };
};

const logIntersectResolution = (log) => {
  const resolution = resolutions.find(
    (resolution) => resolution.identifier === log.identifier
  );
  return { ...log, resolution };
};

const countLogs = (accumulator, value) => {
  const foundIndex = accumulator.findIndex((x) => x.number === value.number);
  if (foundIndex !== -1) {
    accumulator[foundIndex].count++;
    return accumulator;
  } else {
    accumulator.push({ ...value, count: 1 });
    return accumulator;
  }
}

// get all call log
app.get("/logs", (request, response) => {
  response.status(200).json(logs);
});

// get aggregate logs
app.get("/accumulated-logs", (request, response) => {
  const aggregateLogs = logs.map(logIntersectAgent).reduce(countLogs, []);
  response.status(200).json(aggregateLogs);
});

// get an agent's specific call log
app.get("/agent/:id", (request, response) => {
  const {
    params: { id },
  } = request;

  const agentLogs = logs
    .filter((log) => log.agentIdentifier === id)
    .map(logIntersectResolution);
  response.status(200).json(agentLogs);
});

// get call logs of a specific number
app.get("/calls/:number", (request, response) => {
  const {
    params: { number },
  } = request;

  const callLogs = logs
    .filter((log) => log.number === number)
    .map(logIntersectAgent)
    .map(logIntersectResolution);
  response.status(200).json(callLogs);
});

app.listen(port, () => console.log(`Running on port ${port}...`));
