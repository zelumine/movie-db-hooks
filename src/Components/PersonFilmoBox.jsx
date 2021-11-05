import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/PersonFilmoBox.css';
import NoImage from '../images/no-image.svg';

import { IMAGE_BASE_URL } from '../config';

function PersonFilmoBox(props) {
  const {
    id,
    poster_path,
    original_title,
    original_name,
    release_date,
    job,
    department,
    media_type,
    character,
    episode_count
  } = props;

  return (
    <div>
      <Link exact to={`/movie/${id}`}>
        <img 
          src={poster_path ? `${IMAGE_BASE_URL}${poster_path}` : NoImage} 
          alt={original_name || original_title} 
          className="PersonFilmoBox__img"
        />
      </Link>
      <Link exact to={`/movie/${id}`}>
        {original_title || original_name}
      </Link>
      {release_date && ` (${release_date.slice(0, 4)})`}
      {!release_date && ` (No date)`}
      {job && `: ${job}`}
      {!department && media_type === "tv" &&
        <span>
          {character !== "" ? `: as ${character}` : " as Self"}
        </span>
      }
      {media_type === "movie" && 
        <span>
          {character ? `: as ${character}` : ""}
        </span>
      }
      {episode_count &&
        ` (${episode_count} ${episode_count === 1 ? "episode" : "episodes"})`
      }
    </div>
  )
}

export default PersonFilmoBox;
