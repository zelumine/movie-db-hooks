import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Spinner from '../Components/Spinner';
import PersonFilmoBox from '../Components/PersonFilmoBox';

// API
import apiHandler from '../api';

import NoImage from '../images/no-image.svg';
import { IMAGE_BASE_URL } from '../config';

// CSS
import '../styles/PersonDetails.css';

/* TO DO NEXT: ranger les films dans l'ordre chronologique
*              faire une view pour les TV shows vu que je suis lancée...
*/

const PersonDetails = (props) => {
  const personId = Number(props.match.params.personId);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [person, setPerson] = useState({});

  useEffect(() => {
    setLoading(true);

    apiHandler.getPerson(personId)
      .then(response => {
        setLoading(false);
        setPerson(response);
      })
      .catch(err => {
        setLoading(false);
        setError(true);
      });
  }, []);

  const [credits, setCredits] = useState({});
  
  useEffect(() => {
    setLoading(true); 

    apiHandler.getPersonsCredits(personId)
      .then(response => {
        setLoading(false);
        setCredits(response);
        // console.log("credits:", credits);
      })
      .catch(err => {
        setLoading(false);
        setError(true);
      });
  }, []);

  if (loading) return <Spinner />

  if (error) {
    console.log(error);
    return <div>Something went wrong!</div>;
  }

  return (
    <div>
      <Header />
      {person && 
        <div className="container">
          <section className="details-page-first-section">
            {person.profile_path ?
              <img
                className="details-img"
                src={`${IMAGE_BASE_URL}${person.profile_path}`}
                alt={person.name}
              />
              :
              <img
                className="details-img"
                src={NoImage}
                alt={person.name}
              />
            }
            <div>
              <h2>{person.name}</h2>
              <p>Born {person.birthday}, in {person.place_of_birth}</p>
              {person.deathday &&
                <p>Died {person.deathday}</p>
              }
              <p>Known for: {person.known_for_department}</p>
              <br />
              <h3>Biography</h3>
              <p>{person.biography}</p>
            </div>
          </section>
          <section>
            <h3>Filmography</h3>
            {credits.crew &&
              <div>
                <h4>Production</h4>
                {credits.crew.filter(item => item.media_type === "movie").length > 0 &&
                  <div>
                    <p>Movies</p>
                    <ul>
                      {credits.crew
                        .filter(item => item.media_type === "movie" && !item.release_date)
                        .map(item => (
                          <li key={`movie-crew-${item.id}`}>
                            <PersonFilmoBox 
                              id={item.id}
                              poster_path={item.poster_path}
                              original_title={item.original_title} 
                              media_type={item.media_type}
                              release_date={item.release_date}
                              job={item.job}
                              department={item.department}
                            />
                          </li>
                      ))}
                      {credits.crew
                        .filter(item => item.media_type === "movie" && item.release_date)
                        .sort((a, b) => {
                          if (a.release_date && b.release_date) return b.release_date.slice(0, 4) - a.release_date.slice(0, 4)
                        })
                        .map(item => (
                          <li key={`movie-crew-${item.id}`}>
                            <PersonFilmoBox 
                              id={item.id}
                              poster_path={item.poster_path}
                              original_title={item.original_title} 
                              media_type={item.media_type}
                              release_date={item.release_date}
                              job={item.job}
                              department={item.department}
                            />
                          </li>
                      ))}
                    </ul>
                    <br />
                  </div>
                }
                {credits.crew.filter(item => item.media_type === "tv").length > 0 &&
                  <div>
                    <p>TV</p>
                    <ul>
                      {credits.crew
                        .filter(item => item.media_type === "tv")
                        .sort((a, b) => {
                          if (a.release_date && b.release_date) return b.release_date.slice(0, 4) - a.release_date.slice(0, 4)
                        })
                        .map(item => (
                          <li key={`tv-crew-${item.id}`}>
                            <PersonFilmoBox 
                              id={item.id}
                              poster_path={item.poster_path}
                              original_name={item.original_name} 
                              media_type={item.media_type}
                              release_date={item.release_date}
                              job={item.job}
                              department={item.department}
                            />
                          </li>
                      ))}
                    </ul>
                  </div>
                }   
                <br />
              </div>
            }
            {credits.cast &&
              <div>
                <h4>Roles</h4>
                {credits.cast.filter(item => item.media_type === "movie").length > 0 &&
                  <div>
                    <p>Movies</p>
                    <ul>
                    {credits.cast
                        .filter(item => item.media_type === "movie" && !item.release_date)
                        .map(item => (
                          <li key={`movie-cast-${item.id}`}>
                            <PersonFilmoBox 
                              id={item.id}
                              poster_path={item.poster_path}
                              original_title={item.original_title} 
                              media_type={item.media_type}
                              release_date={item.release_date}
                              character={item.character}
                            />
                          </li>
                      ))}
                      {credits.cast
                        .filter(item => item.media_type === "movie" && item.release_date)
                        .sort((a, b) => Number(b.release_date.slice(0, 4)) - Number(a.release_date.slice(0, 4))
                        )
                        .map(item => (
                          <li key={`movie-cast-${item.id}`}>
                            <PersonFilmoBox 
                              id={item.id}
                              poster_path={item.poster_path}
                              original_title={item.original_title} 
                              media_type={item.media_type}
                              release_date={item.release_date}
                              character={item.character}
                            />
                          </li>
                      ))}
                    </ul>
                    <br />
                  </div>
                }
                {credits.cast.filter(item => item.media_type === "tv").length > 0 &&
                  <div>
                    <p>TV</p>
                    <ul>
                      {credits.cast
                        .filter(item => item.media_type === "tv")
                        .sort((a, b) => {
                          if (a.release_date && b.release_date) return b.release_date.slice(0, 4) - a.release_date.slice(0, 4)
                        })
                        .map(item => (
                          <li key={`tv-cast-${item.id}`}>
                            <PersonFilmoBox 
                              id={item.id}
                              poster_path={item.poster_path}
                              original_name={item.original_name} 
                              media_type={item.media_type}
                              release_date={item.release_date}
                              character={item.character}
                              episode_count={item.episode_count}
                            />
                          </li>
                        ))}
                    </ul>
                  </div>
                }
              </div>
            }
          </section>
        </div>
      }
      
    </div>
  )
}

export default PersonDetails;
