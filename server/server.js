const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");

const routes = require("./routes");

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//EQUIRE API
app.use("/", routes);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listening on PORT ${port}...`);
  }
});
