
import React, { useEffect, useState } from 'react';
import {
  TextField,
  Card,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
  Grid,
  Paper,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Grid2 from '@mui/material/Unstable_Grid2';

interface Category {
  _id: string;
  name: string;
}

const AddPost: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);

  const mainColor = '#2f3b52';
  const hoverColor = '#39455e';

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/categories')
      .then((response) => {
        const fetchedCategories: Category[] = response?.data?.data || [];
        setCategories(fetchedCategories);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      category: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      content: Yup.string().required('Content is required'),
      category: Yup.string().required('Category is required'),
    }),
    onSubmit: async (values) => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to add a post.');
        return;
      }

      try {
        setLoading(true);
        const response = await axios.post(
          'http://localhost:5000/api/posts/create',
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.data?.status) {
          setOpenSnackbar(true);
          formik.resetForm();
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          alert(response.data.message);
        }
      } catch (error: any) {
        alert(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Grid2
        container
        spacing={3}
        justifyContent="center"
        mt={4}
        sx={{ backgroundColor: '#f0f2f5', minHeight: '100vh', py: 4 }}
      >
        <Grid item xs={12} md={8}>
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 2,
              backgroundColor: mainColor,
              color: 'white',
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h4" fontWeight={700}>
                Create a New Post
              </Typography>
              <Button
                onClick={() => navigate(-1)}
                variant="contained"
                sx={{
                  backgroundColor: mainColor,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: hoverColor,
                  },
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 'bold',
                }}
              >
                Back
              </Button>
            </Box>

            <form onSubmit={formik.handleSubmit} noValidate>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                sx={{
                  mb: 3,
                  backgroundColor: 'white',
                  borderRadius: 1,
                }}
              />

              <TextField
                fullWidth
                label="Content"
                variant="outlined"
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.content && Boolean(formik.errors.content)}
                helperText={formik.touched.content && formik.errors.content}
                multiline
                rows={5}
                sx={{
                  mb: 3,
                  backgroundColor: 'white',
                  borderRadius: 1,
                }}
              />

              <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Category"
                  error={formik.touched.category && Boolean(formik.errors.category)}
                  sx={{ backgroundColor: 'white', borderRadius: 1 }}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.category && formik.errors.category && (
                  <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                    {formik.errors.category}
                  </Typography>
                )}
              </FormControl>

              <Box textAlign="right" mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  endIcon={loading && <CircularProgress size={20} color="inherit" />}
                  sx={{
                    backgroundColor: '#ffffff',
                    color: mainColor,
                    '&:hover': {
                      backgroundColor: '#e0e0e0',
                    },
                    fontWeight: 'bold',
                    borderRadius: 2,
                    textTransform: 'none',
                  }}
                >
                  {loading ? 'Posting...' : 'Add Post'}
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid2>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Post added successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddPost;
