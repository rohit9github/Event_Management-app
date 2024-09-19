import React, { useState, useContext, useEffect } from 'react';
import { createEvent } from '../api';
import AuthContext from '../context/AuthContext';

const EventForm = () => {
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [maxAttendees, setMaxAttendees] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (!user || !user.token) {
            alert('You must be logged in to create an event.');
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user.token) {
            return alert("User is not authenticated. Please login.");
        }
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('date', date);
        formData.append('location', location);
        formData.append('maxAttendees', maxAttendees);
        if (image) {
            formData.append('image', image);
        }
        try {
            await createEvent(formData, user.token);
            alert('Event created successfully!');
        } catch (error) {
            console.error("Event creation failed:", error);
            alert('Event creation failed.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
            <input value={date} onChange={(e) => setDate(e.target.value)} type="date" required />
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required />
            <input value={maxAttendees} onChange={(e) => setMaxAttendees(e.target.value)} type="number" placeholder="Max Attendees" required />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <button type="submit">Create Event</button>
        </form>
    );
};

export default EventForm;
