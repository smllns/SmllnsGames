import React, { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { ColourfulText } from '../ui/colourful-text';
import { Button } from '../ui/button';
import { GameWonProps } from '@/lib/typesAndConstants';

// Component which is shown when user gets a 2048 tile in game

const GameWon: React.FC<GameWonProps> = ({
  onRestart,
  onContinue,
  isMusicEnabled,
}) => {
  const [confettiDimensions, setConfettiDimensions] = useState({
    width: 0,
    height: 0,
  });

  // Confetti parameters
  useEffect(() => {
    const updateDimensions = () => {
      setConfettiDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Winning music controller
  useEffect(() => {
    if (
      isMusicEnabled &&
      typeof window !== 'undefined' &&
      !/Mobi|Android/i.test(navigator.userAgent)
    ) {
      const winSound = new Audio('/2048win.mp3');
      winSound.play();
    }
  }, [isMusicEnabled]);

  return (
    <>
      {/* Confetti effect */}
      <ReactConfetti
        width={confettiDimensions.width}
        height={confettiDimensions.height}
        numberOfPieces={500}
        recycle={true}
        gravity={0.1}
        tweenDuration={5000}
        className='absolute top-0 left-0 z-0'
      />
      <Card className='absolute flex flex-col items-center justify-center xxs:p-2 sm:p-6 bg-zinc-900 rounded-xl z-10'>
        <CardHeader className='text-center'>
          <CardTitle className='text-3xl font-bold text-white'>
            <ColourfulText text='YOU WON' />
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col items-center xxs:p-0 sm:p-6'>
          <CardFooter className='w-full gap-4 pt-2 pb-[-8]'>
            <Button
              onClick={onContinue}
              className='w-full text-xl bg-pink-500 hover:bg-pink-600 transition-all duration-300'
            >
              Continue
            </Button>
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
  );
};

export default GameWon;
