import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import "./PokemonDetails.css";

function PokemonDetails(){
    const {id}  = useParams()
    const [pokeDetail, setPokeDetail] = useState({});
    async function getPokemon(){
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await response.json();
        
        setPokeDetail({
            name: data.name,
            image: data.sprites.other.dream_world.front_default,
            height: data.height,
            weight: data.weight,
            types: data.types.map((t) => t.type.name)
        })
    }

    useEffect(()=>{
        getPokemon();
    },[])

    return (
        <div className='pokemon-detail-wrapper'>
            <img src={pokeDetail.image} alt={pokeDetail.name} />
            <div className='pokemon-detail-name' >{pokeDetail.name}</div>
            <div className="pokemon-detail-height">Height: {pokeDetail.height}</div>
            <div className="pokemon-detail-weight">Weight: {pokeDetail.weight}</div>
            <div className="pokemon-detail-types">
                {
                    pokeDetail.types && pokeDetail.types.map((type,idx)=>(
                        <div key={idx}>{type}</div>
                    ))
                }
            </div>
        </div>
    )
}

export default PokemonDetails;