const express = require('express');

const apiRoute = require('./routes/api')

const app = express();

app.use(express.static('dist'));

app.use('/api', apiRoute)

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
