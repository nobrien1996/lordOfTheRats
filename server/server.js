const fs = require('fs');
const https = require('https');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const subscribeRoute = require('./mailing-list/routes/subscribe.js');
const confirmRoute = require('./mailing-list/routes/confirm.js');
const unsubscribeRoute = require('./mailing-list/routes/unsubscribe.js')

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/index", (req, res) => {
    res.json({ message: "Hello from Express on Vercel!" });
});

app.use(express.static(path.join(__dirname, '..')));
app.use(( req, res, next ) => {
    console.log('REQ:', req.method, req.url);
    next();
});
app.use('/api/subscribe', subscribeRoute);
app.use('/api/confirm', confirmRoute);
app.use('/api/unsubscribe', unsubscribeRoute);

if (require.main === module) {
    app.listen(3333, () => {
        console.log('Server is running on http://localhost:3333');
    });
}

module.exports = app;