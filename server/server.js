const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const subscribeRoute = require('./mailing-list/routes/subscribe');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('public'));
app.use(( req, res, next ) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.use('/api/subscribe', subscribeRoute);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));