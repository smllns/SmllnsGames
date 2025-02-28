export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export interface Position {
  x: number;
  y: number;
}
export interface FloatingEmojisProps {
  emojis: {
    emoji: string;
    position: { x: number; y: number };
    size: number;
    rotation: number;
  }[];
}
export interface FoodPickerProps {
  foodEmoji: string;
  setFoodEmoji: (emoji: string) => void;
}
export interface GridCellsProps {
  gridSize: number;
  snake: { x: number; y: number }[];
  food: { x: number; y: number };
  gridBorderColor: string;
  snakeColor: string;
  foodEmoji: string;
}
export interface GridColorPickerProps {
  gridColor: string;
  setGridColor: (color: string) => void;
  setGridBorderColor: (color: string) => void;
}
export interface GridSizeSelectorProps {
  gridSize: number;
  setGridSize: (size: number) => void;
}
export interface SnakeColorPickerProps {
  snakeColor: string;
  setSnakeColor: (color: string) => void;
}
export interface GameOverProps {
  onRestart: () => void;
  onSettings: () => void;
}
export interface UseSnakeWindowSizeProps {
  setIsWideScreen: (isWide: boolean) => void;
}

export interface Tile {
  id: number;
  value: number;
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  isNew?: boolean;
  isRandom?: boolean;
}
export interface UseKeydownParams {
  isActive: boolean;
  gameWon: boolean;
  pendingMove: string | null;
  gameOver: boolean;
  isProcessing: boolean;
  lastMoveTime: number;
  setPendingMove: (move: Direction | null) => void;
  setLastMoveTime: (time: number) => void;
}
export interface MergeResult {
  tiles: Tile[];
  scoreIncrease: number;
}
export type TileColorScheme = {
  gridColors: string;
  emptyColors: string;
  tileColors: {
    2: string;
    4: string;
    8: string;
    16: string;
    32: string;
    64: string;
    128: string;
    256: string;
    512: string;
    1024: string;
    2048: string;
    4096: string;
    8192: string;
    16384: string;
    32768: string;
    65536: string;
  };
};
export interface AudioOptions {
  src: string;
  loop?: boolean;
  volume?: number;
}
export interface GameGridProps {
  grid: (number | '')[][];
  selectedEmptyTileColor: string;
  tiles: Tile[];
  selectedTileColorScheme: TileColorScheme;
  cellSize: number;
  onTileColorChange?: (tileScheme: TileColorScheme) => void; // Optional prop for tile color changes
  onGridColorChange?: (color: string) => void; // Optional prop for grid color changes
  onEmptyTilesChange?: (color: string) => void; // Optional prop for empty tile color changes
}
export type GameSettingsProps = {
  selectedTileColorScheme: TileColorScheme;
  handleTileColorChange: (scheme: TileColorScheme) => void;
  handleStartGame: () => void;
  isGamePaused: boolean;
  selectedGridColor: string;
  handleGridColorChange: (color: string) => void;
  selectedEmptyTileColor: string;
  handleEmptyTilesChange: (color: string) => void;
  isMusicEnabled: boolean;
  setIsMusicEnabled: (enabled: boolean) => void;
};
export interface GameWonProps {
  onRestart: () => void;
  onContinue: () => void;
  isMusicEnabled: boolean;
}
export interface ScoreProps {
  handleUserInteraction: () => void;
  selectedEmptyTileColor: string;
  score: number;
  highScore: number;
}
export type ColorType = 'EmptyTile' | 'GridColor' | 'TileColor';
export type ColorValueType = {
  EmptyTile: string;
  GridColor: string;
  TileColor: TileColorScheme;
};
export type ColorValue<T extends ColorType> = ColorValueType[T];
export interface ColorSelectionProps<T extends ColorType> {
  whichColor: T;
  selectedValue: ColorValue<T>;
  handleColorChange: (value: ColorValue<T>) => void;
}

