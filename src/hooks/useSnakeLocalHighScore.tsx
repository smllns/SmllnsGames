import { useState, useEffect } from 'react';

// Custom hook to manage the snake game's local high score
export function useSnakeLocalHighScore() {
  const [highScore, setHighScore] = useState<number>(0);

  useEffect(() => {
    // Only access localStorage in the browser
    const savedHighScore = localStorage.getItem('highScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10)); // Set the high score from localStorage
    }
  }, []); // Empty dependency array ensures this runs only once when the component is mounted

  // Function to update the high score and save it to localStorage
  const updateHighScore = (newScore: number) => {
    setHighScore(newScore);
    localStorage.setItem('highScore', newScore.toString()); // Save the new high score to localStorage
  };

  return { highScore, updateHighScore };
}
