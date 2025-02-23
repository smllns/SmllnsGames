import { useEffect, useState } from 'react';

export function useSnakeEmojis(foodEmoji: string) {
  // State to hold the emojis and their properties
  const [emojis, setEmojis] = useState<
    {
      emoji: string;
      position: { x: number; y: number };
      size: number;
      rotation: number;
    }[]
  >([]);
  const [emojiCount] = useState(35); // Number of emojis to display on screen

  useEffect(() => {
    // Function to generate random position for emojis within the grid
    const generateRandomPosition = (gridSize: number) => ({
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    });

    // Generate an array of emojis with random properties (position, size, and rotation)
    const newEmojis = Array.from({ length: emojiCount }).map(() => ({
      emoji: foodEmoji,
      position: generateRandomPosition(10),
      size: Math.random() * (4 - 1) + 1,
      rotation: Math.floor(Math.random() * 360),
    }));

    setEmojis(newEmojis);
  }, [foodEmoji, emojiCount]);

  return emojis;
}
