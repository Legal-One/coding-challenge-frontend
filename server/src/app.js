const express = require('express');
const app = express();
const controller = require("./controller")

const port = process.env.PORT || 8000;

const cors = require('cors');

app.use(express.json());
app.use(cors());

// routing 

app.get("/", controller.home);
app.get("/agent/:id", controller.getAgent);
app.get("/call/:number", controller.getByNumber);

app.listen(port , ()=>{
    console.log(`connection is working ${port}`);
})