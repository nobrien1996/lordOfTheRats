const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
require('dotenv').config();

const subscribeRoute = require('./routes/subscribe');
const confirmRoute = require('./routes/confirm');
const unsubscribeRoute = require('./routes/unsubscribe');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/subscribe', subscribeRoute);
app.use('/confirm', confirmRoute);
app.use('/unsubscribe', unsubscribeRoute);

const httpsOptions = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem'),
};

https.createServer(httpsOptions, app).listen(443, () => {
    console.log('Server running at https://localhost');
});
