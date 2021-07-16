const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const agents = require('./json-data/agents.json');
const logs = require('./json-data/logs.json');
const resolution = require('./json-data/resolution.json');

app.get('/agents', (req, res) => {
    res.send(agents);
});

app.get('/logs', (req, res) => {
    res.send(logs);
});

app.get('/resolution', (req, res) => {
    res.send(resolution);
});

app.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
});
