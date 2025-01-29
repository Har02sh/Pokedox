import { useEffect, useState } from "react";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
import Loader from "../Loader/Loader"

function PokemonList(){

    const [isLoading, setIsLoading] = useState(true);
    const [pokemonList, setPokemonList] = useState([]);
    const [pokedexUrl,setPokeDexUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
    const [prevUrl,setPrevUrl] = useState('');
    const [nextUrl,setNextUrl] = useState('');

    async function getPokemons(){
        const response = await fetch(pokedexUrl);
        const data = await response.json();
        const pokemonUrls = data.results.map(pokemon => fetch(pokemon.url));
        setPrevUrl(data.previous);
        setNextUrl(data.next);

        const urlResult = await Promise.all(pokemonUrls);
        const pokemonDataResponse = await Promise.all(urlResult.map(urlResponse => urlResponse.json()));
        
        const pokemonData = pokemonDataResponse.map(pokeData => {
            return {
                id: pokeData.id,
                name: pokeData.name,
                image: pokeData.sprites.other.dream_world.front_default,
                types: pokeData.types
            }
        })
        setPokemonList(pokemonData);
        setIsLoading(false);
    }

    useEffect(()=>{
        getPokemons();
    }, [pokedexUrl])

    return(
        <>
            <h4>Pokemon List</h4>
            <div className="pokemon-wrapper-div">
            { isLoading ? <Loader/> : 
              pokemonList.map(poke => <Pokemon name={poke.name} image={poke.image}  key={poke.id} />)
            }
            </div>
            <div className="buttons">
                <button disabled={!prevUrl} onClick={()=> {setPokeDexUrl(prevUrl); setIsLoading(true)}}>Prev</button>
                <button disabled={!nextUrl} onClick={() => {setPokeDexUrl(nextUrl); setIsLoading(true)}}>Next</button>
            </div>
        </>
        
    )
}

export default PokemonList;