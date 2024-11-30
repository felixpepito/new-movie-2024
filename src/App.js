import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";
import "./App.css";

const API_URL_MOVIES =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const API_URL_TV =
  "https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const API_URL_2024_MOVIES =
  "https://api.themoviedb.org/3/discover/movie?primary_release_year=2024&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const SEARCH_API_MOVIES =
  "https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=";
const SEARCH_API_TV =
  "https://api.themoviedb.org/3/search/tv?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("movies");

  // Function to fetch items based on category
  const getItems = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    const searchUrl =
      category === "movies"
        ? SEARCH_API_MOVIES + searchTerm
        : SEARCH_API_TV + searchTerm;
    getItems(searchUrl);
    setSearchTerm("");
  };

  // Handle category change
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    let url = "";
    switch (newCategory) {
      case "movies":
        url = API_URL_MOVIES;
        break;
      case "tv":
        url = API_URL_TV;
        break;
      case "2024movies":
        url = API_URL_2024_MOVIES;
        break;
      default:
        url = API_URL_MOVIES;
    }
    getItems(url);
  };

  // Set the correct category URL on initial load
  useEffect(() => {
    let url = "";
    switch (category) {
      case "movies":
        url = API_URL_MOVIES;
        break;
      case "tv":
        url = API_URL_TV;
        break;
      case "2024movies":
        url = API_URL_2024_MOVIES;
        break;
      default:
        url = API_URL_MOVIES;
    }
    getItems(url);
  }, [category]);

  return (
    <div className="app">
      <Header category={category} handleCategoryChange={handleCategoryChange} />
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        category={category}
      />
      <main id="main">
        {movies.length > 0 ? (
          movies.map((item) => (
            <MovieCard key={item.id} item={item} category={category} />
          ))
        ) : (
          <p>
            No{" "}
            {category === "movies"
              ? "movies"
              : category === "tv"
              ? "TV shows"
              : "2024 movies"}{" "}
            found
          </p>
        )}
      </main>
    </div>
  );
}

export default App;
