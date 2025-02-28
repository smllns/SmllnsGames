import { Direction } from '@/lib/typesAndConstants';
import { useSwipeable } from 'react-swipeable';

// Custom hook to handle swipe gestures for games directions on mobile
export function useSwipe(
  changeDirection: (newDirection: Direction) => void,
  isGameStarted: boolean
) {
  return useSwipeable({
    onSwipedUp: () => isGameStarted && changeDirection('UP'),
    onSwipedDown: () => isGameStarted && changeDirection('DOWN'),
    onSwipedLeft: () => isGameStarted && changeDirection('LEFT'),
    onSwipedRight: () => isGameStarted && changeDirection('RIGHT'),

    // Prevent the page from scrolling while swiping
    preventScrollOnSwipe: true,

    // Enable mouse tracking to simulate swipe with mouse events
    trackMouse: true,
  });
}
