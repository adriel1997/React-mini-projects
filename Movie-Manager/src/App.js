import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://expense-manager-cf5b2-default-rtdb.firebaseio.com/movies.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      let transformedMovies = [];
      const data = await response.json();
      for(const movieData in data){
        transformedMovies.push({
          id: data[movieData].episode_id,
          title: data[movieData].title,
          openingText: data[movieData].openingText || data[movieData].opening_crawl,
          releaseDate: data[movieData].release_date
        });
      }
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    movie.episode_id = movies.length + 1;
    const response = await fetch('https://expense-manager-cf5b2-default-rtdb.firebaseio.com/movies.json',{
      method:'POST',
      body:JSON.stringify(movie),
      headers:{
        'Content-Type':'application/json'
      }
    });
    if(response.ok){
      fetchMoviesHandler();
    }
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
