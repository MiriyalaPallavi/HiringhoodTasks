import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "./recipesSlice";

const store = configureStore({
  reducer: {
    recipes: recipesReducer,
  },
});

// ✅ Correctly export RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
