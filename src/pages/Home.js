// src/pages/Home.js
import React from 'react';
import ProjectList from '../components/ProjectList';
import { Typography } from '@mui/material';

const Home = () => {
    return (
        <div>
            <Typography variant="h4" sx={{ mb: 2 }}>Projects Dashboard</Typography>
            <ProjectList />
        </div>
    );
};

export default Home;
