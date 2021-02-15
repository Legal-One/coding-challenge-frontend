const router = require('express').Router();
const fs = require('fs');

router.get('/agents', (req, res) => {
  fs.readFile('json-data/agents.json', 'utf8', (err, agents) => {
    if (err) {
      throw err;
    }
    res.send(JSON.parse(agents));
  });
});

router.get('/logs', (req, res) => {
  fs.readFile('json-data/logs.json', 'utf8', (err, logs) => {
    if (err) {
      throw err;
    }
    res.send(JSON.parse(logs));
  });
});

router.get('/resolution', (req, res) => {
  fs.readFile('json-data/resolution.json', 'utf8', (err, resolution) => {
    if (err) {
      throw err;
    }
    res.send(JSON.parse(resolution));
  });
});

module.exports = router;
