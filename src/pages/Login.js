// src/pages/Login.js

import React, { useContext, useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AuthContext } from '../context/AuthContext';
import ApiService, { setAuthToken } from '../services/ApiService';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(credentials);
            localStorage.setItem('token', response.token);
            setAuthToken(response.token); // Set token for future requests
            navigate('/'); // Redirect to home page after successful login
        } catch (err) {
            setError('Login failed');
        }
    };

    return (
        <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ 
                maxWidth: 400, 
                mx: 'auto', 
                mt: 5, 
                padding: 3, 
                borderRadius: 2, 
                boxShadow: 3 
            }}
        >
            <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>Login</Typography>
            {error && <Typography color="error" sx={{ textAlign: 'center' }}>{error}</Typography>}
            <TextField
                name="email"
                label="Email"
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                variant="outlined"
            />
            <TextField
                name="password"
                label="Password"
                type="password"
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                variant="outlined"
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
            >
                Login
            </Button>
        </Box>
    );
};

export default Login;
