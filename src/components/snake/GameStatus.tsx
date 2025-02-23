import React, { useEffect, useRef } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { ColourfulText } from '../ui/colourful-text';

interface GameStatusProps {
  isGameOver: boolean;
  onRestart: () => void;
  onSettings: () => void;
}

const GameStatus: React.FC<GameStatusProps> = ({
  isGameOver,
  onRestart,
  onSettings,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null); // Reference to the audio element for playing game over sound

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 1; // Set the volume to max when game is over
    }
  }, [isGameOver]);

  return (
    // Render the game over screen if the game is over
    isGameOver && (
      <>
        {/* Audio element that plays the "Game Over" sound */}
        <audio ref={audioRef} autoPlay>
          <source src='/snakeGameOver.mp3' type='audio/mp3' />
          Your browser does not support the audio element.
        </audio>
        {/* Card container for the Game Over message and buttons */}
        <Card className='absolute flex flex-col items-center justify-center xxs:p-2 sm:p-6 bg-neutral-800 rounded-xl'>
          <CardHeader className='text-center'>
            <CardTitle className='text-3xl font-bold text-white'>
              <ColourfulText text='GAME OVER' />
            </CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col items-center xxs:p-0 sm:p-6'>
            <CardFooter className='w-full gap-4 pt-2 pb-[-8]'>
              {/* Button to open settings */}
              <Button
                onClick={onSettings}
                className='w-full text-xl bg-pink-500 hover:bg-pink-600 transition-all duration-300'
              >
                Settings
              </Button>
              {/* Button to restart the game */}
              <Button
                onClick={onRestart}
                className='w-full text-xl bg-pink-500 hover:bg-pink-600 transition-all duration-300'
              >
                Restart
              </Button>
            </CardFooter>
          </CardContent>
        </Card>
      </>
    )
  );
};

export default GameStatus;
