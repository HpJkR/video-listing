import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import useMovieStore from '../store/useMovieStore';
import { Movie } from '../api/movies';
import LikeButton from './ui/LikeButton';

interface VideoCardProps {
  movie: Movie;
}

const formatNumber = (num: number) => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  }
  return num.toString();
};

export default function VideoCard({ movie }: VideoCardProps) {
  const removeMovie = useMovieStore((state) => state.removeMovie);
  const likeMovie = useMovieStore((state) => state.likeMovie);
  const dislikeMovie = useMovieStore((state) => state.dislikeMovie);

  return (
    <Card
      sx={{
        width: '290px',
        height: '400px',
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'none',
      }}
    >
      <Box sx={{ flexShrink: 0 }}>
        <img
          src={movie.poster}
          alt={movie.title}
          style={{
            width: '290px',
            height: '100%',
            objectFit: 'fill',
          }}
        />
      </Box>
      <CardContent
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '32%',
          background:
            'linear-gradient(to top, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%)',
          backdropFilter: 'blur(12px)',
          padding: '8px',
          paddingBottom: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography
            variant="h5"
            component="div"
            fontWeight="bold"
            sx={{ color: 'white' }}
          >
            {movie.title}
          </Typography>
          <Typography color="text.secondary">{movie.category}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: 'fit-content',
              height: 'fit-content',
              borderRadius: '50px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                borderRadius: '50px',
                border: '2px solid grey',
                padding: '0.1rem 1rem',
                backgroundColor: 'transparent',
                transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: 'white',
                },
              }}
            >
              <LikeButton onClick={() => likeMovie(movie.id)} />
              <Divider orientation="vertical" flexItem />
              <Typography fontWeight="bold" variant="body1">
                {formatNumber(movie.likes)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: 0.5,
              }}
            >
              <IconButton onClick={() => dislikeMovie(movie.id)}>
                <ThumbDownAltIcon style={{ color: '#242629' }} />
              </IconButton>
              <Typography fontWeight="bold" variant="body1">
                {formatNumber(movie.dislikes)}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              marginLeft: 'auto',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '50px',
            }}
          >
            <IconButton
              onClick={() => removeMovie(movie.id)}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
