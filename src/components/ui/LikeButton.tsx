import React from 'react';
import { stagger, useAnimate } from 'framer-motion';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { v4 as uuidv4 } from 'uuid';
import { Box } from '@mui/material';

const randomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

type AnimationStep = [string, { [key: string]: any }, { [key: string]: any }];
type AnimationSequence = AnimationStep[];

interface LikeButtonProps {
  onClick: () => void;
}

export default function LikeButton({ onClick }: LikeButtonProps) {
  const [scope, animate] = useAnimate();

  const handleClick = async () => {
    const thumbs = Array.from({ length: 20 });

    const thumbsAnimation: AnimationSequence = thumbs.map((_, index) => [
      `.thumb-${index}`,
      {
        x: randomNumberBetween(-50, 50),
        y: randomNumberBetween(-50, 50),
        scale: randomNumberBetween(1.2, 2),
        opacity: 1,
      },
      {
        duration: 0.4,
        at: '<',
      },
    ]);

    const thumbsFadeOut: AnimationSequence = thumbs.map((_, index) => [
      `.thumb-${index}`,
      {
        opacity: 0,
        scale: 0,
      },
      {
        duration: 0.3,
        at: '<',
      },
    ]);

    const thumbsReset: AnimationSequence = thumbs.map((_, index) => [
      `.thumb-${index}`,
      {
        x: 0,
        y: 0,
        scale: 1,
      },
      {
        duration: 0.000001,
      },
    ]);

    await animate([
      ...thumbsReset,
      ['.letter', { y: -32 }, { duration: 0.2, delay: stagger(0.05) }],
      ['button', { scale: 0.8 }, { duration: 0.1, at: '<' }],
      ['button', { scale: 1 }, { duration: 0.1 }],
      ...thumbsAnimation,
      ['.letter', { y: 0 }, { duration: 0.000001 }],
      ...thumbsFadeOut,
    ]);

    if (onClick) onClick();
  };

  return (
    <div ref={scope}>
      <button
        type="button"
        onClick={handleClick}
        style={{
          position: 'relative',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: '#242629',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{ display: 'block', height: '2rem', overflow: 'hidden' }}
            aria-hidden
          >
            {['L', 'i', 'k', 'e'].map((letter) => (
              <span
                data-letter={letter}
                className="letter"
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  height: '2rem',
                  lineHeight: '2rem',
                }}
                key={uuidv4()}
              >
                {letter}
              </span>
            ))}
          </span>
          <ThumbUpIcon />
        </Box>
        <span
          aria-hidden
          style={{
            pointerEvents: 'none',
            position: 'absolute',
            inset: 0,
            zIndex: -10,
            display: 'block',
          }}
        >
          {Array.from({ length: 20 }).map((_, index) => (
            <ThumbUpIcon
              className={`thumb-${index}`}
              key={uuidv4()}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: 0,
                color: '#242629',
                fontSize: '1rem',
              }}
            />
          ))}
        </span>
      </button>
    </div>
  );
}
