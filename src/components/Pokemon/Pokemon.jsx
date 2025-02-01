import { Link } from "react-router-dom";
import "./Pokemon.css";

function Pokemon({name,image,id}){
    return(
        <Link to={`pokemon/${id}`} className="PokeData">
            <div className="PokeData"> 
                <h2>{name}</h2>
                <img src={image} />
            </div>
        </Link>
    )
}

export default Pokemon;