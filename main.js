const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const agents = require('./json-data/agents.json');
const logs = require('./json-data/logs.json');
const resolution = require('./json-data/resolution.json');

app.get('/agents', (req, res) => {
    try {
        res.json(agents)
    } catch (error) {
        res.status(500).send('Error while fetching agents data. Try again later.');
    }
});

app.get('/logs', (req, res) => {
    try {
        res.json(logs)
    } catch (error) {
        res.status(500).send('Error while fetching logs data. Try again later.');
    }
});

app.get('/resolution', (req, res) => {
    try {
        res.json(resolution)
    } catch (error) {
        res.status(500).send('Error while fetching resolution data. Try again later.');
    }
});

app.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
});
