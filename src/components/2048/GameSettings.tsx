import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { GameSettingsProps } from '@/lib/typesAndConstants';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import ColorSelection from './ColorSelection';

// The GameSettings component allows the user to configure various game settings like tile colors, grid colors, and music
const GameSettings: React.FC<GameSettingsProps> = ({
  selectedTileColorScheme,
  handleTileColorChange,
  handleStartGame,
  isGamePaused,
  selectedGridColor,
  handleGridColorChange,
  selectedEmptyTileColor,
  handleEmptyTilesChange,
  isMusicEnabled,
  setIsMusicEnabled,
}) => {
  return (
    <Card className='flex flex-col items-center justify-center w-[90%] max-w-md p-6 bg-zinc-900 rounded-xl'>
      <CardHeader className='text-center'>
        <CardTitle className='text-2xl font-bold text-white'>
          🎲 2048 Game 🎲
        </CardTitle>
        <CardDescription className='text-md text-neutral-400'>
          Settings
        </CardDescription>
      </CardHeader>

      {/* Card Content with settings controls */}
      <CardContent className='flex flex-col items-center w-full'>
        {/* Music toggle switch */}
        <div className='pt-0 flex flex-row gap-4 items-center mb-2'>
          <Label className='text-white text-xl font-bold ' htmlFor='2048Music'>
            MUSIC
          </Label>
          <Switch
            id='2048Music'
            gridColor={selectedEmptyTileColor}
            isChecked={isMusicEnabled}
            onCheckedChange={(checked) => setIsMusicEnabled(checked as boolean)}
          />
        </div>

        {/* Grid color selection */}
        <p className='text-white text-xl font-bold mb-2'>GRID COLOR</p>
        <ColorSelection
          whichColor='GridColor'
          selectedValue={selectedGridColor}
          handleColorChange={handleGridColorChange}
        />
        {/* Tile color selection */}
        <p className='text-white text-xl font-bold mb-2'>TILES COLORS</p>
        <ColorSelection
          whichColor='TileColor'
          selectedValue={selectedTileColorScheme}
          handleColorChange={handleTileColorChange}
        />
        {/* Empty tile color selection */}
        <p className='text-white text-xl font-bold mb-2'>EMPTY TILES COLOR</p>
        <ColorSelection
          whichColor='EmptyTile'
          selectedValue={selectedEmptyTileColor}
          handleColorChange={handleEmptyTilesChange}
        />
      </CardContent>

      {/* Footer with Start/Resume Game button */}
      <CardFooter className='w-full'>
        <Button
          className='w-full h-10 text-xl bg-pink-500 hover:bg-pink-600 font-bold'
          onClick={handleStartGame}
        >
          {isGamePaused ? 'Resume Game' : 'Start Game'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GameSettings;
