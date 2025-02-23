import { useSwipeable } from 'react-swipeable';

// Custom hook to handle swipe gestures for the snake game direction on mobile
export function useSnakeSwipe(
  changeDirection: (newDirection: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => void,
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
