import { useEffect } from 'react';
import { Direction, UseKeydownParams } from '@/lib/typesAndConstants';

// Custom hook to handle keyboard input for 2048 movement
export const use2048Keydown = ({
  isActive,
  gameWon,
  pendingMove,
  gameOver,
  isProcessing,
  lastMoveTime,
  setPendingMove,
  setLastMoveTime,
}: UseKeydownParams) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // Ignore keypresses if the game is inactive, won, over, already processing a move, or has a pending move
    if (!isActive || gameWon || pendingMove || gameOver || isProcessing) return;

    const currentTime = Date.now();
    // Prevent rapid consecutive moves (enforce a 300ms delay)
    if (currentTime - lastMoveTime < 300) return;

    let direction: Direction | null = null;
    switch (e.key) {
      case 'ArrowUp':
        direction = 'UP';
        break;
      case 'ArrowDown':
        direction = 'DOWN';
        break;
      case 'ArrowLeft':
        direction = 'LEFT';
        break;
      case 'ArrowRight':
        direction = 'RIGHT';
        break;
    }

    if (direction) {
      setPendingMove(direction);
      setLastMoveTime(currentTime);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, gameWon, gameOver, pendingMove, isProcessing, lastMoveTime]);
};
