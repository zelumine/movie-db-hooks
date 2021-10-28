import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar';
import MoviesList from '../Components/MoviesList';

// API
import apiHandler from '../api';


function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [moviesList, setMoviesList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    apiHandler.getMovies(page)
      .then(response => setMoviesList(response.results));
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  }

  useEffect(() => {
    apiHandler.searchMovie(searchTerm)
      .then(response => setSearchResults(response.results));
  }, [searchTerm]);

  return (
    <div>
      <Header />
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      {!searchResults ? 
        <h1>Popular movies</h1>
        :
        <h1>Results for "{searchTerm}"</h1>
      }

      {searchResults ?
        <MoviesList moviesList={searchResults} />
        :
        <MoviesList moviesList={moviesList} />
      }
    </div>
  )
}

export default Home;
