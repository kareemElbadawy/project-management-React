// src/components/TaskForm.js
import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import ApiService from '../services/ApiService';

const TaskForm = ({ projectId, task, onClose }) => {
    const [formData, setFormData] = useState({
        taskName: '',
        description: '',
        assignedTo: '',
        startDate: '',
        endDate: '',
        priority: 'Low',
        status: 'Not Started'
    });

    useEffect(() => {
        if (task) {
            setFormData({
                taskName: task.taskName,
                description: task.description,
                assignedTo: task.assignedTo,
                startDate: task.startDate,
                endDate: task.endDate,
                priority: task.priority,
                status: task.status
            });
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (task) {
                await ApiService.updateTask(task.taskId, formData);
                toast.success("Task updated successfully!");
            } else {
                await ApiService.createTask(projectId, formData);
                toast.success("Task created successfully!");
            }
            onClose();
        } catch {
            toast.error("Failed to save task");
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, boxShadow: 3, borderRadius: 2, mt: 2 }}>
            <Typography variant="h6">{task ? "Edit Task" : "Add Task"}</Typography>
            <TextField name="taskName" label="Task Name" value={formData.taskName} onChange={handleChange} fullWidth required margin="normal" />
            <TextField name="description" label="Description" value={formData.description} onChange={handleChange} fullWidth multiline margin="normal" />
            <TextField name="assignedTo" label="Assigned To" value={formData.assignedTo} onChange={handleChange} fullWidth margin="normal" />
            <TextField name="startDate" label="Start Date" type="date" value={formData.startDate} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
            <TextField name="endDate" label="End Date" type="date" value={formData.endDate} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
            <TextField name="priority" label="Priority" select value={formData.priority} onChange={handleChange} fullWidth margin="normal">
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
            </TextField>
            <TextField name="status" label="Status" select value={formData.status} onChange={handleChange} fullWidth margin="normal">
                <MenuItem value="Not Started">Not Started</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
            </TextField>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                {task ? "Update Task" : "Create Task"}
            </Button>
            <Button onClick={onClose} color="secondary" fullWidth sx={{ mt: 1 }}>Cancel</Button>
        </Box>
    );
};

export default TaskForm;
