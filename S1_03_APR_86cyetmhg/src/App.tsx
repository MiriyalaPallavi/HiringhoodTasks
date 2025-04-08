import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Navbar from "./components/Navbar";
import "./styles.css";

// Lazy loading pages for performance optimization
const Home = lazy(() => import("./pages/Home"));
const Category = lazy(() => import("./pages/Category"));
const RecipeDetails = lazy(() => import("./pages/RecipeDetails"));
const RecipeForm = lazy(() => import("./pages/RecipeForm"));

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/add-recipe" element={<RecipeForm />} />
            <Route path="/edit-recipe/:id" element={<RecipeForm />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
};

export default App;
