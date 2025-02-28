'use client';
import GameStatus from '@/components/snake/GameStatus';
import React, { useState, useEffect } from 'react';
import { useSnakeGame } from '@/hooks/useSnakeGame';
import { useSnakeWindowSize } from '@/hooks/useSnakeWindowSize';
import { useSnakeEmojis } from '@/hooks/useSnakeEmojis';
import { useSwipe } from '@/hooks/useSwipe';
import GridCells from '@/components/snake/GridCells';
import GameSettings from '@/components/snake/GameSettings';
import FloatingEmojis from '@/components/snake/FloatingEmojis';
import { useAudio } from '@/hooks/useAudio';
import BackButton from '@/components/BackButton';
import Overlay from '@/components/ui/overlay';

const Snake = () => {
  // State variables for game settings
  const [gridSize, setGridSize] = useState(10);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gridColor, setGridColor] = useState('#A7C7E7');
  const [gridBorderColor, setGridBorderColor] = useState('#6A8FA9');
  const [snakeColor, setSnakeColor] = useState('#4B5D67');
  const [foodEmoji, setFoodEmoji] = useState('🍏');
  const [showSettings, setShowSettings] = useState(true);
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const {
    snake,
    food,
    isGameOver,
    setIsGameOver,
    score,
    highScore,
    changeDirection,
    resetGame,
    zeroScore,
  } = useSnakeGame(gridSize, isGameStarted, isMusicEnabled);

  // Detects screen size (only on client-side)
  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsWideScreen(window.innerWidth > window.innerHeight);
    }
  }, []); // Only runs on client-side after component is mounted

  useSnakeWindowSize({ setIsWideScreen }); // Updates screen size state

  // Emoji animations for food items
  const emojis = useSnakeEmojis(foodEmoji);

  // Handles swipe gestures on mobile
  const handlers = useSwipe(changeDirection, isGameStarted);

  // Use useAudio hook for background music management
  const { play: playBackgroundMusic } = useAudio(
    { src: '/snakeMusic.mp3', loop: true },
    isMusicEnabled,
    hasUserInteracted
  );

  // Handler for the first user interaction to enable audio playback
  const handleUserInteraction = () => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
      if (isMusicEnabled) {
        playBackgroundMusic();
      }
    }
  };

  // Toggle settings menu and reset the score
  const openSettings = () => {
    setIsGameOver(false);
    setShowSettings((prev) => !prev);
    setIsGameStarted(false);
    zeroScore();
  };

  return (
    <main
      className='relative flex flex-col items-center justify-center min-h-screen text-white transition-all duration-300'
      style={{ backgroundColor: gridBorderColor, touchAction: 'none' }}
      onClick={handleUserInteraction}
      {...handlers} // Enables swipe gestures
    >
      {/* Back button to return to the main menu */}
      <BackButton handleUserInteraction={handleUserInteraction} />

      {/* Display current score and high score */}
      <div
        className='absolute top-4 right-4 z-10 text-white bg-neutral-800 p-4 rounded-md font-bold'
        onClick={handleUserInteraction}
      >
        <p>
          {foodEmoji} Score: {score}
        </p>
        <p>High Score: {highScore}</p>
      </div>

      {/* Background floating food emojis with animations */}
      <FloatingEmojis emojis={emojis} />

      {/* Dark overlay for aesthetics */}
      <Overlay />

      {/* Game grid container */}
      <div
        className={`absolute grid gap-[2px] p-2 rounded-md  ${
          isWideScreen ? ' h-full' : 'w-full '
        }  zero:max-w-[90vw] zero:max-h-[90vh] sm:max-w-[80vw]  sm:max-h-[80vh] md:max-w-[75vw] md:max-h-[75vh]  transition-all duration-300`}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          backgroundColor: gridColor,
          aspectRatio: '1',
          margin: 'auto',
        }}
        onClick={handleUserInteraction}
      >
        <GridCells
          gridSize={gridSize}
          snake={snake}
          food={food}
          gridBorderColor={gridBorderColor}
          snakeColor={snakeColor}
          foodEmoji={foodEmoji}
        />
      </div>

      {/* Show settings menu if game is not started */}
      {!isGameStarted && showSettings && (
        <GameSettings
          gridSize={gridSize}
          setGridSize={setGridSize}
          gridColor={gridColor}
          setGridColor={setGridColor}
          setGridBorderColor={setGridBorderColor}
          snakeColor={snakeColor}
          setSnakeColor={setSnakeColor}
          foodEmoji={foodEmoji}
          setFoodEmoji={setFoodEmoji}
          setIsGameStarted={setIsGameStarted}
          setShowSettings={setShowSettings}
          isMusicEnabled={isMusicEnabled}
          setIsMusicEnabled={setIsMusicEnabled}
        />
      )}

      {/* Show game over screen if the game is over */}
      {!showSettings && (
        <GameStatus
          isGameOver={isGameOver}
          onRestart={resetGame}
          onSettings={openSettings}
          isMusicEnabled={isMusicEnabled}
        />
      )}
    </main>
  );
};

export default Snake;
