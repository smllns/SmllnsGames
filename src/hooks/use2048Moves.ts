import { use2048SlideTiles } from './use2048SlideTiles';
import { use2048MergeTiles } from './use2048MergeTiles';
import { Tile } from '@/lib/typesAndConstants';
import { useState, useEffect } from 'react';

export const use2048Moves = (
  setScore: (prev: (prevScore: number) => number) => void,
  isMusicEnabled: boolean,
  initialTiles: Set<number>
) => {
  const slideTiles = use2048SlideTiles();
  const mergeTiles = use2048MergeTiles();

  const isMobile =
    typeof window !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);

  // Convert initialTiles Set into a standard Set for state management
  const [discoveredTiles, setDiscoveredTiles] = useState(
    new Set(Array.from(initialTiles))
  );

  // Sync state with initialTiles when component mounts
  useEffect(() => {
    setDiscoveredTiles(new Set(Array.from(initialTiles)));
  }, [initialTiles]);

  // Function to play sound effects with adjustable volume
  const playSound = (soundFile: string, volume: number = 1) => {
    if (!isMusicEnabled || isMobile) return; // Disable sound on mobile devices
    const audio = new Audio(soundFile);
    audio.volume = volume;
    audio.play();
  };

  // Processes a move by sliding, merging, and updating the state
  const processMove = (
    currentTiles: Tile[],
    axis: 'x' | 'y',
    start: number,
    step: number
  ): Tile[] => {
    // Slide tiles in the given direction
    const slidTiles = slideTiles(currentTiles, axis, start, step);

    // Check if any tile has moved
    const hasMoved = slidTiles.some((tile) => {
      const originalTile = currentTiles.find((t) => t.id === tile.id);
      return (
        originalTile && (originalTile.x !== tile.x || originalTile.y !== tile.y)
      );
    });

    // Merge tiles after sliding
    const { tiles: mergedTiles, scoreIncrease } = mergeTiles(
      slidTiles,
      axis,
      start,
      step
    );

    // Check if any tiles were merged
    const hasMerged = scoreIncrease > 0;

    if (hasMoved) playSound('/2048swoosh.mp3', 0.7); // Play move sound effect

    // Process merged tiles
    mergedTiles.forEach((tile) => {
      if (!discoveredTiles.has(tile.value)) {
        playSound('/2048newTile.mp3', 0.2);
        // Update discovered tiles using functional state update
        setDiscoveredTiles((prev) => {
          const newDiscoveredTiles = new Set(prev);
          newDiscoveredTiles.add(tile.value);
          return newDiscoveredTiles;
        });
      } else if (hasMerged) {
        playSound('/2048merge.mp3', 0.1); // Play sound for merging tiles
      }
    });

    // Update the score if merging occurred
    if (scoreIncrease > 0) {
      setScore((prevScore) => prevScore + scoreIncrease / 2);
    }

    // Return updated tiles with previous positions tracked
    return mergedTiles.map((tile) => ({
      ...tile,
      prevX: tile.prevX || tile.x,
      prevY: tile.prevY || tile.y,
    }));
  };

  return {
    moveLeft: (tiles: Tile[]) => processMove(tiles, 'x', 0, 1),
    moveRight: (tiles: Tile[]) => processMove(tiles, 'x', 3, -1),
    moveUp: (tiles: Tile[]) => processMove(tiles, 'y', 0, 1),
    moveDown: (tiles: Tile[]) => processMove(tiles, 'y', 3, -1),
  };
};
