import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "../Redux/Slices/pokemonSlice";
export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});
