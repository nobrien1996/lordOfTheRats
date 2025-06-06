const router = require('express').Router();

emailjs.init({
    publicKey: 'MQD_CHbAyhfloZeym'
})

window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        emailjs.sendForm('contact_service', 'contact_form', this)
            then(() => {
                console.log('Email sent');
            }, (error) => {
                console.log('Email not sent', error);
            });
    })
}