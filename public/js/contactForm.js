function contactForm(){
    emailjs.init('MQD_CHbAyhfloZeym')

    window.addEventListener('load', function () {
        document.getElementById('contact-form').addEventListener('submit', function (event) {
            event.preventDefault();
    
            emailjs.sendForm('contact_service', 'contact_form', this).then(() => {
                console.log('Email sent');
                alert('Email sent successfully');
            }).catch((error) => {
                console.error('Email not sent', error);
                alert('Email not sent');
            });
        });
    });
};

contactForm();