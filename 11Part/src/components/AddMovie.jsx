import React, { useRef } from 'react';

import './AddMovie.css'

function AddMovie(props) {
  const titleRef = useRef('');
  const openingTextRef = useRef('');
  const releaseDateRef = useRef('');

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    // Input validation: Ensure no empty fields
    if (!movie.title || !movie.openingText || !movie.releaseDate) {
        alert('Please fill out all fields!');
        return;
    }
  
    // Log the new movie object to the console
    // console.log('NewMovieObj:', movie);

    // Pass the movie to the parent component (App.jsx)
    props.onAddMovie(movie);

    // Clear input fields after submission
    titleRef.current.value = '';
    openingTextRef.current.value = '';
    releaseDateRef.current.value = '';
  }

  return (
    <form onSubmit={submitHandler}>
      <div className= 'control'>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' ref={titleRef} />
      </div>
      <div className= 'control'>
        <label htmlFor='opening-text'>Opening Text</label>
        <textarea rows='5' id='opening-text' ref={openingTextRef}></textarea>
      </div>
      <div className= 'control'>
        <label htmlFor='date'>Release Date</label>
        <input type='text' id='date' ref={releaseDateRef} />
      </div>
      <button>Add Movie</button>
    </form>
  );
}

export default AddMovie;