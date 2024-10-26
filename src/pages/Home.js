import React from 'react';
import { Container, Typography } from '@mui/material';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';

const Home = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Project Management</Typography>
      <ProjectForm />
      <ProjectList />
    </Container>
  );
};

export default Home;
