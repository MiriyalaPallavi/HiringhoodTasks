import React from "react";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  category: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={`/category/${category}`} className="category-card">
      <h3>{category}</h3>
    </Link>
  );
};

export default CategoryCard;
