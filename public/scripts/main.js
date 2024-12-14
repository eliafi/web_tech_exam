document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const preferences = Array.from(document.querySelectorAll('input[name="preferences"]:checked')).map(el => el.value);
    const isAdmin = document.getElementById('isAdmin').checked;
    
    const user = {
        username,
        email,
        password,
        preferences,
        isAdmin
    };
    
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            window.location.href = 'login.html';
        } else {
            alert(data.error);
        }
    })
    .catch(error => console.error('Error:', error));
});