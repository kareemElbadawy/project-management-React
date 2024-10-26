// src/components/ProjectForm.js

import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import ApiService from '../services/ApiService';

const ProjectForm = ({ onProjectCreated }) => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const project = { projectName, description, startDate, endDate, budget };
    await ApiService.createProject(project);
    onProjectCreated();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Typography variant="h6">Create New Project</Typography>
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
        Create Project
      </Button>
    </Box>
  );
};

export default ProjectForm;
