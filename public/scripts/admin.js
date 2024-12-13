document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('eventName').value;
    const date = document.getElementById('eventDate').value;
    const time = document.getElementById('eventTime').value;
    const location = document.getElementById('eventLocation').value;
    const description = document.getElementById('eventDescription').value;
    const capacity = document.getElementById('eventCapacity').value;
    
    const newEvent = { name, date, time, location, description, capacity: parseInt(capacity) };
    
    fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEvent)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadEvents();
        eventForm.reset();
    })
    .catch(error => console.error('Error:', error));
});

function loadEvents() {
    fetch('http://localhost:5000/api/events')
        .then(response => response.json())
        .then(events => {
            const eventTableBody = document.getElementById('eventTableBody');
            eventTableBody.innerHTML = '';
            events.forEach(event => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${event.name}</td>
                    <td>${event.date}</td>
                    <td>${event.time}</td>
                    <td>${event.location}</td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="deleteEvent('${event._id}')">Delete</button>
                    </td>
                `;
                eventTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

function deleteEvent(eventId) {
    fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadEvents();
    })
    .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', loadEvents);