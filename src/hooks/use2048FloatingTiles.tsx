import { useState, useEffect } from 'react';
import { tileNumbers } from '@/lib/typesAndConstants';

// Custom hook to generate floating 2048 tiles as a background effect
export const use2048FloatingTiles = (tileColors: Record<number, string>) => {
  const [floatingTiles, setFloatingTiles] = useState<React.ReactNode[]>([]);
  useEffect(() => {
    // Generate an array of 30 floating tiles
    const tiles = Array.from({ length: 30 }, (_, index) => {
      // Select a random tile number from the predefined list
      const randomNum =
        tileNumbers[Math.floor(Math.random() * tileNumbers.length)];

      // Generate random position, delay, and size for animation effects
      const randomX = Math.random() * 100;
      const randomY = Math.random() * 100;
      const randomDelay = Math.random() * 3;
      const randomSize = Math.random() * (3 - 1.2) + 1.2;

      // Get the tile color from the provided mapping or use a default fallback
      const tileClass = tileColors[randomNum] || 'bg-gray-500 text-white';

      return (
        <div
          key={index}
          className={`absolute flex items-center justify-center rounded-md font-bold z-5 ${tileClass}`}
          style={{
            left: `${randomX}%`,
            top: `${randomY}%`,
            width: `${randomSize}rem`,
            height: `${randomSize}rem`,
            animation: `floating 5s ease-in-out ${randomDelay}s infinite alternate`,
            fontSize: `${randomSize / 2.5}rem`,
          }}
        >
          {randomNum}
        </div>
      );
    });

    setFloatingTiles(tiles);
  }, [tileColors]);

  return floatingTiles;
};
