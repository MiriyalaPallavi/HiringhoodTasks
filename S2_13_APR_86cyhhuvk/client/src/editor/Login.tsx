
import React from 'react';
import {
  Container, Typography, Box, TextField, Button, Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(5, 'Minimum 5 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', values);
        if (response.data.status) {
          localStorage.setItem('token', response.data.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.data.user));
          alert(response.data.message);
          const role = response.data.data.user.role;
          
          navigate(role === 'user' ? '/' : '/admin');
        } else {
          alert(response.data.message);
        }
      } catch (error: any) {
        alert(error.response?.data?.message || 'Login failed');
      }
    },
  });

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: '#2f3b52', // Match background color from Add Post page
        p: 2,
      }}
    >
      <Paper elevation={12} sx={{ p: 5, width: 400, borderRadius: 4, backgroundColor: '#fff' }}>
        <Typography variant="h4" textAlign="center" gutterBottom color="#2f3b52">
          Welcome Back
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{
              '& .MuiInputLabel-root': {
                color: '#2f3b52', // Label color set to #2f3b52
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#2f3b52', // Border color set to #2f3b52
                },
                '&:hover fieldset': {
                  borderColor: '#2f3b52', // Border color on hover remains the same
                },
              },
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{
              '& .MuiInputLabel-root': {
                color: '#2f3b52', // Label color set to #2f3b52
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#2f3b52', // Border color set to #2f3b52
                },
                '&:hover fieldset': {
                  borderColor: '#2f3b52', // Border color on hover remains the same
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained" // Background color will be #2f3b52
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              fontWeight: 600,
              color: '#fff', // Text color set to white
              backgroundColor: '#2f3b52', // Button background color set to #2f3b52
              '&:hover': {
                backgroundColor: '#2f3b52', // Hover color remains the same
                color: '#fff', // Text color remains white
              },
            }}
          >
            Login
          </Button>
        </form>
        <Button
          onClick={() => navigate('/signup')}
          fullWidth
          sx={{
            mt: 2,
            textTransform: 'none',
            color: '#fff', // Text color set to white
            backgroundColor: '#2f3b52', // Button background color set to #2f3b52
            '&:hover': {
              backgroundColor: '#2f3b52', // Hover background remains the same
              color: '#fff', // Text color remains white
            },
          }}
        >
          Don’t have an account? <strong>&nbsp;Sign Up</strong>
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;






