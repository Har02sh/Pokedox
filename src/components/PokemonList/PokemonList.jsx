import { useEffect, useState } from "react";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
import Loader from "../Loader/Loader"

function PokemonList(){

    const [pokemonListState, setPokemonListState] = useState({
        isLoading: true,
        pokemonList: [],
        prevUrl: '',
        nextUrl: ''
    })
    const [pokedexUrl, setPokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon/");

    async function getPokemons(){
        
        const response = await fetch(pokedexUrl);
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

        setPokemonListState((prevState)=>({
            ...prevState,
            nextUrl: data.next,
            prevUrl: data.previous,
            pokemonList: pokemonData,
            isLoading: false
        }))
    }

    useEffect(()=>{
        getPokemons();
    }, [pokedexUrl])

    return(
        <>
            <div className="pokemon-wrapper-div">
            { pokemonListState.isLoading ? <Loader/> : 
              pokemonListState.pokemonList.map(poke => <Pokemon name={poke.name} image={poke.image}  key={poke.id} id={poke.id} />)
            }
            </div>
            <div className="buttons">
                <button disabled={!pokemonListState.prevUrl} 
                onClick={()=>{
                    setPokemonListState((prevState) => ({...prevState, isLoading:true}));
                    setPokedexUrl(pokemonListState.prevUrl);
                }}>Prev</button>
                <button disabled={!pokemonListState.nextUrl} 
                onClick={()=>{
                    setPokemonListState((prevState) => ({...prevState, isLoading:true}));
                    setPokedexUrl(pokemonListState.nextUrl);
                }}>Next</button>
            </div>
        </>
        
    )
}

export default PokemonList;