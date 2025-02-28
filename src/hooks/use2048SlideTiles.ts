import { Tile } from '@/lib/typesAndConstants';
import { useCallback } from 'react';

export const use2048SlideTiles = () => {
  const slide = useCallback(
    (tiles: Tile[], axis: 'x' | 'y', start: number, step: number): Tile[] => {
      const newTiles: Tile[] = [];
      const grouped = new Map<number, Tile[]>();

      // Group tiles by row (for x-axis) or column (for y-axis)
      tiles.forEach((tile) => {
        const key = axis === 'x' ? tile.y : tile.x;
        if (!grouped.has(key)) grouped.set(key, []);
        grouped.get(key)!.push({
          ...tile,
          [axis === 'x' ? 'prevX' : 'prevY']: tile[axis],
          isNew: false,
          isRandom: false,
        });
      });

      // Process each group separately
      grouped.forEach((tiles) => {
        // Sort tiles based on movement direction
        tiles.sort((a, b) =>
          step > 0 ? a[axis] - b[axis] : b[axis] - a[axis]
        );

        // Set target positions
        let pos = start;
        tiles.forEach((tile) => {
          const currentPos = tile[axis];
          const newPos = pos;
          const offset = step > 0 ? -0.1 : 0.1;
          const newPrevPos = currentPos + offset;

          newTiles.push({
            ...tile,
            [axis]: newPos,
            [axis === 'x' ? 'prevX' : 'prevY']: newPrevPos,
            isNew: false,
            isRandom: false,
          });
          pos += step;
        });
      });
      return newTiles;
    },
    []
  );
  return slide;
};
