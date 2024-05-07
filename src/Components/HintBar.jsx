import { useSelector } from "react-redux";
import PokemonData from "../data/gen1.json";

const HintBar = () => {
  // Retrieve guessed Pokémon names from Redux store
  const guessedPokemonNames = useSelector(
    (state) => state.pokemon.guessedPokemon
  );

  // Retrieve random Pokémon name from Redux store
  const randomPokemonName = useSelector((state) => state.pokemon.randomPokemon);

  // Find random Pokémon data from PokemonData
  const randomPokemon = PokemonData.find(
    (pokemon) => pokemon.name === randomPokemonName
  );

  // Function to compare attributes and determine color
  const compareAttributes = (guessedValue, randomValue) => {
    return guessedValue === randomValue ? "bg-green-300" : "bg-red-300";
  };

  // Get guessed Pokémon data and reverse the order to display the latest on top
  const guessedPokemonData = guessedPokemonNames
    .map((guessedPokemonName) =>
      PokemonData.find((pokemon) => pokemon.name === guessedPokemonName)
    )
    .reverse();

  return (
    <div className="mt-4 p-4 bg-white border border-gray-300 rounded-lg shadow-md">
      <div
        className="grid grid-cols-7 gap-4 mb-2"
        style={{ width: "100%", height: "auto", gridAutoRows: "60px" }}
      >
        <div className="font-semibold flex items-center justify-center border-b-4 border-black">
          Pokemon
        </div>
        <div className="font-semibold flex items-center justify-center border-b-4 border-black">
          Type 1
        </div>
        <div className="font-semibold flex items-center justify-center border-b-4 border-black">
          Type 2
        </div>
        <div className="font-semibold flex items-center justify-center border-b-4 border-black">
          Habitat
        </div>
        <div className="font-semibold flex items-center justify-center border-b-4 border-black">
          Evolution Stage
        </div>
        <div className="font-semibold flex items-center justify-center border-b-4 border-black">
          Height
        </div>
        <div className="font-semibold flex items-center justify-center border-b-4 border-black">
          Weight
        </div>
      </div>

      {guessedPokemonData.map((guessedPokemon, index) => (
        <div
          key={index}
          className="grid grid-cols-7 gap-4 mb-2"
          style={{ width: "100%", height: "auto", gridAutoRows: "100px" }}
        >
          <div
            className={`flex items-center justify-center border-4 border-black ${compareAttributes(
              guessedPokemon.name,
              randomPokemon.name
            )}`}
          >
            <img src={guessedPokemon.image} alt={guessedPokemon.name} />
          </div>

          <div
            className={`flex items-center justify-center border-4 border-black ${
              guessedPokemon.type[0] === "None"
                ? "bg-green-300"
                : compareAttributes(
                    guessedPokemon.type[0],
                    randomPokemon.type[0]
                  )
            }`}
          >
            {guessedPokemon.type[0]}
          </div>
          <div
            className={`flex items-center justify-center border-4 border-black ${
              guessedPokemon.type.length > 1
                ? compareAttributes(
                    guessedPokemon.type[1],
                    randomPokemon.type[1]
                  )
                : "bg-green-300"
            }`}
          >
            {guessedPokemon.type.length > 1 ? guessedPokemon.type[1] : "None"}
          </div>
          <div
            className={`flex items-center justify-center border-4 border-black ${compareAttributes(
              guessedPokemon.habitat,
              randomPokemon.habitat
            )}`}
          >
            {guessedPokemon.habitat}
          </div>
          <div
            className={`flex items-center justify-center border-4 border-black ${compareAttributes(
              guessedPokemon.evolutionStage,
              randomPokemon.evolutionStage
            )}`}
          >
            {guessedPokemon.evolutionStage}
          </div>
          <div
            className={`flex items-center justify-center border-4 border-black ${compareAttributes(
              guessedPokemon.height,
              randomPokemon.height
            )}`}
          >
            {guessedPokemon.height}
          </div>
          <div
            className={`flex items-center justify-center border-4 border-black ${compareAttributes(
              guessedPokemon.weight,
              randomPokemon.weight
            )}`}
          >
            {guessedPokemon.weight}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HintBar;
