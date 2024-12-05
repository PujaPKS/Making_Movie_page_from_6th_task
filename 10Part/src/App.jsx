import React, { useState } from 'react';

import MovieList from './components/MovieList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);

    try{
      const response = await fetch('https://swapi.dev/api/films/')   // correct api
      // const response = await fetch('https://swapi.dev/api/film/')  // wrong api for seeing error 
      
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
        
        const transformedMovies = data.results.map(movieData => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date
          };      
        });
        setMovies(transformedMovies);
    } catch(error) {
      setError(error.message);
    }
    setIsLoading(false);
  }


  let content = <p>Found no movies</p>;
  if (movies.length > 0) {
    content = <MovieList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        < AddMovie />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* {!isLoading && movies.length > 0 && <MovieList movies={movies} /> }
        {!isLoading && movies.length === 0 && !error && <p>No movies found.</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>} */}
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;

