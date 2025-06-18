document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    try {
      const response = await fetch('http://localhost:5500/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Contact saved! ID: ' + result.id);
        form.reset();
      } else {
        alert('Error: ' + result.error);
      }
    } catch (err) {
      alert('Network error');
      console.error(err);
    }
  });
});