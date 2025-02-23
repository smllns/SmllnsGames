'use client';
import GameStatus from '@/components/snake/GameStatus';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import { useSnakeGame } from '@/hooks/useSnakeGame';
import { useSnakeWindowSize } from '@/hooks/useSnakeWindowSize';
import { useSnakeEmojis } from '@/hooks/useSnakeEmojis';
import { useSnakeSwipe } from '@/hooks/useSnakeSwipe';
import GridCells from '@/components/snake/GridCells';
import GameSettings from '@/components/snake/GameSettings';
import FloatingEmojis from '@/components/snake/FloatingEmojis';

const Snake = () => {
  // State variables for game settings
  const [gridSize, setGridSize] = useState(10);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gridColor, setGridColor] = useState('#A7C7E7');
  const [gridBorderColor, setGridBorderColor] = useState('#6A8FA9');
  const [snakeColor, setSnakeColor] = useState('#4B5D67');
  const [foodEmoji, setFoodEmoji] = useState('🍏');
  const [showSettings, setShowSettings] = useState(true);

  // Game logic hook
  const {
    snake,
    food,
    isGameOver,
    score,
    highScore,
    changeDirection,
    resetGame,
    zeroScore,
  } = useSnakeGame(gridSize, isGameStarted);

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
  const handlers = useSnakeSwipe(changeDirection, isGameStarted);

  // Toggle settings menu and reset the score
  const openSettings = () => {
    setShowSettings((prev) => !prev);
    setIsGameStarted(false);
    zeroScore();
  };

  return (
    <main
      className='relative flex flex-col items-center justify-center min-h-screen text-white transition-all duration-300'
      style={{ backgroundColor: gridBorderColor, touchAction: 'none' }}
      {...handlers} // Enables swipe gestures
    >
      {/* Background music for the game */}
      <audio autoPlay loop>
        <source src='/snakeMusic.mp3' type='audio/mp3' />
        Your browser does not support the audio element.
      </audio>

      {/* Back button to return to the main menu */}
      <Button
        className='absolute z-10 left-4 top-4 bg-pink-500 hover:bg-pink-600 font-bold py-2 px-4 text-xl text-white transition-all duration-300'
        onClick={() => (window.location.href = '/')}
      >
        Back
      </Button>

      {/* Display current score and high score */}
      <div className='absolute top-4 right-4 z-10 text-white bg-neutral-800 p-4 rounded-md font-bold'>
        <p>
          {foodEmoji} Score: {score}
        </p>
        <p>High Score: {highScore}</p>
      </div>

      {/* Background floating food emojis with animations */}
      <FloatingEmojis emojis={emojis} />

      {/* Dark overlay for aesthetics */}
      <div className='absolute inset-0 bg-black/50 z-0' />

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
        />
      )}

      {/* Show game over screen if the game is over */}
      {!showSettings && (
        <GameStatus
          onRestart={resetGame}
          isGameOver={isGameOver}
          onSettings={openSettings}
        />
      )}
    </main>
  );
};

export default Snake;
