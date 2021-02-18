const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');

const api = require('./rates.router');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/', api);

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Rates service running on localhost:${port}`));

module.exports = app; 