import React, { useCallback, useEffect, useState } from 'react';

import MovieList from './components/MovieList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchMoviesHandler = useCallback( async() => {
    setIsLoading(true);
    setError(null);

    try{
      // const response = await fetch('https://swapi.dev/api/films/')   // correct api 

      // replaced url with the firebase url created
      const response = await fetch('https://react-http-movie-d2d5f-default-rtdb.firebaseio.com/movies.json');
      
        if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
        
        // const transformedMovies = data.map(movieData => {
        //   return {
        //     id: movieData.episode_id,
        //     title: movieData.title,
        //     openingText: movieData.opening_crawl,
        //     releaseDate: movieData.release_date
        //   };      
        // });
        // setMovies(transformedMovies);
        setMovies(loadedMovies);
    } catch(error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  // Added a new movie to Firebase
  async function addMovieHandler(movie) {
    // console.log(movie);
    const response = await fetch('https://react-http-movie-d2d5f-default-rtdb.firebaseio.com/movies.json' , {
      method: 'POST',
      body: JSON.stringify(movie), 
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }

  // Delete a movie from Firebase and update the UI
  async function deleteMovieHandler(movieId) {
    const response = await fetch(
      `https://react-http-movie-d2d5f-default-rtdb.firebaseio.com/movies/${movieId}.json`,
      {
        method: 'DELETE',
      }
    );
    
    if (!response.ok) {
      alert('Failed to delete movie.');
      return;
    }

    // Update UI after deletion
    setMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.id !== movieId)
    );
    alert('Movie deleted successfully!');
  }



  let content = <p>Found no movies</p>;
  if (movies.length > 0) {
    content = <MovieList movies={movies} onDeleteMovie={deleteMovieHandler}/>; // Passed deleteMovieHandler here
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
        < AddMovie onAddMovie = {addMovieHandler} />
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

