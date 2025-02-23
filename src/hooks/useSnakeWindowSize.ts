import { useEffect } from 'react';

// Custom hook to handle window resize and determine if the screen is wide
interface UseSnakeWindowSizeProps {
  setIsWideScreen: (isWide: boolean) => void;
}

export function useSnakeWindowSize({
  setIsWideScreen,
}: UseSnakeWindowSizeProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return; // Ensure we are on the client-side

    // Function to check if the window width is greater than its height (wide screen)
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > window.innerHeight);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial check when the component mounts
    handleResize();

    // Cleanup: Remove event listener on component unmount or when dependencies change
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsWideScreen]);
}
