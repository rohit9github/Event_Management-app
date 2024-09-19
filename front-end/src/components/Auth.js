import React, { useState, useContext } from 'react';
import { registerUser, loginUser } from '../api';
import AuthContext from '../context/AuthContext';

const Auth = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validate that email and password are filled
        if (!email || !password) {
            return alert('Please fill in both email and password.');
        }

        try {
            // Call the loginUser API function
            const response = await loginUser({ email, password });
            login(response.data); // Call the login function in AuthContext with response data
            alert('Login successful');
        } catch (error) {
            console.error("Login failed:", error.response?.data?.message || error.message);
            alert('Login failed: ' + (error.response?.data?.message || 'Server error'));
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Ensure that all fields are filled
        if (!username || !email || !password) {
            return alert('Please fill in all fields.');
        }

        try {
            // Call the registerUser API function
            const response = await registerUser({ username, email, password });
            alert('Registration successful');
        } catch (error) {
            console.error("Registration failed:", error.response?.data?.message || error.message);
            alert('Registration failed: ' + (error.response?.data?.message || 'Server error'));
        }
    };

    return (
        <div>
            <h1>Login/Register</h1>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Auth;
