
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Box, Typography, Paper, Button, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#ff4081' },
  },
});

// Initialize IndexedDB
const initializeDatabase = () => {
  const dbRequest = indexedDB.open('userDatabase', 1);

  dbRequest.onupgradeneeded = (event) => {
    const db = (event.target as IDBRequest<IDBDatabase>).result;
    if (!db.objectStoreNames.contains('users')) {
      db.createObjectStore('users', { keyPath: 'username' });
      console.log('Object store created');
    }
  };

  dbRequest.onsuccess = () => {
    console.log('Database initialized');
  };

  dbRequest.onerror = () => {
    console.error('Error opening database', dbRequest.error);
  };
};

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const FormErrorMessage = ({ name }: { name: string }) => (
  <ErrorMessage name={name} render={(msg) => <Typography color="error" variant="caption">{msg}</Typography>} />
);

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = (values: { username: string; password: string }) => {
    const dbRequest = indexedDB.open('userDatabase', 1);
    dbRequest.onsuccess = (event) => {
      const db = (event.target as IDBRequest<IDBDatabase>).result;
      const transaction = db.transaction('users', 'readonly');
      const store = transaction.objectStore('users');
      const getUser = store.get(values.username);

      getUser.onsuccess = () => {
        if (getUser.result && getUser.result.password === values.password) {
          onLogin();
          navigate('/home');
        } else {
          setError('Invalid username or password');
        }
      };
    };
  };

  return (
    <Formik initialValues={{ username: '', password: '' }} validationSchema={validationSchema} onSubmit={handleLoginSubmit}>
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>LOGIN</Typography>
          <Field name="username" as={TextField} label="Username" fullWidth margin="normal" />
          <FormErrorMessage name="username" />
          <Field name="password" as={TextField} type="password" label="Password" fullWidth margin="normal" />
          <FormErrorMessage name="password" />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
          <Typography variant="body2" mt={2}>
            Don't have an account? <Link to="/signup" style={{ color: '#1976d2' }}>Sign Up here</Link>
          </Typography>
        </Form>
      )}
    </Formik>
  );
};

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUpSubmit = (values: { username: string; password: string }) => {
    const dbRequest = indexedDB.open('userDatabase', 1);
    dbRequest.onsuccess = (event) => {
      const db = (event.target as IDBRequest<IDBDatabase>).result;
      const transaction = db.transaction('users', 'readwrite');
      const store = transaction.objectStore('users');

      const getUser = store.get(values.username);
      getUser.onsuccess = () => {
        if (getUser.result) {
          alert('Account already exists. Please login.');
        } else {
          store.add(values).onsuccess = () => {
            alert('Signup successful! Redirecting to login.');
            navigate('/login');
          };
        }
      };
    };
  };

  return (
    <Formik initialValues={{ username: '', password: '' }} validationSchema={validationSchema} onSubmit={handleSignUpSubmit}>
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>SIGN UP</Typography>
          <Field name="username" as={TextField} label="Username" fullWidth margin="normal" />
          <FormErrorMessage name="username" />
          <Field name="password" as={TextField} type="password" label="Password" fullWidth margin="normal" />
          <FormErrorMessage name="password" />
          <Button type="submit" variant="contained" color="primary" fullWidth>Sign Up</Button>
          <Typography variant="body2" mt={2}>
            Already have an account? <Link to="/login" style={{ color: '#1976d2' }}>Login here</Link>
          </Typography>
        </Form>
      )}
    </Formik>
  );
};

const Home = ({ onLogout }: { onLogout: () => void }) => (
  <div>
    <Typography variant="h4">Welcome to Home Page</Typography>
    <Button onClick={onLogout} variant="contained" color="secondary">Logout</Button>
  </div>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    initializeDatabase();
    const user = localStorage.getItem('loggedInUser');
    if (user) setIsAuthenticated(true);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('loggedInUser', 'true');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ background: 'linear-gradient(135deg, #74b9ff, #0984e3)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Router>
          <Container>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <Paper elevation={6} sx={{ p: 4, maxWidth: 400, mx: 'auto' }}>
                <Routes>
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/login" element={<Login onLogin={handleLogin} />} />
                  <Route path="/home" element={isAuthenticated ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />} />
                  <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
              </Paper>
            </motion.div>
          </Container>
        </Router>
      </Box>
    </ThemeProvider>
  );
};

export default App;
