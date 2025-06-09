const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
    const token = req.query.token;
    if (!token) return res.status(400).send('Missing token');

    try {
        const result = await pool.query(
            `UPDATE subscribers SET confirmed = TRUE WHERE confirm_token = $1 RETURNING *`,
            [token]
        );

        if (result.rowCount === 0) {
            return res.status(404).send('Invalid or expired confirmation token.');
        }

        res.send('Subscription confirmed. Thank you!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;