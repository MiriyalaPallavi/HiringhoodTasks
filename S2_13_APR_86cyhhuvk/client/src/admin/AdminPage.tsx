
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Box display="flex" minHeight="100vh" bgcolor="#f4f6f8">
      {/* Sidebar */}
      <Box
        width="240px"
        bgcolor="#2f3b52"
        color="white"
        p={3}
        display="flex"
        flexDirection="column"
      >
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Admin Panel
        </Typography>
        <Button
          fullWidth
          sx={{ color: 'white', justifyContent: 'flex-start', mb: 1, '&:hover': { bgcolor: '#39455e' } }}
          onClick={() => handleNavigation('/admin/users')}
        >
          Users
        </Button>
        <Button
          fullWidth
          sx={{ color: 'white', justifyContent: 'flex-start', mb: 1, '&:hover': { bgcolor: '#39455e' } }}
          onClick={() => handleNavigation('/admin/posts')}
        >
          Posts
        </Button>
        <Button
          fullWidth
          sx={{ color: 'white', justifyContent: 'flex-start', mb: 1, '&:hover': { bgcolor: '#39455e' } }}
          onClick={() => handleNavigation('/admin/categories')}
        >
          Categories
        </Button>
      </Box>

      {/* Main Content */}
      <Box flex={1} p={4} display="flex" flexDirection="column">
        {/* Logout Button in top-right */}
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={handleLogout}
            sx={{
              backgroundColor: '#2f3b52',  // Background color as requested
              color: '#fff',
              borderRadius: '8px',
              fontWeight: 'bold',
              px: 2,
              py: 1,
              '&:hover': {
                backgroundColor: '#3b4a66',  // Lighter color on hover
              },
            }}
          >
            Logout
          </Button>
        </Box>

        {/* Welcome Content */}
        <Container maxWidth="sm" sx={{ mt: 10, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="medium" color="#333" gutterBottom>
            Welcome to the Admin Dashboard
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Use the sidebar on the left to manage users, posts, and categories.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};



export default AdminPage;
