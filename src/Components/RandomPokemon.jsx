import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRandomPokemon } from "../Redux/Slices/pokemonSlice";
import PokemonData from "../data/gen1.json";
import Random from "random";

const RandomPokemon = () => {
  const dispatch = useDispatch();

  // Retrieve the randomly selected Pokemon from the Redux state
  const randomPokemon = useSelector((state) => state.pokemon.randomPokemon);
  // Retrieve the guessed Pokemon from the Redux state
  const guessedPokemon = useSelector((state) => state.pokemon.guessedPokemon);

  useEffect(() => {
    // Generate a new random Pokemon when the component mounts
    generateRandomPokemon();
  }, []);

  const generateRandomPokemon = () => {
    // Generate a new random Pokemon
    const randomIndex = Random.int(0, PokemonData.length - 1);
    const newRandomPokemon = PokemonData[randomIndex].name;
    // Dispatch an action to store the new random Pokemon in the Redux state
    dispatch(setRandomPokemon(newRandomPokemon));
  };

  const handleNewGame = () => {
    // Add your new game functionality here
  };

  return (
    <div className="max-w-md mx-auto pt-64 text-center">
      <h1 className="text-2xl font-bold mb-4">Random Pokemon</h1>
      <div>
        <h2 className="text-xl mb-2">{randomPokemon}</h2>
        <h3>Guessed Pokemon:</h3>
        <ul>
          {guessedPokemon.map((pokemon, index) => (
            <li key={index}>{pokemon}</li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        className="bg-blue-700 hover:bg-blue-800 text-white font-bold p-2 rounded mt-4"
        onClick={handleNewGame}
      >
        New Game
      </button>
    </div>
  );
};

export default RandomPokemon;
