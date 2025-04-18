


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
  Box,
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Author {
  _id: string;
  name: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  status: string;
  author: Author;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/posts');
      const postsData = Array.isArray(res.data.posts) ? res.data.posts : [];
      setPosts(postsData);
    } catch (error: any) {
      console.error('Error fetching posts:', error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ backgroundColor: '#f0f2f5', minHeight: '100vh', p: 3 }}>
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
        Post Details
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: '8px' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#2f3b52' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Content</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Author Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Author ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow
                key={post._id}
                sx={{
                  '&:hover': {
                    backgroundColor: '#e3f2fd',
                  },
                }}
              >
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.content}</TableCell>
                <TableCell>{post.status}</TableCell>
                <TableCell>{post.author?.name || 'Unknown'}</TableCell>
                <TableCell>{post.author?._id || 'N/A'}</TableCell>
                <TableCell>{dayjs(post.createdAt).format('DD MMM YYYY, HH:mm')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Posts;
