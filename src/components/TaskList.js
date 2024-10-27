// src/components/TaskList.js
import React from 'react';
import { Box, Typography, Table, TableHead, TableBody, TableRow, TableCell, IconButton, Tooltip } from '@mui/material';
import { PriorityHigh, Edit, Delete, Warning } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom'; // Import useLocation

const TaskList = () => {
    const location = useLocation();
    const { tasks, projectId } = location.state || { tasks: [], projectId: null }; // Retrieve tasks and projectId from the location state

    // Function to map priority integer to string
    const getPriorityLabel = (priority) => {
        switch (priority) {
            case 0: return 'Low';
            case 1: return 'Medium';
            case 2: return 'High';
            default: return 'Unknown';
        }
    };

    // Function to map status integer to string
    const getStatusLabel = (status) => {
        switch (status) {
            case 0: return 'Not Started';
            case 1: return 'In Progress';
            case 2: return 'Completed';
            default: return 'Unknown';
        }
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h4" gutterBottom>
                Tasks for Project ID: {projectId}
            </Typography>
            <Table sx={{ minWidth: 650 }} aria-label="task list table">
                <TableHead>
                    <TableRow>
                        <TableCell>Task Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Assigned To</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task.taskId}>
                            <TableCell>{task.taskName}</TableCell>
                            <TableCell>{task.description}</TableCell>
                            <TableCell>{task.assignedTo}</TableCell>
                            <TableCell>{new Date(task.startDate).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Typography variant={task.status !== 2 && new Date(task.endDate) < new Date() ? "body1" : "body2"} color={task.status !== 2 && new Date(task.endDate) < new Date() ? "error" : "inherit"}>
                                    {new Date(task.endDate).toLocaleDateString()}
                                    {task.status !== 2 && new Date(task.endDate) < new Date() && (
                                        <Warning fontSize="small" style={{ marginLeft: '4px' }} />
                                    )}
                                </Typography>
                            </TableCell>
                            <TableCell>{getStatusLabel(task.status)}</TableCell>
                            <TableCell>{getPriorityLabel(task.priority)}</TableCell>
                            <TableCell>
                                <Tooltip title="Edit Task">
                                    <IconButton>
                                        <Edit color="primary" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete Task">
                                    <IconButton>
                                        <Delete color="error" />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default TaskList;
