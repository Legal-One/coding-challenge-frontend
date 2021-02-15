const express = require('express');
const cors = require('cors');
const router = require('./routes')

const app = express();
const port = process.env.PORT || 3500;

app.use(express.json());
app.use(cors())

app.get('/', (request, response) => {
  response.send('Welcome to our challenge');
});

app.use(router);

app.listen(port, () => console.log(`Running on port ${port}...`));
