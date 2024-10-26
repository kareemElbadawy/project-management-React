// src/pages/ProjectPage.js

import React from 'react';
import { useParams } from 'react-router-dom';
import TaskList from '../components/TaskList';

const ProjectPage = () => {
  const { projectId } = useParams();

  return (
    <div>
      <h1>Project Details</h1>
      <TaskList projectId={projectId} />
    </div>
  );
};

export default ProjectPage;
