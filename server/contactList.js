const form = document.getElementById('contact-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    const mutation = `
      mutation AddContact($name: String!, $email: String!) {
        addContact(name: $name, email: $email) {
          id
          name
          email
        }
      }
    `;

    const variables = { name, email };

    try {
      const response = await fetch('http://localhost:4000/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation, variables }),
      });

      const result = await response.json();
      if (result.data) {
        alert('Contact saved! ID: ' + result.data.addContact.id);
        form.reset();
      } else if (result.errors) {
        alert('Error: ' + result.errors[0].message);
      }
    } catch (err) {
      alert('Network error');
      console.error(err);
    }
  });