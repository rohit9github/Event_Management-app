import React, { useEffect, useState } from 'react';
import { getEvents } from '../api';

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await getEvents();
            setEvents(response.data);
        };
        fetchEvents();
    }, []);

    return (
        <div>
            <h1>Upcoming Events</h1>
            <ul>
                {events.map(event => (
                    <li key={event._id}>
                        <h2>{event.title}</h2>
                        <p>{event.description}</p>
                        <p>{event.date}</p>
                        <p>{event.location}</p>
                        <p>Max Attendees: {event.maxAttendees}</p>
                        {event.image && <img src={event.image} alt={event.title} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
