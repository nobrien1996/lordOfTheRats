const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.EMAIL_DATABASE,
});

module.exports = pool;

