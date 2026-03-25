const { Pool } = require('pg');
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

console.log('.env path:', require('path').join(__dirname, '../../.env'));
console.log('EMAIL_DATABASE:', process.env.EMAIL_DATABASE);

const pool = new Pool({
    connectionString: process.env.EMAIL_DATABASE,
});

module.exports = pool;

