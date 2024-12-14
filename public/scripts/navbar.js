function toggleNavbar() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

// Check if the user is logged in and show the admin link if true
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        if (user.isAdmin) {
            document.getElementById('adminLink').style.display = 'block';
        }
    } else {
        document.getElementById('profileLink').addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'login.html';
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        // User is not logged in, redirect to login page
        window.location.href = 'login.html';
    }
});