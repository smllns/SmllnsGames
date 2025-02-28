import { GRID_SIZE, Tile } from '@/lib/typesAndConstants';

// Utility function to check if the game is over by verifying if the grid is full and no moves are possible.
export const checkGameOver = (tiles: Tile[]): boolean => {
  const gridFull = tiles.length === GRID_SIZE * GRID_SIZE;
  if (!gridFull) return false;
  return tiles.every((tile) => {
    const neighbors = [
      tiles.find((t) => t.x === tile.x + 1 && t.y === tile.y),
      tiles.find((t) => t.x === tile.x - 1 && t.y === tile.y),
      tiles.find((t) => t.x === tile.x && t.y === tile.y + 1),
      tiles.find((t) => t.x === tile.x && t.y === tile.y - 1),
    ];
    return !neighbors.some((n) => n && n.value === tile.value);
  });
};

// Utility function to find an empty cell in the grid for adding a new tile.
const getEmptyCell = (tiles: Tile[]): { x: number; y: number } | null => {
  const emptyCells: { x: number; y: number }[] = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (!tiles.some((tile) => tile.x === x && tile.y === y)) {
        emptyCells.push({ x, y });
      }
    }
  }
  return emptyCells.length > 0
    ? emptyCells[Math.floor(Math.random() * emptyCells.length)]
    : null;
};

// Initializes the game with two random tiles (2 or 4).
export const initializeTiles = (): Tile[] => {
  const tiles: Tile[] = [];
  let id = 0;

  const addTile = () => {
    const emptyCell = getEmptyCell(tiles);
    if (emptyCell) {
      const { x, y } = emptyCell;
      tiles.push({
        id: id++,
        value: Math.random() < 0.9 ? 2 : 4,
        x,
        y,
        prevX: x,
        prevY: y,
      });
    }
  };

  addTile();
  addTile();
  return tiles;
};

// Adds a random tile (2 or 4) to an empty cell in the grid.
export const addRandomTile = (tiles: Tile[]): Tile[] => {
  const emptyCell = getEmptyCell(tiles);
  if (!emptyCell) return tiles;

  const { x, y } = emptyCell;
  return [
    ...tiles,
    {
      id: Date.now() + Math.random(),
      value: Math.random() < 0.9 ? 2 : 4,
      x,
      y,
      prevX: x,
      prevY: y,
      isNew: false,
      isRandom: true,
    },
  ];
};
