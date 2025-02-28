import { useState, useEffect, useRef } from 'react';
import { useSnakeKeyboardControls } from './useSnakeKeyboardControls';
import { useLocalHighScore } from './useLocalHighScore';
import { Direction, Position } from '@/lib/typesAndConstants';
import { generateFood, initializeGame, playEatSound } from '@/lib/snakeUtils';

// Custom hook for the snake game logic
export function useSnakeGame(
  gridSize: number,
  isGameStarted: boolean,
  isMusicEnabled: boolean
) {
  // State for snake, food, direction, game over flag, and score
  const [snake, setSnake] = useState<Position[]>([]);
  const [food, setFood] = useState<Position>(initializeGame(gridSize).food);
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Get high score from local storage and update function
  const { highScore, updateHighScore } = useLocalHighScore('snakeHighScore');

  // Detect if the device is mobile
  const isMobile = useRef<boolean>(false);
  useEffect(() => {
    isMobile.current = /Mobi|Android/i.test(window.navigator.userAgent);
  }, []);

  // Function to change snake's direction
  const changeDirection = (newDirection: Direction) => {
    setDirection(newDirection);
  };

  // Function to reset the score to 0
  const zeroScore = () => {
    setScore(0);
  };

  // Function to reset the game state
  const resetGame = () => {
    const {
      snake: initialSnake,
      food: initialFood,
      direction: initialDirection,
      score: initialScore,
      isGameOver: initialIsGameOver,
    } = initializeGame(gridSize);
    setSnake(initialSnake);
    setFood(initialFood);
    setDirection(initialDirection);
    setScore(initialScore);
    setIsGameOver(initialIsGameOver);
  };

  // Initialize the game when it starts
  useEffect(() => {
    if (!isGameStarted) return;
    const {
      snake: initialSnake,
      food: initialFood,
      direction: initialDirection,
      score: initialScore,
      isGameOver: initialIsGameOver,
    } = initializeGame(gridSize);
    setSnake(initialSnake);
    setFood(initialFood);
    setDirection(initialDirection);
    setScore(initialScore);
    setIsGameOver(initialIsGameOver);
  }, [gridSize, isGameStarted]);

  // Main game loop for moving the snake
  useEffect(() => {
    if (!isGameStarted || isGameOver) return;

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

        if (hasCollision) {
          setIsGameOver(true);
          return prevSnake;
        }

        // Add the new head to the snake and remove the last segment
        newSnake.unshift(head);
        newSnake.pop();

        // Check if the snake has eaten food
        if (head.x === food.x && head.y === food.y) {
          setFood(generateFood(gridSize, newSnake, food));
          newSnake.push({ x: food.x, y: food.y });

          // Play sound if not on mobile
          playEatSound('/snakeEat.mp3', isMusicEnabled, isMobile.current);

          // Update score and check if it's a new high score
          setScore((prevScore) => {
            const newScore = prevScore + 1;
            if (newScore > highScore) {
              updateHighScore(newScore);
            }
            return newScore;
          });
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, 200);
    return () => clearInterval(gameInterval);
  }, [
    direction,
    food,
    isGameOver,
    gridSize,
    isGameStarted,
    isMusicEnabled,
    highScore,
    updateHighScore,
  ]);

  // Custom hook for controlling snake's direction using keyboard
  useSnakeKeyboardControls(setDirection, direction);

  return {
    snake,
    food,
    isGameOver,
    setIsGameOver,
    score,
    highScore,
    changeDirection,
    resetGame,
    zeroScore,
  };
}
