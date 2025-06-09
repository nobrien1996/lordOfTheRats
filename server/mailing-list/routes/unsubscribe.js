const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
    const email = req.query.email;
    if (!email) return res.status(400).send('Missing email');

    try {
        const result = await pool.query(
            `UPDATE subscribers SET unsubscribed = TRUE WHERE email = $1 RETURNING *`,
            [email]
        );

        if (result.rowCount === 0) {
            return res.status(404).send('Email not found');
        }

        res.send('You have been unsubscribed.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;