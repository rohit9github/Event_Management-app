import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Auth from './components/Auth';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/auth" element={<Auth/>} />
                    <Route path="/create-event" element={<EventForm/>} />
                    <Route path="/" element={<EventList/>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
