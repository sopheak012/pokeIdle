import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PokemonData from "../data/gen1.json";
import ConfettiExplosion from "react-confetti-explosion";

const HintBar = () => {
  const guessedPokemonNames = useSelector(
    (state) => state.pokemon.guessedPokemon
  );
  const randomPokemonName = useSelector((state) => state.pokemon.randomPokemon);
  const randomPokemon = PokemonData.find(
    (pokemon) => pokemon.name === randomPokemonName
  );

  const compareAttributes = (guessedValue, randomValue) => {
    console.log(`Guessed Value: ${guessedValue}`);
    console.log(`Random Value: ${randomValue}`);
    return guessedValue === randomValue ? "bg-green-300" : "bg-red-300";
  };

  const compareType = (guessedType) => {
    const typeSet = new Set(randomPokemon.type);
    if (typeSet.has(guessedType)) {
      return "bg-green-300";
    } else if (typeSet.size === 1 && guessedType === "None") {
      return "bg-green-300";
    } else if (guessedType === "None" && typeSet.size > 1) {
      return "bg-red-300";
    } else {
      return "bg-red-300";
    }
  };

  const guessedPokemonData = guessedPokemonNames
    .map((guessedPokemonName) =>
      PokemonData.find((pokemon) => pokemon.name === guessedPokemonName)
    )
    .reverse();

  const [isCorrectGuess, setIsCorrectGuess] = useState(false);

  useEffect(() => {
    if (randomPokemon && guessedPokemonNames.includes(randomPokemon.name)) {
      setIsCorrectGuess(true);
    } else {
      setIsCorrectGuess(false);
    }
  }, [randomPokemon, guessedPokemonNames]);

  return (
    <div
      className="mx-auto mt-4 p-4 bg-white border border-gray-300 rounded-lg shadow-md"
      style={{ minWidth: "800px", maxWidth: "800px" }}
    >
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
      {isCorrectGuess && (
        <div className="fixed inset-0 flex items-center justify-center">
          <ConfettiExplosion />
        </div>
      )}

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
            className={`flex items-center justify-center border-4 border-black ${compareType(
              guessedPokemon.type[0]
            )}`}
          >
            {guessedPokemon.type[0]}
          </div>
          <div
            className={`flex items-center justify-center border-4 border-black ${
              guessedPokemon.type.length > 1
                ? compareType(guessedPokemon.type[1])
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
            {`${guessedPokemon.height}cm`}
          </div>
          <div
            className={`flex items-center justify-center border-4 border-black ${compareAttributes(
              guessedPokemon.weight,
              randomPokemon.weight
            )}`}
          >
            {`${guessedPokemon.weight}kg`}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HintBar;
