function getEventIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function loadEventDetails() {
    const eventId = getEventIdFromUrl();
    fetch(`http://localhost:5000/api/events/${eventId}`)
        .then(response => response.json())
        .then(event => {
            const eventDetails = document.getElementById('eventDetails');
            eventDetails.innerHTML = `
                <h3>${event.name}</h3>
                <p>Date: ${event.date}</p>
                <p>Time: ${event.time}</p>
                <p>Location: ${event.location}</p>
                <p>Description: ${event.description}</p>
                <p>Available Seats: ${event.capacity}</p>
            `;
        })
        .catch(error => console.error('Error:', error));
}

function rsvpEvent() {
    const eventId = getEventIdFromUrl();
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    fetch(`http://localhost:5000/api/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user._id })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        loadEventDetails();
    })
    .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', loadEventDetails);