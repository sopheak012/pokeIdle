import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addGuessedPokemon,
  setGameWon,
  resetGame,
  setRandomPokemon, // Import setRandomPokemon action creator
} from "../Redux/Slices/pokemonSlice";
import PokemonData from "../data/gen1.json";
import Random from "random"; // Import Random module for generating random numbers

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [invalidInput, setInvalidInput] = useState(false);
  const searchBarRef = useRef(null);
  const dispatch = useDispatch();
  const guessedPokemon = useSelector((state) => state.pokemon.guessedPokemon);
  const randomPokemonName = useSelector((state) => state.pokemon.randomPokemon); // Get the random Pokémon name from the Redux state

  useEffect(() => {
    // Generate a random Pokémon if it hasn't been set yet
    if (!randomPokemonName) {
      generateRandomPokemon();
    }
  }, [randomPokemonName]); // Run this effect when the randomPokemonName changes

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const filteredSuggestions = PokemonData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).filter(
      (pokemon) =>
        !guessedPokemon.some(
          (guess) => guess.toLowerCase() === pokemon.name.toLowerCase()
        )
    );

    setSuggestions(filteredSuggestions);
  }, [searchTerm, guessedPokemon]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    setInvalidInput(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    setSuggestions([]);
  };

  const handleGuess = (event) => {
    event.preventDefault();
    if (searchTerm) {
      const isValidPokemon = PokemonData.some(
        (pokemon) => pokemon.name.toLowerCase() === searchTerm.toLowerCase()
      );

      const isAlreadyGuessed = guessedPokemon.some(
        (guessed) => guessed.toLowerCase() === searchTerm.toLowerCase()
      );

      if (isValidPokemon && !isAlreadyGuessed) {
        dispatch(addGuessedPokemon(searchTerm));
        setSearchTerm("");

        // Check if all Pokémon have been guessed
        const allPokemonGuessed = PokemonData.every((pokemon) =>
          guessedPokemon.includes(pokemon.name)
        );

        if (allPokemonGuessed) {
          dispatch(setGameWon(true));
        }
      } else if (isAlreadyGuessed) {
        setInvalidInput(true);
        setSearchTerm("");
      } else {
        setInvalidInput(true);
        setSearchTerm("");
      }
    }
  };

  const handleNewGame = () => {
    dispatch(resetGame());
  };

  const generateRandomPokemon = () => {
    // Generate a random Pokémon
    const randomIndex = Random.int(0, PokemonData.length - 1);
    const randomPokemon = PokemonData[randomIndex].name;
    dispatch(setRandomPokemon(randomPokemon)); // Dispatch action to store the random Pokémon in the Redux state
  };

  return (
    <div className="max-w-md mx-auto pt-64 flex">
      <form className="relative flex-grow" onSubmit={handleGuess}>
        {invalidInput && (
          <p className="text-red-500 mb-2 text-sm text-center">
            Invalid Pokémon name
          </p>
        )}
        <label
          htmlFor="default-guess"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Guess
        </label>
        <div ref={searchBarRef} className="relative">
          <input
            type="text"
            id="default-guess"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Guess a Pokemon"
            value={searchTerm}
            onChange={handleChange}
          />
          {suggestions.length > 0 && searchTerm !== "" && (
            <div className="absolute z-10 w-full mt-1 max-h-48 overflow-y-auto bg-white rounded-lg border border-gray-300 shadow-md">
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <img
                      src={suggestion.image}
                      alt={suggestion.name}
                      className="w-8 h-8 mr-2"
                    />
                    {suggestion.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Guess
          </button>
        </div>
      </form>
      <button
        type="button"
        className="bg-blue-700 hover:bg-blue-800 text-white font-bold p-2 rounded ml-4 m-2"
        onClick={handleNewGame}
      >
        New Game
      </button>
    </div>
  );
};

export default SearchBar;
