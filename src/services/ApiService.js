// src/services/ApiService.js

import axios from 'axios';

const API_URL = 'https://localhost:7027/api'; // Replace with your actual API URL

// Create an Axios instance
const apiClient = axios.create({
    baseURL: API_URL,
});

// Function to set the token
export const setAuthToken = (token) => {
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
    }
};

const ApiService = {
    login: async (credentials) => {
        const response = await apiClient.post(`/auth/login`, credentials);
        return response.data;
    },
    fetchProjects: async () => {
        const response = await apiClient.get(`/project`);
        return response.data;
    },
    fetchProjectTasks: async (projectId) => {
        const response = await apiClient.get(`/task/project/${projectId}`);
        return response.data;
    },
    createProject: async (project) => {
        const response = await apiClient.post(`/project`, project);
        return response.data;
    },
    createTask: async (task) => {
        const response = await apiClient.post(`/task`, task);
        return response.data;
    },
};

export default ApiService;
