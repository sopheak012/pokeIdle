import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  randomPokemon: null,
  guessedPokemon: [],
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setRandomPokemon: (state, action) => {
      state.randomPokemon = action.payload;
    },
    addGuessedPokemon: (state, action) => {
      state.guessedPokemon.push(action.payload);
    },
    resetGuessedPokemon: (state) => {
      state.guessedPokemon = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRandomPokemon, addGuessedPokemon, resetGuessedPokemon } =
  pokemonSlice.actions;

export default pokemonSlice.reducer;
