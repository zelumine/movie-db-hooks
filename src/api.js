import {
  API_URL,
  API_KEY,
  SEARCH_BASE_URL,
  POPULAR_BASE_URL,
  MOVIE_GENRE_URL,
  TV_GENRE_URL
} from './config';

const apiHandler = {
  // got a bit of help from a YouTube tutorial for line 10  and 15 as I had trouble extracting the results
  getMovies(page) {
    return fetch(`${POPULAR_BASE_URL}&page=${page}`)
            .then(data => data.json()); // first get the results and turn it into JSON, then we can extract the results when we call it later
  },

  searchMovie(searchValue) {
    return fetch(`${SEARCH_BASE_URL}${searchValue}`)
            .then(result => result.json());
  },

  getOneMovie(movieId) {
    return fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
            .then(result => result.json());
  },

  getMovieCredits(movieId) {
    return fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
            .then(result => result.json());
  },

  getPerson(personId) {
    return fetch(`${API_URL}person/${personId}?api_key=${API_KEY}&language=en-US`)
            .then(result => result.json());
  },

  getPersonsCredits(personId) {
    return fetch(`${API_URL}person/${personId}/combined_credits?api_key=${API_KEY}&language=en-US`)
            .then(result => result.json());
  },
}

export default apiHandler;

/* Memo for test
https://api.themoviedb.org/3/movie/438631?api_key=e234cccf21e5c3ee247b0487632d29fc
*/