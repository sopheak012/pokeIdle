import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  randomPokemon: null,
  guessedPokemon: [],
  isGameWon: false, // New state variable
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
    resetGame: (state) => {
      state.randomPokemon = null;
      state.guessedPokemon = [];
      state.isGameWon = false; // Reset isGameWon when resetting the game
    },
    setGameWon: (state, action) => {
      state.isGameWon = action.payload; // Set the value of isGameWon
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setRandomPokemon,
  addGuessedPokemon,
  resetGuessedPokemon,
  resetGame,
  setGameWon,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;