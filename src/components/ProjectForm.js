// src/components/ProjectForm.js
import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import ApiService from '../services/ApiService';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProjectForm = () => {
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [budget, setBudget] = useState('');
    
    const location = useLocation();
    const navigate = useNavigate();
    const project = location.state?.project; // Retrieve the project data if available

    useEffect(() => {
        if (project) {
            // If a project exists, populate the form fields with its data
            setProjectName(project.projectName);
            setDescription(project.description);
            setStartDate(project.startDate.split('T')[0]); // Adjust date format
            setEndDate(project.endDate.split('T')[0]); // Adjust date format
            setBudget(project.budget);
        }
    }, [project]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const projectData = { projectName, description, startDate, endDate, budget };
        
        console.log('Project Data:', projectData); // Log project data
        try {
            if (project) {
                await ApiService.updateProject(project.projectId, projectData);
                toast.success("Project updated successfully!");
            } else {
                await ApiService.createProject(projectData);
                toast.success("Project created successfully!");
            }
            navigate('/'); // Navigate back to project list after action
        } catch (error) {
            toast.error("Failed to save project");
            console.error(error); // Log the error for debugging
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
            <Typography variant="h6">{project ? 'Update Project' : 'Create New Project'}</Typography>
            <TextField
                label="Project Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
            />
            <TextField
                label="Description"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
                label="Start Date"
                type="date"
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
            />
            <TextField
                label="End Date"
                type="date"
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
            />
            <TextField
                label="Budget"
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" color="primary">
                {project ? 'Update Project' : 'Create Project'}
            </Button>
        </Box>
    );
};

export default ProjectForm;
