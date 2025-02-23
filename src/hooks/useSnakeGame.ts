import { useState, useEffect, useCallback, useRef } from 'react';
import { useSnakeKeyboardControls } from './useSnakeKeyboardControls';
import { useSnakeLocalHighScore } from './useSnakeLocalHighScore';

interface Position {
  x: number;
  y: number;
}

// Custom hook for the snake game logic
export function useSnakeGame(gridSize: number, isGameStarted: boolean) {
  // Initial snake position and state setup
  const initialSnake = [
    { x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) },
    { x: Math.floor(gridSize / 2) - 1, y: Math.floor(gridSize / 2) },
    { x: Math.floor(gridSize / 2) - 2, y: Math.floor(gridSize / 2) },
  ];
  // State for snake, food, direction, game over flag, and score
  const [snake, setSnake] = useState<Position[]>(initialSnake);
  const [food, setFood] = useState<Position>({
    x: Math.floor(gridSize / 4),
    y: Math.floor(gridSize / 4),
  });
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>(
    'RIGHT'
  );
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Get high score from local storage and update function
  const { highScore, updateHighScore } = useSnakeLocalHighScore();

  // Reference for AudioContext used for playing sounds
  const audioContextRef = useRef<AudioContext | null>(null);

  // Detect if the device is mobile
  const isMobile = useRef<boolean>(false);
  useEffect(() => {
    isMobile.current = /Mobi|Android/i.test(window.navigator.userAgent);
  }, []);

  // Function to change snake's direction
  const changeDirection = (newDirection: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    setDirection(newDirection);
  };

  // Function to generate a new food position that is not overlapping with the snake
  const generateFood = useCallback(() => {
    let randomX: number, randomY: number;
    const prevFoodX = food.x;
    const prevFoodY = food.y;

    // Keep generating random positions until it doesn't overlap with the snake or the previous food position
    do {
      randomX = Math.floor(Math.random() * gridSize);
      randomY = Math.floor(Math.random() * gridSize);
    } while (
      snake.some((segment) => segment.x === randomX && segment.y === randomY) ||
      (randomX === prevFoodX && randomY === prevFoodY)
    );

    setFood({ x: randomX, y: randomY });
  }, [gridSize, snake, food]);

  // // Function to initialize the game state
  const initializeGame = useCallback(() => {
    setSnake(initialSnake); // assuming initialSnake is defined elsewhere
    setFood({ x: Math.floor(gridSize / 4), y: Math.floor(gridSize / 4) });
    setDirection('RIGHT');
    setScore(0);
    setIsGameOver(false);
  }, [gridSize]);

  // // Initialize the game when it starts
  useEffect(() => {
    if (!isGameStarted) return;
    initializeGame();
  }, [gridSize, isGameStarted, initializeGame]);

  // Function to reset the score to 0
  const zeroScore = () => {
    setScore(0);
  };

  // Function to reset the game state
  const resetGame = () => {
    initializeGame();
  };

  // Function to play the sound when the snake eats food
  const playEatSound = () => {
    // Skip sound playing if on mobile
    if (isMobile.current) return;

    if (!audioContextRef.current) {
      // Initialize AudioContext if it's not already created
      audioContextRef.current = new AudioContext();
    }

    const audio = new Audio('/snakeEat.mp3');
    const source = audioContextRef.current.createMediaElementSource(audio);
    source.connect(audioContextRef.current.destination);
    audio.play();
  };

  useEffect(() => {
    // If game is not started or game is over, don't proceed
    if (!isGameStarted || isGameOver) return;

    // Main game loop for moving the snake
    const moveSnake = () => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };

        // Update snake's head position based on the current direction
        switch (direction) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
        }

        // Check for collisions with walls or snake body
        const hasCollision =
          head.x < 0 ||
          head.y < 0 ||
          head.x >= gridSize ||
          head.y >= gridSize ||
          newSnake.some(
            (segment) => segment.x === head.x && segment.y === head.y
          );

        // End game if there's a collision
        if (hasCollision) {
          setIsGameOver(true);
          return prevSnake;
        }

        // Add the new head to the snake and remove the last segment
        newSnake.unshift(head);
        newSnake.pop();

        // Check if the snake has eaten food
        if (head.x === food.x && head.y === food.y) {
          generateFood();
          newSnake.push({ x: food.x, y: food.y });

          // Play sound if not on mobile
          playEatSound();

          // Update score and check if it's a new high score
          setScore((prevScore) => {
            let newScore = prevScore + 1;
            if (newScore - score > 1) {
              newScore = newScore - 1;
            }
            if (newScore > highScore) {
              updateHighScore(newScore);
            }
            return newScore;
          });
        }

        return newSnake;
      });
    };

    // Start the game interval for moving the snake
    const gameInterval = setInterval(moveSnake, 200);
    return () => clearInterval(gameInterval);
  }, [
    direction,
    food,
    isGameOver,
    gridSize,
    isGameStarted,
    generateFood,
    highScore,
    score,
    updateHighScore,
  ]);

  // Custom hook for controlling snake's direction using keyboard
  useSnakeKeyboardControls(setDirection, direction);

  return {
    snake,
    food,
    isGameOver,
    score,
    highScore,
    changeDirection,
    resetGame,
    zeroScore,
  };
}
