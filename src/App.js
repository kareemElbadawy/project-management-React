// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthProvider from './context/AuthContext'; // Import your AuthProvider
import Home from './pages/Home';
import Login from './pages/Login';
import ProjectPage from './pages/ProjectPage';
import TaskList from './components/TaskList';
import ProjectForm from './components/ProjectForm';
// Import other necessary components

const App = () => {
    return (
        <Router> {/* Router wrapping the entire app */}
            <AuthProvider> {/* AuthProvider inside Router */}
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/project/:projectId" element={<ProjectPage />} />
                    <Route path="/tasks" element={<TaskList />} /> {/* Directly to TaskList */}
                    <Route path="/project-form" element={<ProjectForm />} />
                    {/* Add other routes as necessary */}
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
