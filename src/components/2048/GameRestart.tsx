import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { VscDebugRestart } from 'react-icons/vsc';
import { Button } from '../ui/button';
interface RestartButtonProps {
  handleRestartGame: () => void;
}

//Dialog component for restarting the 2048 game
const GameRestart: React.FC<RestartButtonProps> = ({ handleRestartGame }) => {
  return (
    <div className='absolute  flex z-40 top-4 right-32 bg-pink-500 hover:bg-pink-600 font-bold  p-2 text-xl rounded-md transition-all duration-300'>
      <Dialog>
        <DialogTrigger className='focus:outline-none'>
          <VscDebugRestart size={20} color='white' />
        </DialogTrigger>
        <DialogContent className='w-[90%] max-w-xl '>
          <DialogHeader>
            <DialogTitle>New Game</DialogTitle>
            <DialogDescription>
              Are you sure you want to start a new game? All progress will be
              lost.
            </DialogDescription>
          </DialogHeader>
          <DialogClose asChild>
            <Button
              className=' z-40  bg-pink-500 hover:bg-pink-600 font-bold py-2 px-4 text-xl text-white transition-all duration-300'
              onClick={handleRestartGame}
            >
              Start New Game
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button className=' z-40  bg-pink-500 hover:bg-pink-600 font-bold py-2 px-4 text-xl text-white transition-all duration-300'>
              Cancel
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GameRestart;
