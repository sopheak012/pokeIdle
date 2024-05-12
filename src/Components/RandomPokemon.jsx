import { useSelector } from "react-redux";

const RandomPokemon = () => {
  // Retrieve the randomly selected Pokemon from the Redux state
  const randomPokemon = useSelector((state) => state.pokemon.randomPokemon);
  // Retrieve the guessed Pokemon from the Redux state
  const guessedPokemon = useSelector((state) => state.pokemon.guessedPokemon);

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
    </div>
  );
};

export default RandomPokemon;
