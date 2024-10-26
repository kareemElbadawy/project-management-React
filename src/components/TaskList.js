// src/components/TaskList.js

import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import ApiService from '../services/ApiService';
import TaskForm from './TaskForm';
import { useParams } from 'react-router-dom';

const TaskList = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const data = await ApiService.fetchProjectTasks(projectId);
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>Tasks</Typography>
      <TaskForm projectId={projectId} onTaskCreated={fetchTasks} />
      {tasks.map((task) => (
        <Card key={task.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{task.taskName}</Typography>
            <Typography color="textSecondary">{task.description}</Typography>
            <Typography color="textSecondary">Assigned To: {task.assignedTo}</Typography>
            <Typography color="textSecondary">Status: {task.status}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
