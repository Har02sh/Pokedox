import useDebounce from "../../hooks/useDebounce";
import "./Search.css";

function Search({updateInput}) {
  const debounceSearch = useDebounce((e)=>updateInput(e.target.value))
  return (
    <div className="header">
        <input 
        type="text" 
        placeholder="Enter Pokemon Name.." 
        id="search" 
        onChange={debounceSearch}
        />
      
    </div>
  );
}

export default Search;
