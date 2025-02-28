'use client';
import { use2048 } from '@/hooks/use2048';
import { useSwipe } from '@/hooks/useSwipe';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import GameOver from '@/components/GameOver';
import GameSettings from '@/components/2048/GameSettings';
import { defaultTiles, Tile, TileColorScheme } from '@/lib/typesAndConstants';
import GameGrid from '@/components/2048/GameGrid';
import { use2048FloatingTiles } from '@/hooks/use2048FloatingTiles';
import GameWon from '@/components/2048/GameWon';
import GameRestart from '@/components/2048/GameRestart';
import { useAudio } from '@/hooks/useAudio';
import BackButton from '@/components/BackButton';
import Overlay from '@/components/ui/overlay';
import Score from '@/components/2048/Score';

// Main component for the 2048 game, handling game logic, UI, and settings.
const Game2048 = () => {
  const [gameWon, setGameWon] = useState(false);
  const [winner, setWinner] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showSettings, setShowSettings] = useState(true);
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [selectedTileColorScheme, setSelectedTileColorScheme] =
    useState<TileColorScheme>(defaultTiles);
  const [selectedGridColor, setSelectedGridColor] = useState('#A7C7E7');
  const [selectedEmptyTileColor, setSelectedEmptyTileColor] =
    useState('#6A8FA9');
  const [cellSize, setCellSize] = useState<number>(0);
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // Game logic from custom hooks
  const { grid, tiles, setDirection, gameOver, restartGame, score, highScore } =
    use2048(!showSettings, gameWon, isMusicEnabled);
  const swipeHandlers = useSwipe(setDirection, !showSettings); // Swipe gesture handlers for mobile/touch input
  const gridRef = useRef<HTMLDivElement | null>(null);
  const floatingTiles = use2048FloatingTiles(
    selectedTileColorScheme.tileColors
  );

  const handleStartGame = () => {
    setIsGameStarted(true);
    setShowSettings(false);
    setIsGamePaused(false);
    if (gameOver) {
      restartGame();
    }
  };

  const handleRestartGame = () => {
    setGameWon(false);
    setWinner(false);
    restartGame();
  };

  // Dynamically calculates the size of grid cells based on the container dimensions.
  const updateSize = useCallback(() => {
    if (gridRef.current) {
      const gridWidth = gridRef.current.offsetWidth;
      const gridHeight = gridRef.current.offsetHeight;
      const padding = 32;
      const gapTotal = 18;
      const calculatedCellSize =
        (Math.min(gridWidth, gridHeight) - padding - gapTotal) / 4;
      setCellSize(calculatedCellSize);
    }
  }, [gridRef]);

  // Sets up resize listeners to dynamically adjust cell size
  useEffect(() => {
    updateSize();
    window.addEventListener('resize', updateSize);
    window.addEventListener('orientationchange', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('orientationchange', updateSize);
    };
  }, [updateSize]);

  // Checks if a tile with value 2048 exists in the tiles array to determine a win.
  function checkForWin(tiles: Tile[]) {
    if (winner) {
      return;
    }
    const tileWith2048 = tiles.find((tile) => tile.value === 2048);
    if (tileWith2048) {
      setGameWon(true);
      setWinner(true);
    }
  }

  // Effect to check for win condition whenever tiles change
  useEffect(() => {
    checkForWin(tiles);
  }, [tiles]);

  // Audio management for background music
  const { play: playBackgroundMusic, pause: pauseBackgroundMusic } = useAudio(
    { src: '/2048music.mp3', loop: true },
    isMusicEnabled,
    hasUserInteracted
  );

  // Audio management for game over sound
  const { play: playGameOverSound, pause: pauseGameOverSound } = useAudio(
    { src: '/2048gameOver.mp3' },
    isMusicEnabled && gameOver,
    hasUserInteracted
  );

  // Handles the first user interaction to enable audio playback.
  const handleUserInteraction = useCallback(() => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
      if (isMusicEnabled) {
        playBackgroundMusic();
      }
    }
  }, [hasUserInteracted, isMusicEnabled, playBackgroundMusic]);

  // Manages background music playback based on user interaction and music state
  useEffect(() => {
    if (hasUserInteracted) {
      if (isMusicEnabled) {
        playBackgroundMusic();
      } else {
        pauseBackgroundMusic();
      }
    }
  }, [
    isMusicEnabled,
    hasUserInteracted,
    playBackgroundMusic,
    pauseBackgroundMusic,
  ]);

  // Manages game over sound playback based on game state and music state
  useEffect(() => {
    if (hasUserInteracted && isMusicEnabled && gameOver) {
      playGameOverSound();
    } else if (!isMusicEnabled || !gameOver) {
      pauseGameOverSound();
    }
  }, [
    gameOver,
    isMusicEnabled,
    hasUserInteracted,
    playGameOverSound,
    pauseGameOverSound,
  ]);

  return (
    <main
      className={`flex flex-col items-center justify-center min-h-screen text-white relative`}
      style={{ touchAction: 'none', background: selectedEmptyTileColor }}
      onClick={handleUserInteraction} // Handler for first user interaction to enable audio
      {...swipeHandlers}
    >
      {/* Game background  */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {floatingTiles}
      </div>

      {/* Back button to return to the main menu */}
      <BackButton handleUserInteraction={handleUserInteraction} />

      {/* Game score and high score */}
      <Score
        handleUserInteraction={handleUserInteraction}
        selectedEmptyTileColor={selectedEmptyTileColor}
        score={score}
        highScore={highScore}
      />

      {/* Game restart button  */}
      {!showSettings && <GameRestart handleRestartGame={handleRestartGame} />}

      {/* Game settings button  */}
      {isGameStarted && !gameOver && (
        <Button
          className='absolute z-40 right-4 top-4 bg-pink-500 hover:bg-pink-600 font-bold py-2 px-4 text-xl text-white transition-all duration-300'
          onClick={() => {
            setShowSettings(true);
            setIsGamePaused(true);
          }}
        >
          Settings
        </Button>
      )}

      {/* Dark overlay for aesthetics */}
      <Overlay />

      {/* Game grid container */}
      <div
        ref={gridRef}
        className={`relative flex items-center justify-center w-[90vmin] h-[90vmin] max-w-[70vh] max-h-[70vh] p-4 rounded-lg`}
        style={{
          backgroundColor: selectedGridColor || '#2d3748',
          touchAction: 'none',
        }}
        onClick={handleUserInteraction}
      >
        <GameGrid
          grid={grid}
          selectedEmptyTileColor={selectedEmptyTileColor}
          tiles={tiles}
          selectedTileColorScheme={selectedTileColorScheme}
          cellSize={cellSize}
          onTileColorChange={(tileScheme: TileColorScheme) =>
            setSelectedTileColorScheme(tileScheme)
          }
          onGridColorChange={(color: string) => setSelectedGridColor(color)}
          onEmptyTilesChange={(color: string) =>
            setSelectedEmptyTileColor(color)
          }
        />
      </div>

      {gameOver && (
        <GameOver
          onRestart={handleRestartGame}
          onSettings={() => setShowSettings(true)}
        />
      )}

      {gameWon && (
        <GameWon
          onRestart={handleRestartGame}
          onContinue={() => setGameWon(false)}
          isMusicEnabled={isMusicEnabled}
        />
      )}

      {showSettings && (
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10'>
          <GameSettings
            handleStartGame={handleStartGame}
            isGamePaused={isGamePaused}
            selectedTileColorScheme={selectedTileColorScheme}
            handleTileColorChange={(tileScheme) =>
              setSelectedTileColorScheme(tileScheme)
            }
            selectedGridColor={selectedGridColor}
            handleGridColorChange={(color) => setSelectedGridColor(color)}
            selectedEmptyTileColor={selectedEmptyTileColor}
            handleEmptyTilesChange={(color) => setSelectedEmptyTileColor(color)}
            isMusicEnabled={isMusicEnabled}
            setIsMusicEnabled={setIsMusicEnabled}
          />
        </div>
      )}
    </main>
  );
};
export default React.memo(Game2048); // Memoize the component to prevent unnecessary re-renders
