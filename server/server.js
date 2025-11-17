const fs = require('fs');
const https = require('https');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const subscribeRoute = require('./mailing-list/routes/subscribe.js');

const app = express();
const options = {
    key: fs.readFileSync('server\certs\private\thelordoftherats.com-PrivateKey.pem'),
    cert: fs.readFileSync('server\certs\public\thelordoftherats.com-CSR.pem')
};

https.createServer(options, app).listen(443, () => {
    console.log('Server is running on https://localhost:443')
});

app.get('/', (req, res) => {
    res.send('Hello, SSL!');
});

app.use(cors());
app.use(express.json());

app.get("/api/index", (req, res) => {
    res.json({ message: "Hello from Express on Vercel!" });
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(( req, res, next ) => {
    console.log('REQ:', req.method, req.url);
    next();
});
app.use('/api', subscribeRoute);

module.exports = app;