import React from 'react';
import { Button } from './ui/button';

interface BackButtonProps {
  handleUserInteraction: () => void;
}
const BackButton: React.FC<BackButtonProps> = ({ handleUserInteraction }) => {
  return (
    <Button
      className='absolute z-10 left-4 top-4 bg-pink-500 hover:bg-pink-600 font-bold py-2 px-4 text-xl text-white transition-all duration-300'
      onClick={() => (window.location.href = '/')}
      onMouseDown={handleUserInteraction}
    >
      Back
    </Button>
  );
};

export default BackButton;
