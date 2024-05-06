import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addGuessedPokemon } from "../Redux/Slices/pokemonSlice";
import PokemonData from "../data/gen1.json";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [invalidInput, setInvalidInput] = useState(false); // State for invalid input
  const searchBarRef = useRef(null);
  const dispatch = useDispatch();

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

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    // Filter suggestions based on the current search term
    const filteredSuggestions = PokemonData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(value.toLowerCase())
    );

    // Remove duplicates from suggestions
    const uniqueSuggestions = filteredSuggestions.filter(
      (pokemon, index) =>
        filteredSuggestions.findIndex((p) => p.name === pokemon.name) === index
    );

    setSuggestions(uniqueSuggestions);

    // Reset invalid input state when user types
    setInvalidInput(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    setSuggestions([]);
  };

  const handleGuess = (event) => {
    event.preventDefault();
    if (searchTerm) {
      // Check if the entered value matches any Pokémon name
      const isValidPokemon = PokemonData.some(
        (pokemon) => pokemon.name.toLowerCase() === searchTerm.toLowerCase()
      );

      if (isValidPokemon) {
        dispatch(addGuessedPokemon(searchTerm));
        setSearchTerm("");
      } else {
        // Display an error message or handle invalid input
        setInvalidInput(true); // Set invalid input state to true
        setSearchTerm(""); // Clear search term
      }
    }
  };

  return (
    <form className="max-w-md mx-auto pt-64" onSubmit={handleGuess}>
      {invalidInput && ( // Conditional rendering for invalid input message
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
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="default-guess"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Guess a Pokemon"
          value={searchTerm}
          onChange={handleChange}
        />
        {suggestions.length > 0 && (
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
  );
};

export default SearchBar;