import { useState } from 'react';

// Custom hook to manage the snake game's local high score
export function useSnakeLocalHighScore() {
  // State to store the high score, initialized from localStorage if available
  const [highScore, setHighScore] = useState<number>(() => {
    // Try to get the saved high score from localStorage
    const savedHighScore = localStorage.getItem('highScore');
    // If a high score exists in localStorage, return it, otherwise return 0
    return savedHighScore ? parseInt(savedHighScore, 10) : 0;
  });

  // Function to update the high score and save it to localStorage
  const updateHighScore = (newScore: number) => {
    setHighScore(newScore);
    localStorage.setItem('highScore', newScore.toString()); // Save the new high score to localStorage
  };

  return { highScore, updateHighScore };
}
