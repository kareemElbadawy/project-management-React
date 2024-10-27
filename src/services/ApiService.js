// src/api/servicesService.js
import axios from 'axios';

// Create an Axios instance with the base URL
const ApiService = axios.create({
    baseURL: 'https://localhost:7027/api',
});

// Function to set the authorization token for future requests
export const setAuthToken = (token) => {
    if (token) {
        ApiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete ApiService.defaults.headers.common['Authorization'];
    }
};

// Exporting the API methods
export default {
    login: (credentials) => ApiService.post('/auth/login', credentials),
    fetchProjects: () => ApiService.get('/project'),
    fetchTasks: (projectId) => ApiService.get(`/task/project/${projectId}`),
    createProject: (data) => ApiService.post('/project', data),
    updateProject: (projectId, data) => ApiService.put(`/project/${projectId}`, data), // This is the method we added
    createTask: (projectId, data) => ApiService.post(`/task/project/${projectId}`, data),
    updateTask: (taskId, data) => ApiService.put(`/task/${taskId}`, data),
    getOverdueTasks: () => ApiService.get('/task/overdue'),
};
