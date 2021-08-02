const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const dir = './json-data';

// Read datas from all jsonFiles given
let datas = fs.readdirSync(dir)
  .filter(name => path.extname(name) === '.json')
  .map(name => require(path.resolve(dir, name)));

// To get Last time of call
let sortedDataLog = datas[1].sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

//To calculate call counts per phone number
let dataLog = [...sortedDataLog.reduce((mp, obj) => {
  if (!mp.has(obj.number))
    mp.set(obj.number, { ...obj, count: 0 });
  mp.get(obj.number).count++;
  return mp;
}, new Map).values()];


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// http://localhost:3000/api
app.get('/api', (req, res) => {
  let result = [];
  datas[0].forEach(function (agentItem) {
    dataLog.forEach(function (logItem) {
      if (agentItem.identifier === logItem.agentIdentifier) {
        result.push({
          agentName: agentItem.firstName + " " + agentItem.lastName,
          number: logItem.number,
          callCounts: logItem.count,
          lastCall: logItem.dateTime,
          agentIdentifier: logItem.agentIdentifier
        });
      }
    })
  })
  res.send(result);
});

// http://localhost:3000/api/agent/6fe55f02-a8f3-11e7-b037-c33c31bca71f
app.get('/api/agent/:id', (req, res) => {
  let result = [];
  datas[1].forEach(function (logItem) {
    datas[2].forEach(function (resolutionItem) {
      if (req.params.id === logItem.agentIdentifier && logItem.identifier === resolutionItem.identifier) {
        result.push({
          number: logItem.number,
          agentIdentifier: logItem.agentIdentifier,
          dateTime: logItem.dateTime,
          resolution: resolutionItem.resolution
        });
      }
    })
  })
  res.send(result);
});

// http://localhost:3000/api/call/+49151484522
app.get('/api/call/:number', (req, res) => {
  let result = [];
  datas[0].forEach(function (agentItem) {
    datas[1].forEach(function (logItem) {
      datas[2].forEach(function (resolutionItem) {
        if (req.params.number === logItem.number && logItem.identifier === resolutionItem.identifier) {
          result.push({
            name: agentItem.firstName + " " + agentItem.lastName,
            dateTime: logItem.dateTime,
            resolution: resolutionItem.resolution,
            identifier: logItem.identifier
          });
        }
      })
    })
  })
  res.send(result);
});

const server = app.listen(3000, () => {
  console.log('listening on port %s...', server.address().port);
});