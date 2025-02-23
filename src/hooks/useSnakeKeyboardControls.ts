import { useEffect, useRef } from 'react';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

// Custom hook to handle keyboard controls for the snake game
export function useSnakeKeyboardControls(
  setDirection: (dir: Direction) => void,
  direction: Direction
) {
  // Ref to store the time of the last key press
  const lastKeyPressTime = useRef(0);
  // Minimum time (in milliseconds) between handling key presses
  const keyPressDelay = 200;

  useEffect(() => {
    if (typeof window === 'undefined') return; // Ensure we are on the client-side

    // Event handler for key presses
    const handleKeyPress = (e: KeyboardEvent) => {
      // Prevent page scrolling when arrow keys are pressed
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }

      // Get the current time
      const now = Date.now();

      // If the key press happened too soon after the last one, ignore it
      if (now - lastKeyPressTime.current < keyPressDelay) {
        return;
      }

      // Change direction based on the key press, but not in the opposite direction
      if (e.key === 'ArrowUp' && direction !== 'DOWN') {
        setDirection('UP');
        lastKeyPressTime.current = now; // Update last key press time
      }
      if (e.key === 'ArrowDown' && direction !== 'UP') {
        setDirection('DOWN');
        lastKeyPressTime.current = now;
      }
      if (e.key === 'ArrowLeft' && direction !== 'RIGHT') {
        setDirection('LEFT');
        lastKeyPressTime.current = now;
      }
      if (e.key === 'ArrowRight' && direction !== 'LEFT') {
        setDirection('RIGHT');
        lastKeyPressTime.current = now;
      }
    };

    // Add the event listener for keydown events
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup function to remove the event listener when the component unmounts
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, setDirection]);
}
