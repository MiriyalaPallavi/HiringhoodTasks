import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
  category: string;  
  ingredients: string[];
  instructions: string;
}

interface RecipesState {
  recipes: Recipe[];
}

const initialState: RecipesState = {
  recipes: [],
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.recipes.push(action.payload);
    },
    deleteRecipe: (state, action: PayloadAction<string>) => {
      state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload);
    },
    updateRecipe: (state, action: PayloadAction<Recipe>) => {
      const index = state.recipes.findIndex(recipe => recipe.id === action.payload.id);
      if (index !== -1) state.recipes[index] = action.payload;
    },
  },
});

export const { addRecipe, deleteRecipe, updateRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;
