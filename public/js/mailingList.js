document.getElementById('signup-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  fetch('http://localhost:3000/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email })
  })
  .then(response => response.json())
  .then(data => {
    alert('Successfully saved!');
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Failed to save');
  });
});