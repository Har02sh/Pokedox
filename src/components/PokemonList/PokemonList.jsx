import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
import Loader from "../Loader/Loader"
import usePokemonList from "../../hooks/usePokemonList";

function PokemonList(){

    const [pokemonListState,setPokemonListState,setPokedexUrl] = usePokemonList("https://pokeapi.co/api/v2/pokemon/");

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