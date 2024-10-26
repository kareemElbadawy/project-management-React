// src/components/ProjectList.js

import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, CardActions, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import ApiService, { setAuthToken } from '../services/ApiService';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (token) setAuthToken(token); // Set the auth token for requests

            try {
                const data = await ApiService.fetchProjects(); // Call your API method to fetch projects
                setProjects(data);
            } catch (err) {
                setError('Failed to fetch projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Handler for the "View" button
    const handleViewClick = (projectId) => {
        navigate(`/projects/${projectId}`); // Redirect to the project detail page
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Project List
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {projects.map(project => (
                        <Card key={project.projectId} sx={{ minWidth: 300 }}>
                            <CardContent>
                                <Typography variant="h6">{project.projectName}</Typography>
                                <Typography variant="body2">{project.description}</Typography>
                                <Typography variant="body2">Budget: ${project.budget.toFixed(2)}</Typography>
                                <Typography variant="body2">Owner: {project.owner}</Typography>
                                <Typography variant="body2">
                                    Status: {project.status === 0 ? 'Active' : 'Inactive'}
                                </Typography>
                                <Typography variant="body2">
                                    Start Date: {new Date(project.startDate).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2">
                                    End Date: {new Date(project.endDate).toLocaleDateString()}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button 
                                    size="small" 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={() => handleViewClick(project.projectId)} // Attach click handler
                                >
                                    View
                                </Button>
                                <Button size="small" variant="outlined">
                                    Edit
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default ProjectList;
