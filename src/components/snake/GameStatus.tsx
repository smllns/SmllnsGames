import React, { useEffect, useRef } from 'react';
import GameOver from '../GameOver';

interface GameStatusProps {
  isGameOver: boolean;
  onRestart: () => void;
  onSettings: () => void;
  isMusicEnabled: boolean;
}

//Game over component with music for snake game
const GameStatus: React.FC<GameStatusProps> = ({
  isGameOver,
  onRestart,
  onSettings,
  isMusicEnabled,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isMobile =
    typeof window !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);

  useEffect(() => {
    if (!isMobile) {
      audioRef.current = new Audio('/snakeGameOver.mp3');
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    if (isGameOver && isMusicEnabled && !isMobile && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error('Error playing game over sound:', error);
      });
    }
  }, [isGameOver, isMusicEnabled, isMobile]);

  if (!isGameOver) return null;

  return (
    <>
      {!isMobile && (
        <audio ref={audioRef}>
          <source src='/snakeGameOver.mp3' type='audio/mp3' />
          <source src='/snakeGameOver.ogg' type='audio/ogg' />
          Your browser does not support the audio element.
        </audio>
      )}
      <GameOver onRestart={onRestart} onSettings={onSettings} />
    </>
  );
};

export default GameStatus;
