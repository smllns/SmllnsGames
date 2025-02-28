import { useCallback } from 'react';
import { MergeResult, Tile } from '@/lib/typesAndConstants';

// Custom hook to handle merging tiles in the 2048 game
export const use2048MergeTiles = () => {
  const mergeTiles = useCallback(
    (
      tiles: Tile[],
      axis: 'x' | 'y',
      start: number,
      step: number
    ): MergeResult => {
      const newTiles: Tile[] = [];
      const grouped = new Map<number, Tile[]>(); // Map to group tiles by row (for vertical moves) or column (for horizontal moves)
      let scoreIncrease = 0; // Keeps track of score increase from merging tiles

      // Group tiles by their row (for vertical moves) or column (for horizontal moves)
      tiles.forEach((tile) => {
        const key = axis === 'x' ? tile.y : tile.x;
        if (!grouped.has(key)) grouped.set(key, []);
        grouped.get(key)!.push({ ...tile }); // Clone tile to avoid direct mutation
      });

      // Process each group of tiles (row-wise or column-wise)
      grouped.forEach((tiles) => {
        // Sort tiles based on movement direction
        tiles.sort((a, b) =>
          step > 0 ? a[axis] - b[axis] : b[axis] - a[axis]
        );

        let pos = start; // Position where the next tile should be placed
        let i = 0;

        while (i < tiles.length) {
          // Merge adjacent tiles if they have the same value
          if (i + 1 < tiles.length && tiles[i].value === tiles[i + 1].value) {
            const mergedValue = tiles[i].value * 2;
            scoreIncrease += mergedValue; // Increase score

            newTiles.push({
              ...tiles[i],
              value: mergedValue,
              [axis]: pos,
              isNew: true,
            });
            i += 2; // Skip the next tile as it was merged
          } else {
            newTiles.push({
              ...tiles[i],
              [axis]: pos,
              isNew: false,
            });
            i++;
          }
          pos += step;
        }
      });

      return { tiles: newTiles, scoreIncrease };
    },
    []
  );
  return mergeTiles;
};
