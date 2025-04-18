
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/users-with-posts');
      const sortedUsers = res.data.data.sort((a: User, b: User) =>
        a.name.localeCompare(b.name)
      );
      setUsers(sortedUsers);
    } catch (error: any) {
      console.error('Error fetching users:', error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container sx={{ backgroundColor: '#f0f2f5', minHeight: '100vh', p: 3 }}>
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/admin')}
        sx={{
          backgroundColor: '#2f3b52',
          color: 'white',
          '&:hover': { backgroundColor: '#1e2a3a' },
          textTransform: 'none',
          borderRadius: '8px',
          px: 2,
          py: 1,
          fontWeight: 'bold',
          fontSize: '0.9rem',
          mb: 3,
        }}
      >
        Back
      </Button>

      <Typography variant="h4" gutterBottom>
        Admin Users
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: '8px' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#2f3b52' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user._id}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#e3f2fd',
                  },
                }}
              >
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminUsersPage;
