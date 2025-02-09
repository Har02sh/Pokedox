import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetails.css";
import usePokemonList from "../../hooks/usePokemonList";
import Loader from "../Loader/Loader";

function PokemonDetails({pokemonName}) {
  let response;
  const { id } = useParams();
  const [pokeDetail, setPokeDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  async function getPokemon() {
    try {
      if(pokemonName){
        response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      }else{
        response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      }
      const data = await response.json();
      const responseTypes = await fetch(
        `https://pokeapi.co/api/v2/type/${data.types[0].type.name}/`
      );
      const dataTypes = await responseTypes.json();

      setPokeDetail({
        name: data.name,
        image: data.sprites.other.dream_world.front_default,
        height: data.height,
        weight: data.weight,
        types: data.types.map((t) => t.type.name),
        relatedPokemons: dataTypes.pokemon.slice(0, 5),
      });
    } catch (error) {
      console.log("Something went wrong: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setPokeDetail({}); // Reset state before fetching new data
    getPokemon();
  }, [id]);
  return isLoading ? (
    <div className="LoaderDiv">
      <Loader />
    </div>
  ) : (
    <div className="pokemon-detail-wrapper">
      <img src={pokeDetail.image} alt={pokeDetail.name} />
      <div className="pokemon-detail-name">{pokeDetail.name}</div>
      <div className="pokemon-detail-height">Height: {pokeDetail.height}</div>
      <div className="pokemon-detail-weight">Weight: {pokeDetail.weight}</div>
      <div className="pokemon-detail-types">
        {pokeDetail.types &&
          pokeDetail.types.map((type, idx) => <div key={idx}>{type}</div>)}
      </div>
      {pokeDetail.relatedPokemons && (
        <div className="relatedPokemons">
          <h3>More {pokeDetail.types && pokeDetail.types[0]} pokemons: </h3>
          <ul>
            {pokeDetail.relatedPokemons.map((ele) => (
              <li key={ele.pokemon.name}>{ele.pokemon.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PokemonDetails;
