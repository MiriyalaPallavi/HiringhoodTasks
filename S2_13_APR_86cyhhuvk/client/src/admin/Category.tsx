
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import AddCategory from "./AddCategory";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Category {
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
  createdAt: string;
  count: number;
}

const Category = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [addCategory, setAddCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const fetchCategory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories/count/category");
      setCategories(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setAddCategory(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategory();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Grid item>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => window.history.back()}
            sx={{
              backgroundColor: "#2f3b52",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#3b4a66",
              },
            }}
          >
            Back
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => {
              setSelectedCategory(null);
              setAddCategory(true);
            }}
            sx={{
              backgroundColor: "#2f3b52",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#3b4a66",
              },
            }}
          >
            Add Category
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#2f3b52" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}><strong>ID</strong></TableCell>
              <TableCell sx={{ color: "#fff" }}><strong>Name</strong></TableCell>
              <TableCell sx={{ color: "#fff" }}><strong>Description</strong></TableCell>
              <TableCell sx={{ color: "#fff" }}><strong>Post Count</strong></TableCell>
              <TableCell sx={{ color: "#fff" }}><strong>Created At</strong></TableCell>
              <TableCell sx={{ color: "#fff" }}><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.categoryId} hover>
                <TableCell>{category.categoryId}</TableCell>
                <TableCell>{category.categoryName}</TableCell>
                <TableCell>{category.categoryDescription || "-"}</TableCell>
                <TableCell>{category.count}</TableCell>
                <TableCell>{new Date(category.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(category)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(category.categoryId)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddCategory
        addCategory={addCategory}
        setAddCategory={setAddCategory}
        selectedCategory={selectedCategory}
        refreshCategoryList={fetchCategory}
      />
    </Box>
  );
};

export default Category;
