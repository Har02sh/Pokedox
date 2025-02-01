import "./Search.css";

function Search({ showInput = true }) {
  return (
    <div className="header">
      {showInput && (
        <input type="text" placeholder="Enter Pokemon Name.." id="search" />
      )}
    </div>
  );
}

export default Search;
