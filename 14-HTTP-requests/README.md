# 14 Sending Http requests

## `useState` and fetching data

### Storing the response

We can store the response of the request into an specific state in order to manipulate and render accordingly our application.

```JS
import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    const response = await fetch("https://swapi.dev/api/films");
    const data = await response.json();
    const transformMovies = data.results.map(movieData => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    setMovies(transformMovies);
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>No movies found.</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
```

### State for the request status

Additionally, we can keep track of the request by creating different states (`loading`, `error`, etc.)

## `useEffect()` for fetching data

In many cases we want to fetch data once one of the components has been rendered. For this we use `useEffect()` in addition to `useCallback()`.   
As we know functions are objects and every time a component is regenerated it creates a completly new function object. This makes using `useEffect()` useless since we would need to point at the function as a dependency but since every time we render the component we get a new function it will run the component function again, creating a new function, which restarts the process creating an infinite loop. If we wrap the function with `useCallback` we declare that a single function should be created and only that function is relevant to that component.

```JS
import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoviesHandler = useCallback(async () => { 
    // 1. Wrapping the function with useCallback
    setIsLoading(true);
    const response = await fetch("https://swapi.dev/api/films");
    const data = await response.json();
    const transformMovies = data.results.map(movieData => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    setMovies(transformMovies);
    setIsLoading(false);
  },[]);

  useEffect(() => { //2. Pointing at the function with useEffect
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);
```