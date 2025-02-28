'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { use2048Keydown } from './use2048Keydown';
import { use2048Moves } from './use2048Moves';
import { useLocalHighScore } from './useLocalHighScore';
import { Direction, GRID_SIZE, Tile } from '@/lib/typesAndConstants';
import { checkGameOver, initializeTiles, addRandomTile } from '@/lib/2048Utils';

// Custom hook for managing the 2048 game state and logic.
export const use2048 = (
  isActive: boolean,
  gameWon: boolean,
  isMusicEnabled: boolean
) => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [initialTiles, setInitialTiles] = useState<Set<number>>(new Set());
  const [pendingMove, setPendingMove] = useState<Direction | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [lastMoveTime, setLastMoveTime] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [score, setScore] = useState(0);
  const { highScore, updateHighScore } = useLocalHighScore('2048HighScore');

  // Update high score if current score exceeds it
  useEffect(() => {
    if (score > highScore) {
      updateHighScore(score);
    }
  }, [score, highScore, updateHighScore]);

  // Initialize game tiles on mount or game reset
  useEffect(() => {
    const newTiles = initializeTiles();
    setTiles(newTiles);
    setInitialTiles(new Set(newTiles.map((tile) => tile.value)));
  }, []);

  // Reinitialize tiles when game over state changes (for restart)
  useEffect(() => {
    if (!gameOver) {
      const newTiles = initializeTiles();
      setTiles(newTiles);
      setInitialTiles(new Set(newTiles.map((tile) => tile.value)));
    }
  }, [gameOver]);

  //  Restarts the game by resetting all states to initial values.
  const restartGame = useCallback(() => {
    setTiles(initializeTiles());
    setScore(0);
    setGameOver(false);
    setLastMoveTime(0);
    setIsProcessing(false);
    setPendingMove(null);
  }, [initialTiles]);

  // Get move functions from use2048Moves hook
  const { moveLeft, moveRight, moveUp, moveDown } = use2048Moves(
    setScore,
    isMusicEnabled,
    initialTiles
  );

  //  Determines if tiles have changed between moves.
  const hasTilesChanged = useCallback(
    (oldTiles: Tile[], newTiles: Tile[]): boolean => {
      if (oldTiles.length !== newTiles.length) return true;
      return oldTiles.some(
        (tile) =>
          !newTiles.some(
            (t) =>
              t.id === tile.id &&
              t.x === tile.x &&
              t.y === tile.y &&
              t.value === tile.value
          )
      );
    },
    []
  );

  // Handle keyboard input for game moves
  use2048Keydown({
    isActive,
    gameWon,
    pendingMove,
    gameOver,
    isProcessing,
    lastMoveTime,
    setPendingMove,
    setLastMoveTime,
  });

  // Process moves when a pending move is detected
  useEffect(() => {
    if (!pendingMove) return;

    setPendingMove(null);
    setIsProcessing(true);

    setTiles((prevTiles) => {
      let newTiles: Tile[];
      switch (pendingMove) {
        case 'LEFT':
          newTiles = moveLeft(prevTiles);
          break;
        case 'RIGHT':
          newTiles = moveRight(prevTiles);
          break;
        case 'UP':
          newTiles = moveUp(prevTiles);
          break;
        case 'DOWN':
          newTiles = moveDown(prevTiles);
          break;
        default:
          setIsProcessing(false);
          return prevTiles;
      }

      if (hasTilesChanged(prevTiles, newTiles)) {
        const movedTiles = newTiles.map((tile) => ({
          ...tile,
          prevX: tile.x,
          prevY: tile.y,
        }));

        // Delay adding a new random tile for animation smoothness
        setTimeout(() => {
          setTiles((currentTiles) => {
            if (!hasTilesChanged(movedTiles, currentTiles)) {
              const updatedTiles = addRandomTile(currentTiles);
              setGameOver(checkGameOver(updatedTiles));
              setIsProcessing(false);
              return updatedTiles;
            }
            return currentTiles;
          });
        }, 200);

        return movedTiles;
      }

      setIsProcessing(false);
      return prevTiles;
    });
  }, [pendingMove, moveLeft, moveRight, moveUp, moveDown, hasTilesChanged]);

  // Create the game grid from tiles
  const grid: (number | '')[][] = useMemo(() => {
    return Array.from({ length: GRID_SIZE }, () =>
      Array(GRID_SIZE).fill('')
    ).map((row, y) =>
      row.map((_, x) => {
        const tile = tiles.find((t) => t.x === x && t.y === y);
        return tile?.value || '';
      })
    );
  }, [tiles]);

  return {
    grid,
    tiles,
    setDirection: setPendingMove,
    gameOver,
    restartGame,
    score,
    highScore,
  };
};
