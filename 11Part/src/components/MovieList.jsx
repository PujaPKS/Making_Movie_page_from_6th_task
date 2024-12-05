import React from 'react';

import Movie from './Movie';
import './MovieList.css';

const MovieList = (props) => {
  return (
    <ul className="movies-list" >
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id} // Passed the movie ID for deletion
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          onDelete={props.onDeleteMovie} // Passed the delete handler
        />
      ))}
    </ul>
  );
};

export default MovieList;
