import { useEffect, useState } from "react";

function usePokemonList(url, type = false) {
  if (!url) return [];
  const [pokemonListState, setPokemonListState] = useState({
    isLoading: true,
    pokemonList: [],
    prevUrl: "",
    nextUrl: "",
  });
  const [pokedexUrl, setPokedexUrl] = useState(url);

  async function getPokemons() {
    const response = await fetch(pokedexUrl);
    const data = await response.json();

    const pokemonUrls = data.results.map((pokemon) => fetch(pokemon.url));

    const urlResult = await Promise.all(pokemonUrls);
    const pokemonDataResponse = await Promise.all(
      urlResult.map((urlResponse) => urlResponse.json())
    );

    const pokemonData = pokemonDataResponse.map((pokeData) => {
      return {
        id: pokeData.id,
        name: pokeData.name,
        image: pokeData.sprites.other.dream_world.front_default,
        types: pokeData.types,
      };
    });

    setPokemonListState((prevState) => ({
      ...prevState,
      nextUrl: data.next,
      prevUrl: data.previous,
      pokemonList: pokemonData,
      isLoading: false,
    }));
  }
  useEffect(() => {
    getPokemons();
  }, [pokedexUrl, type]);

  return [pokemonListState, setPokemonListState, setPokedexUrl];
}

export default usePokemonList;

// Custom Hook. Nothing just a utility function.This can be used for segregating business logic from the UI logic
