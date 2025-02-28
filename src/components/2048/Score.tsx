import React from 'react';
import { ScoreProps } from '@/lib/typesAndConstants';

//component which displays current score and high score of the user
const Score: React.FC<ScoreProps> = ({
  handleUserInteraction,
  selectedEmptyTileColor,
  score,
  highScore,
}) => {
  return (
    <div
      className='absolute xxs:top-16 xs:top-4 xxs:left-1/2 xs:left-52 sm:left-1/2 -translate-x-1/2 z-10 flex gap-2'
      onClick={handleUserInteraction}
    >
      <div
        className='p-4 rounded-md w-20 h-20 flex flex-col items-center justify-center'
        style={{ background: selectedEmptyTileColor }}
      >
        <p className='text-sm text-neutral-200'>Score</p>
        <p className='text-lg font-bold text-white'>{score}</p>
      </div>
      <div
        className='p-4 rounded-md w-20 h-20 flex flex-col items-center justify-center'
        style={{ background: selectedEmptyTileColor }}
      >
        <p className='text-sm text-neutral-200'>Best</p>
        <p className='text-lg font-bold text-white'>{highScore}</p>
      </div>
    </div>
  );
};

export default Score;
