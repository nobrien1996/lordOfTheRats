const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

const subscribeRoute = require('./routes/subscribe');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/subscribe', subscribeRoute);

let mailingList = [];
if (fs.existsSync(MAILING_LIST)) {
    mailingList = JSON.parse(fs.readFileSync(MAILING_LIST));
}

app.post('/subscribe', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email ||  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: 'Invalid name or email' });
    }

    const alreadySubscribed = mailingList.some(entry => entry.email === email);
    if (alreadySubscribed) {
        return res.status(409).json({ message: 'Email already subscribed' });
    }

    mailingList.push({ name, email });
    fs.writeFileSync(MAILING_LIST, JSON.stringify(mailingList, null, 2));

    res.status(200).json({ message: 'You are now subscribed!' });
});

const httpsOptions = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem'),
};

https.createServer(httpsOptions, app).listen(443, () => {
    console.log('Secure server running on port 443');
});