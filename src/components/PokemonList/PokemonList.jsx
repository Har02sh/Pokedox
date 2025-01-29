import { useEffect, useState } from "react";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList(){

    const [isLoading, setIsLoading] = useState(true);
    const [pokemonList, setPokemonList] = useState([]);

    async function getPokemons(){
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
        const data = await response.json();
        const pokemonUrls = data.results.map(pokemon => fetch(pokemon.url));
        
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
    }, [])

    return(
        <>
            <h4>Pokemon List</h4>
            <div className="pokemon-wrapper-div">
            { isLoading ? "Data Downloading..." : 
              pokemonList.map(poke => <Pokemon name={poke.name} image={poke.image}  key={poke.id} />)
            }
            </div>
            <div className="buttons">
                <button id="prev">Prev</button>
                <button id="next">Next</button>
            </div>
        </>
        
    )
}

export default PokemonList;