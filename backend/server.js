// load up the express framework and body-parser helper
const express = require('express');
const bodyParser = require('body-parser');

// create an instance of express to serve our end points
const app = express();

// we'll load up node's built in file system helper library here
// (we'll be using this later to serve our JSON files
const fs = require('fs');

// configure our express instance with some body-parser settings
// including handling JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// this is where we'll handle our various routes from
const routes = require('./data/routes/routes')(app, fs);

// finally, launch our server on port 3001.
const server = app.listen(3001, () => {
  console.log('listening on port %s...', server.address().port);
});