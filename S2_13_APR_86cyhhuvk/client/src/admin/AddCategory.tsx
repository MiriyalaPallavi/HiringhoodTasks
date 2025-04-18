


import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DialogContent,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

interface AddCategoryProps {
  addCategory: boolean;
  setAddCategory: (value: boolean) => void;
  selectedCategory: Category | null;
  refreshCategoryList: () => void;
}

interface Category {
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
  createdAt: string;
  count: number;
}

const AddCategory = ({
  addCategory,
  setAddCategory,
  selectedCategory,
  refreshCategoryList,
}: AddCategoryProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (selectedCategory) {
      setName(selectedCategory.categoryName);
      setDescription(selectedCategory.categoryDescription || "");
    } else {
      setName("");
      setDescription("");
    }
  }, [selectedCategory]);

  const handleSave = async () => {
    setErrorMessage("");
    try {
      if (selectedCategory) {
        const res = await axios.put(
          `http://localhost:5000/api/categories/${selectedCategory.categoryId}`,
          {
            name,
            description,
          }
        );
        if (res.status === 200) {
          setShowSuccess(true);
        }
      } else {
        const res = await axios.post("http://localhost:5000/api/categories/add", {
          name,
          description,
        });
        if (res.status === 200 || res.status === 201) {
          setShowSuccess(true);
        }
      }

      setAddCategory(false);
      setName("");
      setDescription("");
      refreshCategoryList();
    } catch (error: any) {
      setErrorMessage("Name already exists or invalid input.");
      setShowError(true);
    }
  };

  return (
    <>
      <Dialog open={addCategory} onClose={() => setAddCategory(false)} fullWidth>
        <DialogTitle sx={{ color: "#2f3b52", fontWeight: "bold" }}>
          {selectedCategory ? "Edit Category" : "Add New Category"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Category Name"
            fullWidth
            margin="dense"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ "& label": { color: "#2f3b52" }, "& input": { color: "#2f3b52" } }}
          />
          <TextField
            label="Category Description"
            fullWidth
            margin="dense"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ "& label": { color: "#2f3b52" }, "& input": { color: "#2f3b52" } }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setAddCategory(false)}
            variant="outlined"
            sx={{
              color: "#2f3b52",
              borderColor: "#2f3b52",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                borderColor: "#2f3b52",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              backgroundColor: "#2f3b52",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#253044",
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Snackbar */}
      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setShowError(false)} variant="filled">
          {errorMessage}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={4000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)} variant="filled">
          {selectedCategory ? "Category updated successfully!" : "Category added successfully!"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddCategory;



