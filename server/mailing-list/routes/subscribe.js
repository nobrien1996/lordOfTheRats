console.log('subscribe route file loaded')

const express = require('express');
const pool = require('../db');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const router = express.Router();

router.post('/', async (req, res) => {
    console.log('received POST /api/subscribe', req.body)
    const { name, email } = req.body;

    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: 'Invalid name or email' });
    }

    const token = crypto.randomBytes(32).toString('hex');

    try {
        await pool.query(`
            INSERT INTO subscribers (name, email, confirm_token)
            VALUES ($1, $2, $3)
            ON CONFLICT (email) DO UPDATE
            SET name = EXCLUDED.name, confirm_token = EXCLUDED.confirm_token;
        `, [name, email, token]);

        const confirmLink = `${process.env.BASE_URL}/confirm?token=${token}`;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Confirm your subscription',
            html: `
                <p>Hello ${name},</p>
                <p>Thank you for subscribing!</p>
                <p>Please confirm your email by clicking the link below:</p>
                <a href="${confirmLink}">${confirmLink}</a>
            `,
        });

        return res.status(200).json({ message: 'Confirmation email sent' });

    } catch (error) {
        console.error('Subscription Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/', (req, res) => {
    console.log('GET request received at /api/subscribe')
    res.status(200).send('Subscribe function now working');
});

module.exports = router;