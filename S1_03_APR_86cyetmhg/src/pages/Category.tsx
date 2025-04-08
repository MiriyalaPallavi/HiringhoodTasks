import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import RecipeCard from "../components/RecipeCard";

const Category: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const recipes = useSelector((state: RootState) =>
    state.recipes.recipes.filter((recipe) => recipe.category === categoryName)
  );

  return (
    <div className="container">
      <h2>{categoryName} Recipes</h2>
      {recipes.length > 0 ? (
        <div className="recipe-list">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p>No recipes available for {categoryName}.</p>
      )}
    </div>
  );
};

export default Category;
