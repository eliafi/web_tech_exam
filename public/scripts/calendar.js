document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: function(fetchInfo, successCallback, failureCallback) {
            fetch('http://localhost:5000/api/events')
                .then(response => response.json())
                .then(events => {
                    const formattedEvents = events.map(event => ({
                        title: event.name,
                        start: event.date,
                        description: event.description
                    }));
                    successCallback(formattedEvents);
                })
                .catch(error => failureCallback(error));
        },
        eventClick: function(info) {
            alert('Event: ' + info.event.title + '\nDescription: ' + info.event.extendedProps.description);
        }
    });

    calendar.render();
});