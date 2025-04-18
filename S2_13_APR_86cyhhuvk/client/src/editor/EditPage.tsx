

import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Card,
  Stack,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        console.error("Error fetching post", err);
        showSnackbar("Failed to load post", "error");
      }
    };
    fetchPost();
  }, [id]);

  const showSnackbar = (msg: string, severity: "success" | "error") => {
    setSnackbarMsg(msg);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await axios.put(
        `http://localhost:5000/api/posts/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showSnackbar("Post updated successfully", "success");
      setTimeout(() => navigate("/"), 2000);
    } catch (err: any) {
      console.error("Error updating post", err);
      showSnackbar(err?.response?.data?.message || "Update failed", "error");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showSnackbar("Post deleted successfully", "success");
      setTimeout(() => navigate("/"), 2000);
    } catch (err: any) {
      console.error("Error deleting post", err);
      showSnackbar(err?.response?.data?.message || "Delete failed", "error");
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <>
      <Card
        sx={{
          p: 4,
          maxWidth: 800,
          mx: "auto",
          mt: 5,
          borderRadius: 2,
          backgroundColor: "#2f3b52", // updated background color
          boxShadow: 3,
          position: "relative", // Add this to position the Back button
        }}
      >
        {/* Back Button */}
        <Button
          variant="outlined"
          onClick={handleBack}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            borderColor: 'white', // White border
            color: 'white', // Text color in white
            '&:hover': {
              backgroundColor: '#2f3b52', // Hover background in #2f3b52
              color: 'white', // Text color stays white
            },
          }}
        >
          Back
        </Button>

        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
          textAlign="center"
          color="white"
        >
          Edit Post
        </Typography>

        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#ffffff',
            },
            '& .MuiInputLabel-root': {
              color: '#ffffff', // label color adjusted for contrast
            },
          }}
        />

        <TextField
          fullWidth
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
          rows={6}
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#ffffff',
            },
            '& .MuiInputLabel-root': {
              color: '#ffffff', // label color adjusted for contrast
            },
          }}
        />

        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
          {/* Updated Button Styles */}
          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{
              px: 4,
              backgroundColor: 'white', // Button background in white
              color: '#2f3b52', // Button text color in #2f3b52
              '&:hover': {
                backgroundColor: '#2f3b52', // Hover background in #2f3b52
                color: 'white', // Text color changes to white on hover
              },
            }}
          >
            Update
          </Button>
          <Button
            variant="contained"
            onClick={handleDelete}
            sx={{
              px: 4,
              backgroundColor: 'white', // Button background in white
              color: '#2f3b52', // Button text color in #2f3b52
              '&:hover': {
                backgroundColor: '#2f3b52', // Hover background in #2f3b52
                color: 'white', // Text color changes to white on hover
              },
            }}
          >
            Delete
          </Button>
        </Stack>
      </Card>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbarSeverity}
          onClose={() => setOpenSnackbar(false)}
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditPage;


