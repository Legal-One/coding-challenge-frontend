const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use("/api/v1", require("./routes"));
app.listen(3000, () => {
    console.log("App is listening on port 3000");
});