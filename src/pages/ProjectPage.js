// src/pages/ProjectPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import TaskList from '../components/TaskList';
import { Typography } from '@mui/material';

const ProjectPage = () => {
    const { projectId } = useParams();

    return (
        <div>
            <Typography variant="h4" sx={{ mb: 2 }}>Project Details</Typography>
            <TaskList projectId={projectId} />
        </div>
    );
};

export default ProjectPage;
