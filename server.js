const express = require('express');
const app = express();
const port = 3001;

const routes = require('./routes')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routes)

const server = app.listen(3001, function(){
    console.log('Server Running on 3001')
})
