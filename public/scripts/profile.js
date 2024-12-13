document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        const profileInfo = document.getElementById('profileInfo');
        profileInfo.innerHTML = `
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Preferences:</strong> ${user.preferences.join(', ')}</p>
            <p><strong>Admin:</strong> ${user.isAdmin ? 'Yes' : 'No'}</p>
        `;
    } else {
        window.location.href = 'login.html';
    }
});