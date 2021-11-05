import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Components
import Header from '../Components/Header';
import ActorBox from '../Components/ActorBox';
import Spinner from '../Components/Spinner';

import { IMAGE_BASE_URL } from '../config';

import '../styles/MovieDetails.css';

// API
import apiHandler from '../api';

function MovieDetails(props) {
  const movieId = props.match.params.id;

  const [loading, setLoading] = useState(false);

  const [movie, setMovie] = useState({});
  useEffect(() => {
    setLoading(true);

    apiHandler.getOneMovie(movieId)
      .then(response => {
        setLoading(false);
        setMovie(response);
      });
  }, []);

  const [cast, setCast] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [writers, setWriters] = useState([]);
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    setLoading(true);

    apiHandler.getMovieCredits(movieId)
      .then(response => {
        setLoading(false);
        setCast(response.cast);
        setDirectors(response.crew.filter(member => member.job === "Director"));
        setWriters(response.crew.filter(member => member.department === "Writing"));
        setAuthor(response.crew.filter(member => member.job === "Novel"));
      });
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <Header />

      {movie &&
        <div className="container">

          <section className="details-page-first-section">
            <img 
              src={`${IMAGE_BASE_URL}${movie.poster_path}`} 
              alt={movie.title} 
              className="details-img"
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
              {movie.genres && 
                <p>
                  <b>Genre{movie.genres.length === 1 ? "" : "s"}: </b>  
                    {movie.genres.map(genre => 
                      <span>{genre.name} </span>
                    )}
                </p>
              }
              
              <p className="MovieDetails__overview">{movie.overview}</p>
              {directors &&
                <div>
                  <h3>Crew</h3>
                  <p>
                    Directing:
                      {directors.map(member => (
                        <span key={member.id}>
                          <Link exact to={`/person/${member.id}`}>
                          {member.name}
                          </Link>
                        </span>
                      ))}
                  </p>
                  <p>
                    Writing:
                      {writers.map(member => (
                        <span key={member.id}>
                          <Link exact to={`/person/${member.id}`}>
                          {member.name} ({member.job})
                          </Link>
                        </span>
                      ))}
                  </p>
                  {author.length > 0 && 
                    <p>
                      Based on a book by:
                      {author.map(member => (
                        <span key={member.id}>
                          <Link exact to={`/person/${member.id}`}>
                          {member.name}
                          </Link>
                        </span>
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
                    key={castMember.id}
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
