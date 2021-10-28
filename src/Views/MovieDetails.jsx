import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import ActorBox from '../Components/ActorBox';
import { IMAGE_BASE_URL } from '../config';

import '../styles/MovieDetails.css';

// API
import apiHandler from '../api';

function MovieDetails(props) {
  const movieId = props.match.params.id;

  const [movie, setMovie] = useState({});
  useEffect(() => {
    apiHandler.getOneMovie(movieId)
      .then(response => setMovie(response));
  }, []);

  const [cast, setCast] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [writers, setWriters] = useState([]);
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    apiHandler.getMovieCredits(movieId)
      .then(response => {
        setCast(response.cast);
        setDirectors(response.crew.filter(member => member.job === "Director"));
        setWriters(response.crew.filter(member => member.department === "Writing"));
        setAuthor(response.crew.filter(member => member.job === "Novel"));
        console.log("author:", author);
      });
  }, []);

  return (
    <div>
      <Header />

      {movie &&
        <div className="MovieDetails__container">

          <section className="MovieDetails__first-section">
            <img 
              src={`${IMAGE_BASE_URL}${movie.poster_path}`} 
              alt={movie.title} 
              className="MovieDetails__poster-img"
            />
            <div>
              <h2 className="MovieDetails__movie-title">{movie.title}</h2>
              <p>
                Original title: <em>{movie.original_title}</em>
                <span> | </span>
                <span>Released: {movie.release_date}</span>
                <span> | </span>
                <span>Rating: {movie.vote_average} / 10</span>
              </p>
              <p className="MovieDetails__overview">{movie.overview}</p>
              {directors &&
                <div>
                  <h3>Crew</h3>
                  <p>
                    Directing:
                      {directors.map(member => (
                        <span>{member.name}</span>
                      ))}
                  </p>
                  <p>
                    Writing:
                      {writers.map(member => (
                        <span>{member.name} ({member.job})</span>
                      ))}
                  </p>
                  {author.length > 0 && 
                    <p>
                      Based on a book by:
                      {author.map(member => (
                        <span>{member.name}</span>
                      ))}
                    </p>
                  }
                </div>
              }
            </div>
          </section>

          {cast &&
            <section>
              <h3>Casting</h3>
              <div className="MovieDetails__actors-list">
                {cast.map(castMember => (
                  <ActorBox 
                    name={castMember.name} 
                    character={castMember.character}
                    profile_path={castMember.profile_path}
                    actorId={castMember.id}
                  />
                ))}
              </div>
            </section>
          }
        </div>
      }
      {!movie &&
        <p>Loading...</p>
      }
    </div>
  )
}

export default MovieDetails;
