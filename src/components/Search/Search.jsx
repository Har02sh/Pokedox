import "./Search.css"

function Search(){
    return (
        <div className="header">
            <h1>PokeDex</h1>
            <input
            type="text"
            placeholder="Enter Pokemon Name.."
            id="search"
            />
        </div>
    )
}

export default Search;