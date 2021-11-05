import React from 'react';
import '../styles/SearchBar.css';

function SearchBar({ searchTerm, handleSearch }) {
  return (
    <div className="SearchBar">
      <i className="fa-solid fa-magnifying-glass SearchBar__icon"></i>
      <input 
        type="text" 
        placeholder="Search a movie" 
        className="SearchBar__input" 
        value={searchTerm}
        onChange={(event) => handleSearch(event.target.value)}
      />
    </div>
  )
}

export default SearchBar;
