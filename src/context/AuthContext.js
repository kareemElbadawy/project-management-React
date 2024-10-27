// src/context/AuthContext.js
import React, { createContext, useState } from 'react';
import ApiService, { setAuthToken } from '../services/ApiService'; // Correct path to servicesService
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = async (credentials) => {
        try {
            const response = await ApiService.login(credentials);
            const { token } = response.data; // Get token from response
            setUser(response.data.user); // Adjust based on your API response
            localStorage.setItem('token', token);
            setAuthToken(token); // Set the token for future requests
            toast.success("Logged in successfully");
            navigate('/'); // Navigate after successful login
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        setAuthToken(null); // Clear the token on logout
        navigate('/login');
        toast.info("Logged out successfully");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
