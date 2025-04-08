import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography } from '@mui/material';

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const dbRequest = indexedDB.open('userDatabase', 1);

    dbRequest.onsuccess = () => {
      const db = dbRequest.result;
      const transaction = db.transaction('users', 'readonly');
      const store = transaction.objectStore('users');
      const request = store.get(username);

      request.onsuccess = () => {
        if (request.result && request.result.password === password) {
          localStorage.setItem('loggedInUser', username);
          onLogin();
          navigate('/home');
        } else {
          alert('Invalid Username or Password');
        }
      };

      request.onerror = () => {
        alert('Error during login');
      };
    };
  };

  return (
    <Container>
      <Typography variant="h4">Login</Typography>
      <TextField id="username" label="Username" fullWidth margin="normal" />
      <TextField id="password" label="Password" type="password" fullWidth margin="normal" />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
    </Container>
  );
};

export default Login;
