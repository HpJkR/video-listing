import { create } from 'zustand';

interface Movie {
  id: string;
  title: string;
  category: string;
  likes: number;
  dislikes: number;
  poster: string;
}

interface MovieStore {
  movies: Movie[];
  categories: string[];
  setMovies: (movies: Movie[]) => void;
  removeMovie: (id: string) => void;
  likeMovie: (id: string) => void;
  dislikeMovie: (id: string) => void;
}

const useMovieStore = create<MovieStore>((set) => ({
  movies: [],
  categories: [],
  setMovies: (movies) =>
    set((state) => {
      const newCategories = Array.from(
        new Set(movies.map((movie) => movie.category)),
      );
      return {
        movies,
        categories: newCategories,
      };
    }),
  removeMovie: (id) =>
    set((state) => {
      const filteredMovies = state.movies.filter((movie) => movie.id !== id);
      const newCategories = Array.from(
        new Set(filteredMovies.map((movie) => movie.category)),
      );
      return {
        movies: filteredMovies,
        categories: newCategories,
      };
    }),
  likeMovie: (id) =>
    set((state) => {
      const updatedMovies = state.movies.map((movie) =>
        movie.id === id
          ? {
              ...movie,
              likes: movie.likes + 1,
            }
          : movie,
      );
      return {
        movies: updatedMovies,
        categories: Array.from(
          new Set(updatedMovies.map((movie) => movie.category)),
        ),
      };
    }),
  dislikeMovie: (id) =>
    set((state) => {
      const updatedMovies = state.movies.map((movie) =>
        movie.id === id
          ? {
              ...movie,
              dislikes: movie.dislikes + 1,
            }
          : movie,
      );
      return {
        movies: updatedMovies,
        categories: Array.from(
          new Set(updatedMovies.map((movie) => movie.category)),
        ),
      };
    }),
}));

export default useMovieStore;
