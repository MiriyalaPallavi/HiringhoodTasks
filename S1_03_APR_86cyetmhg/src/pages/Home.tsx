import React from "react";
import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";

const categories = ["Breakfast", "Lunch", "Dinner", "Dessert"];

const Home = () => {
  return (
    <div className="home-container">
      <div className="container">
        <h2>Choose your meal category</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/category/${category.toLowerCase()}`}
              style={{ textDecoration: "none" }}
            >
              <CategoryCard category={category} />
            </Link>
          ))}
        </div>
        <Link to="/add-recipe">
          <button className="upload-button">Upload</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
