import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addGuessedPokemon,
  setGameWon,
  resetGame,
  setRandomPokemon,
} from "../Redux/Slices/pokemonSlice";
import PokemonData from "../data/gen1.json";
import Random from "random";
import logo from "../Image/PokeIdleLogo.png";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [invalidInput, setInvalidInput] = useState(false);
  const searchBarRef = useRef(null);
  const dispatch = useDispatch();
  const guessedPokemon = useSelector((state) => state.pokemon.guessedPokemon);
  const randomPokemonName = useSelector((state) => state.pokemon.randomPokemon);
  const isGameWon = useSelector((state) => state.pokemon.isGameWon);

  useEffect(() => {
    if (!randomPokemonName) {
      generateRandomPokemon();
    }
  }, [randomPokemonName]);

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

        const allPokemonGuessed = PokemonData.every((pokemon) =>
          guessedPokemon.includes(pokemon.name)
        );

        if (allPokemonGuessed) {
          dispatch(setGameWon(true));
        }
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
    const randomIndex = Random.int(0, PokemonData.length - 1);
    const randomPokemon = PokemonData[randomIndex].name;
    dispatch(setRandomPokemon(randomPokemon));
  };

  return (
    <div className="max-w-md mx-auto pt-16">
      <img src={logo} alt="Logo" className="mb-8" />
      <div className="flex flex-col items-center sm:flex-row sm:justify-between">
        <form className="relative flex-grow flex" onSubmit={handleGuess}>
          <div ref={searchBarRef} className="relative flex-grow">
            {invalidInput && (
              <p className="text-red-500 mb-2 text-sm">Invalid Pokémon name</p>
            )}
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
              disabled={isGameWon}
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
    </div>
  );
};

export default SearchBar;
