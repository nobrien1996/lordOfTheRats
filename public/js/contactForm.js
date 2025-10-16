function contactForm() {
    emailjs.init('MQD_CHbAyhfloZeym');

    window.addEventListener('load', function () {
        const form = document.getElementById('contact-form');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        function showError(input, message) {
            const errorEl = input.nextElementSibling;
            errorEl.textContent = message;
            input.classList.add('invalid');
        }

        function clearError(input) {
            const errorEl = input.nextElementSibling;
            errorEl.textContent = '';
            input.classList.remove('invalid');
        }

        function validateField(input, validatorFn, errorMsg) {
            if (!validatorFn(input.value.trim())) {
                showError(input, errorMsg);
                return false;
            } else {
                clearError(input);
                return true;
            }
        }

        function isNotEmpty(value) {
            return value !== '';
        }

        function isValidEmail(value) {
            return emailRegex.test(value);
        }

        nameInput.addEventListener('input', () => validateField(nameInput, isNotEmpty, 'Name is required'));
        emailInput.addEventListener('input', () => validateField(emailInput, isValidEmail, 'Enter a valid email'));
        subjectInput.addEventListener('input', () => validateField(subjectInput, isNotEmpty, 'Subject is required'));
        messageInput.addEventListener('input', () => validateField(messageInput, isNotEmpty, 'Message is required'));
            
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const isNameValid = validateField(nameInput, isNotEmpty, 'Name is required');
            const isEmailValid = validateField(emailInput, isValidEmail, 'Enter a valid email');
            const isSubjectValid = validateField(subjectInput, isNotEmpty, 'Subject is required');
            const isMessageValid = validateField(messageInput, isNotEmpty, 'Message is required');

            if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
                return;
            }
    
            emailjs.sendForm('contact_service', 'contact_form', form).then(() => {
                console.log('Email sent');
                alert('Email sent successfully');

                const subscribeToList = confirm('Would you like to join my mailing list?');

                if (subscribeToList) {
                    const name = nameInput.value.trim();
                    const email = emailInput.value.trim();

                    console.group('Fetch POST to /api/subscribe');
                    
                    fetch('http://localhost:4000/api/subscribe', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ name, email}),
                    }).then(response => {
                        if (response.ok) {
                            alert('You have been successfully subscribed!');
                        } else {
                            alert('There was an issue subscribing you, please try again');
                        }
                    }).catch(error => {
                        console.error('Subscription error:', error);
                        alert('There was a network error while subscribing.');
                    });
                }
                
                form.reset();
            }).catch((error) => {
                console.error('Email not sent', error);
                alert('Email not sent');
            });
        });
    });
}

contactForm();