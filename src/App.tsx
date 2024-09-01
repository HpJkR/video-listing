import React, { useEffect } from 'react';
import movies$ from './api/movies';
import useMovieStore from './store/useMovieStore';
import VideoList from './components/VideoList';
import './App.css';

export default function App() {
  const setMovies = useMovieStore((state) => state.setMovies);

  useEffect(() => {
    movies$.then(setMovies);
  }, [setMovies]);

  return (
    <div className="App">
      <VideoList />
    </div>
  );
}
