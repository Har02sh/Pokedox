import "./Pokemon.css";

function Pokemon({name,image}){
    return(
        <div className="PokeData"> 
            <h2>{name}</h2>
            <img src={image} />
        </div>
    )
}

export default Pokemon;