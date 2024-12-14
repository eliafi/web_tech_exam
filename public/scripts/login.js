document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.user) {
            alert('Login successful');
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'events.html';
        } else {
            alert(data.error || 'Login failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while logging in. Please try again.');
    });
});
// Compare this snippet from public/scripts/profile.js: