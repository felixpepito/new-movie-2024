import React from "react";

const Header = ({ category, handleCategoryChange }) => {
  return (
    <header>
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>
            {category === "movies"
              ? "Movie App"
              : category === "tv"
              ? "TV Shows App"
              : "2024 Movies"}
          </h1>
        </div>
        <div className="navbar-links">
          <button
            className={category === "movies" ? "active" : ""}
            onClick={() => handleCategoryChange("movies")}
          >
            Movies
          </button>
          <button
            className={category === "tv" ? "active" : ""}
            onClick={() => handleCategoryChange("tv")}
          >
            TV Shows
          </button>
          <button
            className={category === "2024movies" ? "active" : ""}
            onClick={() => handleCategoryChange("2024movies")}
          >
            2024 Movies
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
