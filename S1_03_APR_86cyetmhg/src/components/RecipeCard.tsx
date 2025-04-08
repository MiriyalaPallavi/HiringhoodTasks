import { Link } from "react-router-dom";
import { Recipe } from "../redux/recipesSlice";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.id}`} className="recipe-card">
      <img src={recipe.imageUrl} alt={recipe.title} /> {/* ✅ Fix this */}
      <h3>{recipe.title}</h3>
    </Link>
  );
};

export default RecipeCard;
