document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'events.html';
        } else {
            alert(data.error);
        }
    })
    .catch(error => console.error('Error:', error));
});