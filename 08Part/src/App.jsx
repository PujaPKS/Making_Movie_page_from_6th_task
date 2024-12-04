import React, { useState } from 'react';

import MovieList from './components/MovieList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  async function fetchMoviesHandler() {
    setIsLoading(true);
    const response = await fetch('https://swapi.dev/api/films/')
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
      setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MovieList movies={movies} /> }
        {!isLoading && movies.length === 0 && <p>No movies found.</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;



// import React, { useState, useRef } from 'react';

// import MovieList from './components/MovieList';
// import './App.css';

// function App() {
//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const retryInterval = useRef(null);

//   async function fetchMoviesHandler() {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('https://swapi.dev/api/films/');
//       if (!response.ok) {
//         throw new Error('Something went wrong');
//       }
//       const data = await response.json();

//       const transformedMovies = data.results.map((movieData) => {
//         return {
//           id: movieData.episode_id,
//           title: movieData.title,
//           openingText: movieData.opening_crawl,
//           releaseDate: movieData.release_date,
//         };
//       });
//       setMovies(transformedMovies);
//       setIsLoading(false);
//     } catch (error) {
//       setError('Something went wrong... Retrying');
//       retryInterval.current = setTimeout(fetchMoviesHandler, 5000); // Retry after 5 seconds
//     }
//   }

//   function cancelRetryHandler() {
//     if (retryInterval.current) {
//       clearTimeout(retryInterval.current);
//       retryInterval.current = null;
//     }
//     setIsLoading(false);
//     setError('Retrying canceled by user.');
//   }

//   return (
//     <React.Fragment>
//       <section>
//         <button onClick={fetchMoviesHandler}>Fetch Movies</button>
//         {retryInterval.current && (
//           <button onClick={cancelRetryHandler}>Cancel Retrying</button>
//         )}
//       </section>
//       <section>
//         {!isLoading && !error && movies.length > 0 && <MovieList movies={movies} />}
//         {!isLoading && !error && movies.length === 0 && <p>No movies found.</p>}
//         {isLoading && <p>Loading...</p>}
//         {!isLoading && error && <p>{error}</p>}
//       </section>
//     </React.Fragment>
//   );
// }

// export default App;

