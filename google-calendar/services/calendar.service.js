const {google} = require("googleapis");
const chalk = import("chalk").then(module => module.default);


async function addEvents(auth, summary, location, description, emails, dateStart, dateEnd) {
    const calendar = google.calendar({version: 'v3', auth});

    const event = {
        'summary': `${summary}`,
        'location': `${location}`,
        'description': `${description}`,
        'start': {
            'dateTime': new Date(dateStart),
            'timeZone': 'Europe/Kiev',
        },
        'end': {
            'dateTime': new Date(dateEnd),
            'timeZone': 'Europe/Kiev',
        },
        'attendees': emails,
        'reminders': {
            'useDefault': false,
            'overrides': [
                {'method': 'popup', 'minutes': 10},
            ],
        },
    };

    try {
        const response = await calendar.events.insert({
            auth: auth,
            calendarId: process.env.CALENDARID,
            resource: event,
        });

        return 'Event created: ' + response.data.htmlLink;
    } catch (error) {
        return 'Error creating event: ' + error.message;
    }
}

module.exports = {
    addEvents
}
