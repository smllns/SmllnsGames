import { Direction, Position } from '@/lib/typesAndConstants';

// Generates a new food position that does not overlap with the snake or the previous food position.
export const generateFood = (
  gridSize: number,
  snake: Position[],
  prevFood: Position
): Position => {
  let randomX: number, randomY: number;

  // Keep generating random positions until it doesn't overlap with the snake or the previous food position
  do {
    randomX = Math.floor(Math.random() * gridSize);
    randomY = Math.floor(Math.random() * gridSize);
  } while (
    snake.some((segment) => segment.x === randomX && segment.y === randomY) ||
    (randomX === prevFood.x && randomY === prevFood.y)
  );

  return { x: randomX, y: randomY };
};

// Initializes the Snake game state with default positions and settings.
export const initializeGame = (
  gridSize: number
): {
  snake: Position[];
  food: Position;
  direction: Direction;
  score: number;
  isGameOver: boolean;
} => {
  const initialSnake = [
    { x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) },
    { x: Math.floor(gridSize / 2) - 1, y: Math.floor(gridSize / 2) },
    { x: Math.floor(gridSize / 2) - 2, y: Math.floor(gridSize / 2) },
  ];
  return {
    snake: initialSnake,
    food: { x: Math.floor(gridSize / 4), y: Math.floor(gridSize / 4) },
    direction: 'RIGHT' as Direction,
    score: 0,
    isGameOver: false,
  };
};

// Plays the sound when the snake eats food, if music is enabled and not on mobile devices.
export const playEatSound = (
  src: string,
  isMusicEnabled: boolean,
  isMobile: boolean
): void => {
  if (!isMusicEnabled || isMobile) return;

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const audio = new Audio(src);
  const source = audioContext.createMediaElementSource(audio);
  source.connect(audioContext.destination);
  audio.play().catch((error) => {
    console.error(`Error playing eat sound from ${src}:`, error);
    alert(
      `Failed to play eat sound. Please check the file '${src}' or try again.`
    );
  });
};
