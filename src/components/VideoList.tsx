import React, { useState } from 'react';
import { Box } from '@mui/material';
import useMovieStore from '../store/useMovieStore';
import VideoCard from './VideoCard';
import CategoryFilter from './CategoryFilter';
import Pagination from './Pagination';

export default function VideoList() {
  const movies = useMovieStore((state) => state.movies);
  const categories = useMovieStore((state) => state.categories);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const filteredMovies = movies.filter(
    (movie) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(movie.category),
  );

  const paginatedMovies = filteredMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <CategoryFilter
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        setCurrentPage={setCurrentPage}
      />
      <Box
        sx={{
          width: '100%',
          height: '2px',
          marginY: 2,
          background:
            'linear-gradient(to right, #3f51b5 25%, #f50057 50%, #3f51b5 75%)',
          borderRadius: '1px',
        }}
      />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        {paginatedMovies.map((movie) => (
          <VideoCard key={movie.id} movie={movie} />
        ))}
      </Box>
      <Pagination
        totalItems={filteredMovies.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
      />
    </Box>
  );
}
