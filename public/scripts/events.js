const events = [
    { name: 'Workshop 1', date: '2023-10-01', time: '10:00 AM', location: 'Room A', capacity: 30 },
    { name: 'Seminar 1', date: '2023-10-02', time: '2:00 PM', location: 'Room B', capacity: 50 },
    // Add more events as needed
];

function loadEvents() {
    fetch('http://localhost:5000/api/events')
        .then(response => response.json())
        .then(events => {
            const eventList = document.getElementById('eventList');
            eventList.innerHTML = '';

            events.forEach(event => {
                const eventCard = document.createElement('div');
                eventCard.className = 'event-card';

                eventCard.innerHTML = `
                    <h3>${event.name}</h3>
                    <button onclick="viewEventDetails('${event._id}')">View Details</button>
                `;

                eventList.appendChild(eventCard);
            });
        })
        .catch(error => console.error('Error:', error));
}

function viewEventDetails(eventId) {
    window.location.href = `event-details.html?id=${eventId}`;
}

document.addEventListener('DOMContentLoaded', loadEvents);