import PokemonDetails from '../PokemonDetails/PokemonDetails';
import PokemonList from '../PokemonList/PokemonList'
import Search from '../Search/Search';
import { useState } from "react";

function Pokedex(){
    const [searchTerm, setSearchTerm] = useState('');

    return(
        <>
            <Search updateInput = {setSearchTerm} />
            {(searchTerm.length==0)? (<PokemonList/>) : <PokemonDetails key={searchTerm} pokemonName={searchTerm} />}
        </>
    )
}

export default Pokedex;



// QUESTIONS:
// If change in useState rerenders the component then what is the need of useEffect.
// What is key?