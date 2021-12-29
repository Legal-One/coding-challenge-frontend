const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const baseRoutes = require('./routes/base');
const agentRoutes = require('./routes/agent');
const callRoutes = require('./routes/call');

const app = express();
const port = process.env.PORT || 6000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/agent', agentRoutes);
app.use('/api/call', callRoutes);
app.use('/api', baseRoutes);
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '..', 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));