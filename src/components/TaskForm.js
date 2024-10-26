// src/components/TaskForm.js

import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import ApiService from '../services/ApiService';

const TaskForm = ({ projectId, onTaskCreated }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = { taskName, description, assignedTo, startDate, endDate, priority };
    await ApiService.createTask(task);
    onTaskCreated();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Typography variant="h6">Create New Task</Typography>
      <TextField
        label="Task Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
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
        label="Assigned To"
        variant="outlined"
        fullWidth
        margin="normal"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        required
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
        select
        label="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      >
        <option value="">Select Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </TextField>
      <Button type="submit" variant="contained" color="primary">
        Create Task
      </Button>
    </Box>
  );
};

export default TaskForm;
