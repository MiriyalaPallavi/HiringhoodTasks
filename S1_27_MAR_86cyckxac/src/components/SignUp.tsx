import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography } from '@mui/material';

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    const userData = {
      username: (document.getElementById('username') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value,
    };
    const dbRequest = indexedDB.open('userDatabase', 1);

    dbRequest.onupgradeneeded = (event) => {
      const db = (event.target as IDBRequest).result;
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'username' });
      }
    };

    dbRequest.onsuccess = () => {
      const db = dbRequest.result;
      const transaction = db.transaction('users', 'readwrite');
      const store = transaction.objectStore('users');
      store.add(userData);
      alert('Sign Up Successful!');
      navigate('/login');
    };

    dbRequest.onerror = () => {
      alert('Error in signing up. Try again.');
    };
  };

  return (
    <Container>
      <Typography variant="h4">Sign Up</Typography>
      <TextField id="username" label="Username" fullWidth margin="normal" />
      <TextField id="password" label="Password" type="password" fullWidth margin="normal" />
      <Button variant="contained" onClick={handleSignUp}>Sign Up</Button>
    </Container>
  );
};

export default SignUp;
