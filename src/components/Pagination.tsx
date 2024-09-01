import React from 'react';
import { Box, Button, MenuItem, Select } from '@mui/material';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  setItemsPerPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          gap: 2,
          marginLeft: 3,
        }}
      >
        <Button
          variant="contained"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          sx={{
            backgroundColor: currentPage === 1 ? 'grey' : '#f50057',
            color: currentPage === 1 ? 'lightgrey' : 'white',
            '&:hover': {
              backgroundColor: currentPage === 1 ? 'grey' : '#c51162',
            },
            '&.Mui-disabled': {
              backgroundColor: 'grey',
              color: 'lightgrey',
            },
          }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          sx={{
            backgroundColor: currentPage === totalPages ? 'grey' : '#f50057',
            color: currentPage === totalPages ? 'lightgrey' : 'white',
            '&:hover': {
              backgroundColor: currentPage === totalPages ? 'grey' : '#c51162',
            },
            '&.Mui-disabled': {
              backgroundColor: 'grey',
              color: 'lightgrey',
            },
          }}
        >
          Next
        </Button>
      </Box>
      <Box>
        <Select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          sx={{
            color: 'black',
            border: '2px solid grey',
            background: 'white',
          }}
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={12}>12</MenuItem>
        </Select>
      </Box>
    </Box>
  );
}
