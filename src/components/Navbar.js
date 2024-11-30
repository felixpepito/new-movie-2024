import React from "react";

const Navbar = ({ searchTerm, setSearchTerm, handleSearch, category }) => {
  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder={`Search for ${
          category === "movies" ? "a movie" : "a TV show"
        }...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Navbar;
