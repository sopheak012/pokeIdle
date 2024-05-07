import React from "react";
import { useSelector } from "react-redux";
import PokemonData from "../data/gen1.json";

const HintBar = () => {
  // Retrieve guessed Pokémon names from Redux store
  const guessedPokemonNames = useSelector(
    (state) => state.pokemon.guessedPokemon
  );

  // Filter PokemonData to include only guessed Pokemon
  const guessedPokemonData = guessedPokemonNames.map((name) =>
    PokemonData.find((pokemon) => pokemon.name === name)
  );

  // Reverse the guessedPokemonData array to display the latest guessed Pokémon at the top
  guessedPokemonData.reverse();

  return (
    <div className="mt-4 p-4 bg-white border border-gray-300 rounded-lg shadow-md">
      <div className="grid grid-cols-7 gap-4 mb-2">
        <div className="border border-gray-300 rounded p-2">
          <span className="font-semibold">Name</span>
        </div>
        <div className="border border-gray-300 rounded p-2">
          <span className="font-semibold">Type 1</span>
        </div>
        <div className="border border-gray-300 rounded p-2">
          <span className="font-semibold">Type 2</span>
        </div>
        <div className="border border-gray-300 rounded p-2">
          <span className="font-semibold">Habitat</span>
        </div>
        <div className="border border-gray-300 rounded p-2">
          <span className="font-semibold">Evolution Stage</span>
        </div>
        <div className="border border-gray-300 rounded p-2">
          <span className="font-semibold">Height</span>
        </div>
        <div className="border border-gray-300 rounded p-2">
          <span className="font-semibold">Weight</span>
        </div>
      </div>
      {guessedPokemonData.map((pokemon, index) => (
        <div key={index} className="grid grid-cols-7 gap-4 mb-2">
          <div className="border border-gray-300 rounded p-2">
            {pokemon.name}
          </div>
          <div className="border border-gray-300 rounded p-2">
            {pokemon.type[0]}
          </div>
          <div className="border border-gray-300 rounded p-2">
            {pokemon.type.length > 1 ? pokemon.type[1] : "None"}
          </div>
          <div className="border border-gray-300 rounded p-2">
            {pokemon.habitat}
          </div>
          <div className="border border-gray-300 rounded p-2">
            {pokemon.evolutionStage}
          </div>
          <div className="border border-gray-300 rounded p-2">
            {pokemon.height}
          </div>
          <div className="border border-gray-300 rounded p-2">
            {pokemon.weight}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HintBar;
