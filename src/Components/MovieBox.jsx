import React from 'react';
import { IMAGE_BASE_URL } from '../config';
import NoImage from '../images/no-image.svg';
import '../styles/MovieBox.css';

function MovieBox({ poster_path, original_title }) {
  return (
    <div className="MovieBox">
      {
        poster_path ?
        <img 
          className="MovieBox__img" 
          src={`${IMAGE_BASE_URL}${poster_path}`} 
          alt={original_title} 
        />
        :
        <img 
          className="MovieBox__img" 
          src={NoImage} 
          alt={original_title} 
        />
      }
      <p className="MovieBox__title">{original_title}</p>
    </div>
  )
}

export default MovieBox;
