import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addRecipe, updateRecipe } from "../redux/recipesSlice";
import { v4 as uuidv4 } from "uuid";

const mealCategories = ["Breakfast", "Lunch", "Dinner", "Snacks", "Desserts"];

const RecipeForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const existingRecipe = useSelector((state: RootState) =>
    state.recipes.recipes.find((recipe) => recipe.id === id)
  );

  const [title, setTitle] = useState(existingRecipe?.title || "");
  const [imageUrl, setImageUrl] = useState(existingRecipe?.imageUrl || "");
  const [category, setCategory] = useState(existingRecipe?.category || mealCategories[0]);
  const [ingredients, setIngredients] = useState(existingRecipe?.ingredients.join(", ") || "");
  const [instructions, setInstructions] = useState(existingRecipe?.instructions || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ingredientList = ingredients.split(",").map((ing) => ing.trim());

    const recipeData = {
      id: id || uuidv4(),
      title,
      imageUrl,
      category,
      ingredients: ingredientList,
      instructions,
    };

    if (id) {
      dispatch(updateRecipe(recipeData));
    } else {
      dispatch(addRecipe(recipeData));
    }
    navigate("/");
  };

  return (
    <div className="container">
      <h2>{id ? "Edit Recipe" : "Add New Recipe"}</h2>
      <form className="recipe-form" onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Image URL:</label>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />

        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          {mealCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <label>Ingredients (comma-separated):</label>
        <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />

        <label>Instructions:</label>
        <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />

        <button className="button" type="submit">{id ? "Update" : "Add"} Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;
