import React from 'react';
import { Link } from 'react-router-dom';
import MovieBox from './MovieBox';
import '../styles/MoviesList.css';


function MoviesList({ moviesList }) {
  return (
    <div className="MoviesList__container">
      {moviesList.map(movie => (
        <Link className="MoviesList__link" to={`/movie/${movie.id}`}>
          <MovieBox 
            key={movie.id} 
            original_title={movie.original_title} 
            poster_path={movie.poster_path} 
          />
        </Link>
      ))}
    </div>
  )
}

export default MoviesList;
