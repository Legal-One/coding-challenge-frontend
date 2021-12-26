const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { fetchPhoneLogs, fetchPhoneLogsByNumber } = require('./handlers/phone-logs');
const { getAgentDetails } = require('./handlers/agent-logs');
const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/logs', fetchPhoneLogs);
app.get('/logs/:number', fetchPhoneLogsByNumber);
app.get('/agent/:id', getAgentDetails);

app.get('/', (req, res) => {
    res.json({
        message: 'welcome, legal-one server'
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

module.exports = { app };