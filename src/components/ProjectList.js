// src/components/ProjectList.js
import React, { useEffect, useState } from 'react';
import ApiService from '../services/ApiService';
import { Box, Table, TableHead, TableBody, TableRow, TableCell, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await ApiService.fetchProjects();
                setProjects(response.data);
            } catch (error) {
                toast.error("Failed to load projects");
            }
        };

        fetchProjects();
    }, []);

    const handleViewTasks = async (projectId) => {
        try {
            const response = await ApiService.fetchTasks(projectId);
            navigate('/tasks', { state: { tasks: response.data, projectId } });
        } catch (error) {
            toast.error("Failed to load tasks");
        }
    };

    const handleEditProject = (project) => {
        navigate('/project-form', { state: { project } }); // Navigate to ProjectForm with project data
    };

    const handleCreateProject = () => {
        navigate('/project-form'); // Navigate to ProjectForm for creating a new project
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h4" gutterBottom>
                Project List
            </Typography>
            <Button variant="contained" color="primary" onClick={handleCreateProject} sx={{ mb: 2 }}>
                Create New Project
            </Button>
            <Table sx={{ minWidth: 650 }} aria-label="project list table">
                <TableHead>
                    <TableRow>
                        <TableCell>Project Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Owner</TableCell>
                        <TableCell>Budget</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects.map(project => (
                        <TableRow key={project.projectId}>
                            <TableCell>
                                <Typography variant="h6">{project.projectName}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">{project.description}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">{project.owner}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">${project.budget.toFixed(2)}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">
                                    {project.status === 0 ? 'Not Started' : project.status === 1 ? 'In Progress' : 'Completed'}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" onClick={() => handleEditProject(project)}>
                                    Edit
                                </Button>
                                <Button variant="outlined" onClick={() => handleViewTasks(project.projectId)} sx={{ ml: 1 }}>
                                    View Tasks
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default ProjectList;
