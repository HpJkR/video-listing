import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  setCurrentPage: (page: number) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategories,
  setSelectedCategories,
  setCurrentPage,
}: CategoryFilterProps) {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(typeof value === 'string' ? value.split(',') : value);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setCurrentPage(1);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Typography sx={{ color: 'white', fontSize: '2rem' }}>
        Select a category :
      </Typography>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel
          id="category-select-label"
          sx={{ color: 'white', '&.Mui-focused': { color: 'white' } }}
        >
          Categories
        </InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          multiple
          value={selectedCategories}
          onChange={handleChange}
          input={<OutlinedInput label="Categories" />}
          renderValue={(selected) => (selected as string[]).join(', ')}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
                backgroundColor: '#333',
              },
            },
          }}
          sx={{
            color: 'white',
            backgroundColor: '#333',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '& .MuiSelect-icon': {
              color: 'white',
            },
            '& .MuiListItemText-root': {
              color: 'white',
            },
            '& .MuiMenuItem-root': {
              color: 'white',
            },
          }}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              <Checkbox
                checked={selectedCategories.indexOf(category) > -1}
                sx={{ color: 'white' }}
              />
              <ListItemText primary={category} sx={{ color: 'white' }} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="outlined"
        onClick={handleReset}
        sx={{
          color: 'white',
          borderColor: 'white',
          '&:hover': {
            borderColor: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        Reset filters
      </Button>
    </Box>
  );
}
