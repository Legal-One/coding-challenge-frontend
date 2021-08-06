var express = require("express"),
  app = express(),
  port = process.env.PORT || 3500;
bodyParser = require("body-parser");

// bodyParser Middlewares	
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set response header (Prevent CORS Error)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// SetTimeout added to add a bit of delay and mimic an actual API
app.get("/", async (req, res) => {
  setTimeout(() => {
    res.status(200).send({
      logs: require('./json-data/logs.json'),
      agent: require('./json-data/agents.json'),
      resolution: require('./json-data/resolution.json')
    })
  }, 1000);
});

console.log("Project Up and Running on port ", port);

app.listen(port);
