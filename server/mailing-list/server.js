const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const { parse } = require('path');

const app = express();
const PORT = 3000;
const MAILING_LIST = './mailing-list.json';

app.use(cors());
app.use(bodyParser.json());

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

app.listen(PORT, () => {
    console.log(`Mailing list server running on http://localhost:${PORT}`);
});