export const foodOptions = ['🍏', '🍓', '🍌', '🥑', '🍒', '🥝'];
export const snakeGridColorOptions = [
  { gridColors: '#A7C7E7', borderColors: '#6A8FA9' },
  { gridColors: '#A8D5BA', borderColors: '#6C8B72' },
  { gridColors: '#F5C6CB', borderColors: '#D59AA3' },
  { gridColors: '#F6E1B3', borderColors: '#D1B183' },
  { gridColors: '#FAD0C9', borderColors: '#D8A6A0' },
  { gridColors: '#D3B7E6', borderColors: '#a98bc3' },
];
export const snakeColorOptions = [
  '#4B5D67',
  '#3A4B42',
  '#C18D8C',
  '#C2A269',
  '#B79B93',
  '#8C6D9B',
];

export const tileNumbers = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
export const defaultTiles: TileColorScheme = {
  gridColors: '#A7C7E7',
  emptyColors: '#6A8FA9',
  tileColors: {
    2: 'bg-sky-100 text-gray-800',
    4: 'bg-sky-200 text-gray-800',
    8: 'bg-sky-300 text-gray-800',
    16: 'bg-sky-400 text-gray-800',
    32: 'bg-sky-500 text-white',
    64: 'bg-sky-600 text-white',
    128: 'bg-cyan-300 text-gray-800',
    256: 'bg-cyan-400 text-gray-800',
    512: 'bg-cyan-500 text-white',
    1024: 'bg-cyan-600 text-white',
    2048: 'bg-cyan-700 text-white',
    4096: 'bg-cyan-800 text-white',
    8192: 'bg-teal-900 text-white',
    16384: 'bg-blue-900 text-white',
    32768: 'bg-blue-950 text-white',
    65536: 'bg-black text-white',
  },
};
export const GRID_SIZE = 4;
export const emptyBackgroundOptions: string[] = [
  '#6A8FA9',
  '#6C8B72',
  '#D59AA3',
  '#D1B183',
  '#D8A6A0',
  '#A98BC3',
  '#404040',
];
export const gridBackgroundOptions2048: string[] = [
  '#A7C7E7',
  '#A8D5BA',
  '#F5C6CB',
  '#F6E1B3',
  '#FAD0C9',
  '#D3B7E6',
  '#2D2D2D',
];
export const tilesColorOptions: TileColorScheme[] = [
  // Scheme 1: Blue
  {
    gridColors: '#A7C7E7',
    emptyColors: '#6A8FA9',
    tileColors: {
      2: 'bg-sky-100 text-gray-800',
      4: 'bg-sky-200 text-gray-800',
      8: 'bg-sky-300 text-gray-800',
      16: 'bg-sky-400 text-gray-800',
      32: 'bg-sky-500 text-white',
      64: 'bg-sky-600 text-white',
      128: 'bg-cyan-300 text-gray-800',
      256: 'bg-cyan-400 text-gray-800',
      512: 'bg-cyan-500 text-white',
      1024: 'bg-cyan-600 text-white',
      2048: 'bg-cyan-700 text-white',
      4096: 'bg-cyan-800 text-white',
      8192: 'bg-teal-900 text-white',
      16384: 'bg-blue-900 text-white',
      32768: 'bg-blue-950 text-white',
      65536: 'bg-black text-white',
    },
  },
  // Scheme 2: Green
  {
    gridColors: '#A8D5BA',
    emptyColors: '#6C8B72',
    tileColors: {
      2: 'bg-emerald-100 text-gray-800',
      4: 'bg-emerald-200 text-gray-800',
      8: 'bg-emerald-300 text-gray-800',
      16: 'bg-emerald-400 text-gray-800',
      32: 'bg-emerald-500 text-white',
      64: 'bg-emerald-600 text-white',
      128: 'bg-lime-300 text-gray-800',
      256: 'bg-lime-400 text-gray-800',
      512: 'bg-lime-500 text-white',
      1024: 'bg-lime-600 text-white',
      2048: 'bg-lime-700 text-white',
      4096: 'bg-lime-800 text-white',
      8192: 'bg-green-900 text-white',
      16384: 'bg-emerald-900 text-white',
      32768: 'bg-teal-950 text-white',
      65536: 'bg-black text-white',
    },
  },
  // Scheme 3: Pink
  {
    gridColors: '#F5C6CB',
    emptyColors: '#D59AA3',
    tileColors: {
      2: 'bg-pink-100 text-gray-800',
      4: 'bg-pink-200 text-gray-800',
      8: 'bg-pink-300 text-gray-800',
      16: 'bg-pink-400 text-gray-800',
      32: 'bg-pink-500 text-white',
      64: 'bg-pink-600 text-white',
      128: 'bg-rose-300 text-gray-800',
      256: 'bg-rose-400 text-gray-800',
      512: 'bg-rose-500 text-white',
      1024: 'bg-rose-600 text-white',
      2048: 'bg-rose-700 text-white',
      4096: 'bg-rose-800 text-white',
      8192: 'bg-red-900 text-white',
      16384: 'bg-pink-900 text-white',
      32768: 'bg-rose-950 text-white',
      65536: 'bg-black text-white',
    },
  },
  // Scheme 4: Beige
  {
    gridColors: '#F6E1B3',
    emptyColors: '#D1B183',
    tileColors: {
      2: 'bg-amber-100 text-gray-800',
      4: 'bg-amber-200 text-gray-800',
      8: 'bg-amber-300 text-gray-800',
      16: 'bg-amber-400 text-gray-800',
      32: 'bg-amber-500 text-white',
      64: 'bg-amber-600 text-white',
      128: 'bg-yellow-300 text-gray-800',
      256: 'bg-yellow-400 text-gray-800',
      512: 'bg-yellow-500 text-white',
      1024: 'bg-yellow-600 text-white',
      2048: 'bg-yellow-700 text-white',
      4096: 'bg-yellow-800 text-white',
      8192: 'bg-amber-900 text-white',
      16384: 'bg-orange-900 text-white',
      32768: 'bg-yellow-950 text-white',
      65536: 'bg-black text-white',
    },
  },
  // Scheme 5: Peach
  {
    gridColors: '#FAD0C9',
    emptyColors: '#D8A6A0',
    tileColors: {
      2: 'bg-red-100 text-gray-800',
      4: 'bg-red-200 text-gray-800',
      8: 'bg-red-300 text-gray-800',
      16: 'bg-red-400 text-gray-800',
      32: 'bg-red-500 text-white',
      64: 'bg-red-600 text-white',
      128: 'bg-orange-300 text-gray-800',
      256: 'bg-orange-400 text-gray-800',
      512: 'bg-orange-500 text-white',
      1024: 'bg-orange-600 text-white',
      2048: 'bg-orange-700 text-white',
      4096: 'bg-orange-800 text-white',
      8192: 'bg-red-900 text-white',
      16384: 'bg-orange-900 text-white',
      32768: 'bg-red-950 text-white',
      65536: 'bg-black text-white',
    },
  },
  // Scheme 6: Lilac
  {
    gridColors: '#D3B7E6',
    emptyColors: '#A98BC3',
    tileColors: {
      2: 'bg-purple-100 text-gray-800',
      4: 'bg-purple-200 text-gray-800',
      8: 'bg-purple-300 text-gray-800',
      16: 'bg-purple-400 text-gray-800',
      32: 'bg-purple-500 text-white',
      64: 'bg-purple-600 text-white',
      128: 'bg-indigo-300 text-gray-800',
      256: 'bg-indigo-400 text-gray-800',
      512: 'bg-indigo-500 text-white',
      1024: 'bg-indigo-600 text-white',
      2048: 'bg-indigo-700 text-white',
      4096: 'bg-indigo-800 text-white',
      8192: 'bg-purple-900 text-white',
      16384: 'bg-violet-900 text-white',
      32768: 'bg-indigo-950 text-white',
      65536: 'bg-black text-white',
    },
  },
  {
    gridColors: '#2D2D2D',
    emptyColors: '#404040',
    tileColors: {
      2: 'bg-gray-700 text-white',
      4: 'bg-gray-600 text-white',
      8: 'bg-gray-500 text-white',
      16: 'bg-gray-400 text-white',
      32: 'bg-gray-300 text-gray-800',
      64: 'bg-gray-200 text-gray-800',
      128: 'bg-neutral-300 text-gray-800',
      256: 'bg-neutral-400 text-gray-800',
      512: 'bg-neutral-500 text-gray-800',
      1024: 'bg-neutral-600 text-white',
      2048: 'bg-neutral-700 text-white',
      4096: 'bg-neutral-800 text-white',
      8192: 'bg-gray-900 text-white',
      16384: 'bg-neutral-900 text-white',
      32768: 'bg-gray-950 text-white',
      65536: 'bg-black text-white',
    },
  },
];
