import React from 'react';
import { ColourfulText } from '@/components/ui/colourful-text';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import { GameOverProps } from '@/lib/typesAndConstants';

const GameOver: React.FC<GameOverProps> = ({ onRestart, onSettings }) => {
  return (
    <Card className='absolute flex flex-col items-center justify-center xxs:p-2 sm:p-6 bg-zinc-900 rounded-xl'>
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
  );
};

export default GameOver;
