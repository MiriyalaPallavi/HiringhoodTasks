

import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Card,
  CardContent,
  CssBaseline,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Post {
  _id: string;
  title: string;
  content: string;
  category: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  const [posts, setPosts] = useState<Post[]>([]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleAddPost = () => {
    navigate('/add-post');
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data.data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    if (token) {
      fetchPosts();
    } else {
      navigate('/login');
    }
  }, [navigate, token]);

  return (
    <>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{ background: '#2f3b52', boxShadow: 3 }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
            Content Management System
          </Typography>
          <Box>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleAddPost}
              sx={{
                mx: 1,
                borderColor: '#fff',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#fff',
                  color: '#2f3b52',
                  borderColor: '#2f3b52',
                },
              }}
            >
              Add Post
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleLogout}
              sx={{
                mx: 1,
                borderColor: '#fff',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#fff',
                  color: '#2f3b52',
                  borderColor: '#2f3b52',
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#2f3b52' }}>
          Welcome, {user.name || 'User'} 👋
        </Typography>

        {posts.length > 0 ? (
          <Box mt={4}>
            <Box
              display="grid"
              gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
              gap={3}
            >
              {posts.map((post) => (
                <Card
                  key={post._id}
                  onClick={() => {
                    localStorage.setItem('post', post._id);
                    navigate(`/edit/${post._id}`);
                  }}
                  sx={{
                    cursor: 'pointer',
                    transition: '0.3s',
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: '#2f3b52', // Updated to match background color
                    color: '#fff', // Text color updated to white
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" color="#fff">
                      {post.title}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1, color: '#fff' }}>
                      {post.content}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="#fff" // Updated to white text
                      sx={{ mt: 1 }}
                    >
                      Category: {post.category?.name || 'N/A'}
                    </Typography>
                    <Typography variant="caption" color="#fff"> {/* Updated to white text */}
                      Created At: {new Date(post.createdAt).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        ) : (
          <Typography mt={4} sx={{ color: '#fff' }}>
            No posts available.
          </Typography>
        )}
      </Container>
    </>
  );
};

export default Home;
