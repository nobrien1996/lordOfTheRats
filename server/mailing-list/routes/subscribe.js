const express = require('express');
const pool = require('../db');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: 'Invalid name or email' });
    }

    const token = crypto.randomBytes(32).toString('hex');

    try {
        await pool.query(`
            INSERT INTO subscribers (name, email, confirm_token)
            VALUES ($1, $2, $3)
            ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, confirm_token = EXCLUDED.confirm_token
        `, [name, email, token]);

        const confirmLink = `${process.env.BASE_URL}/confirm?token=${token}`;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Confirm your subscription',
            html: `<p>Hello ${name},</p><p>Click to confirm: <a href="${confirmLink}">${confirmLink}</a></p>`
        });

        res.status(200).json({ message: 'Confirmation email sent' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;