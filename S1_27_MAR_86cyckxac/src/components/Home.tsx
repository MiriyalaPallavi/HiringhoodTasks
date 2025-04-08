import React from 'react';
import { Button, Container, Typography } from '@mui/material';

const Home = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <Container>
      <Typography variant="h4">Welcome to the Home Page!</Typography>
      <Button variant="contained" onClick={onLogout}>Logout</Button>
    </Container>
  );
};

export default Home;
