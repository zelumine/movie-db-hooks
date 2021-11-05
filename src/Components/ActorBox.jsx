import React from 'react';
import { Link } from 'react-router-dom';

import { IMAGE_BASE_URL } from '../config';
import NoImage from '../images/no-image.svg';

import '../styles/ActorBox.css';

function ActorBox({ profile_path, name, character, actorId }) {
  return (
    <div className="ActorBox">
      {
         profile_path ?
        <img 
          className="ActorBox__img" 
          src={`${IMAGE_BASE_URL}${profile_path}`} 
          alt={name} 
        />
        :
        <img 
          className="ActorBox__img" 
          src={NoImage} 
          alt={name} 
        />
      }
      <Link to={`/person/${actorId}`}>
        <p className="ActorBox__name">{name}</p>
      </Link>
      <p className="ActorBox__character">as {character}</p>
    </div>
  )
}

export default ActorBox;