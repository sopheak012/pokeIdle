import PokemonData from "../data/gen1.json";
import Random from "random";

const RandomPokemon = () => {
  // Generate a random index within the range of the PokemonData array
  const randomIndex = Random.int(0, PokemonData.length - 1);
  // Select the random Pokemon using the generated index
  const randomPokemon = PokemonData[randomIndex];

  return (
    <div className="max-w-md mx-auto pt-64 text-center">
      <h1 className="text-2xl font-bold mb-4">Random Pokemon</h1>
      <div>
        <h2 className="text-xl mb-2">{randomPokemon.name}</h2>
        <p>Type: {randomPokemon.type.join(", ")}</p>
        <p>Habitat: {randomPokemon.habitat}</p>
        <p>Evolution Stage: {randomPokemon.evolutionStage}</p>
        <p>Height: {randomPokemon.height} m</p>
        <p>Weight: {randomPokemon.weight} kg</p>
      </div>
    </div>
  );
};

export default RandomPokemon;
