import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { deleteRecipe } from "../redux/recipesSlice";

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Find the recipe by ID
  const recipe = useSelector((state: RootState) =>
    state.recipes.recipes.find((recipe) => recipe.id === id)
  );

  if (!recipe) {
    return <h2 className="container">Recipe not found!</h2>;
  }

  const handleDelete = () => {
    dispatch(deleteRecipe(id!));
    navigate("/");
  };

  return (
    <div className="container">
      <h2>{recipe.title}</h2>
      <img src={recipe.imageUrl} alt={recipe.title} width="100%" />
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
      <button className="button" onClick={() => navigate(`/edit-recipe/${id}`)}>Edit</button>
      <button className="button" onClick={handleDelete} style={{ marginLeft: "10px", backgroundColor: "red" }}>
        Delete
      </button>
    </div>
  );
};

export default RecipeDetails;
 
