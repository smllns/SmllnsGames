import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GridSizeSelector from './GridSizeSelector';
import GridColorPicker from './GridColorPicker';
import SnakeColorPicker from './SnakeColorPicker';
import FoodPicker from './FoodPicker';

interface GameSettingsProps {
  gridSize: number;
  setGridSize: (size: number) => void;
  gridColor: string;
  setGridColor: (color: string) => void;
  setGridBorderColor: (color: string) => void;
  snakeColor: string;
  setSnakeColor: (color: string) => void;
  foodEmoji: string;
  setFoodEmoji: (emoji: string) => void;
  setIsGameStarted: (param: boolean) => void;
  setShowSettings: (param: boolean) => void;
}

// GameSettings component provides settings for the Snake game
const GameSettings: React.FC<GameSettingsProps> = ({
  gridSize,
  setGridSize,
  gridColor,
  setGridColor,
  setGridBorderColor,
  snakeColor,
  setSnakeColor,
  foodEmoji,
  setFoodEmoji,
  setIsGameStarted,
  setShowSettings,
}) => {
  return (
    <Card className='absolute flex flex-col items-center justify-center zero:p-2 sm:p-6 bg-neutral-800 rounded-xl'>
      <CardHeader className='text-center'>
        <CardTitle className='zero:text-xl sm:text-2xl lg:text-3xl font-bold text-white'>
          🐍 Snake Game 🐍
        </CardTitle>
        <CardDescription className='text-md text-neutral-400'>
          Settings
        </CardDescription>
      </CardHeader>
      {/* Card content with various settings options */}
      <CardContent className='flex flex-col items-center'>
        {/* Grid size selection */}
        <p className='text-white text-xl font-bold mb-2'>GRID SIZE</p>
        <GridSizeSelector gridSize={gridSize} setGridSize={setGridSize} />

        {/* Grid color selection */}
        <p className='text-white text-xl font-bold mb-2'>GRID COLOR</p>
        <GridColorPicker
          gridColor={gridColor}
          setGridColor={setGridColor}
          setGridBorderColor={setGridBorderColor}
        />

        {/* Snake color selection */}
        <p className='text-white text-xl font-bold mb-2'>SNAKE COLOR</p>
        <SnakeColorPicker
          snakeColor={snakeColor}
          setSnakeColor={setSnakeColor}
        />

        {/* Food emoji selection */}
        <p className='text-white text-xl font-bold mb-2'>FOOD EMOJI</p>
        <FoodPicker foodEmoji={foodEmoji} setFoodEmoji={setFoodEmoji} />
      </CardContent>
      {/* Card footer with Start Game button */}
      <CardFooter className='w-full pt-2'>
        <Button
          className='w-full h-10 text-xl bg-pink-500 hover:bg-pink-600 font-bold'
          onClick={() => {
            setIsGameStarted(true); // Start the game when the button is clicked
            setShowSettings(false); // Hide the settings menu
          }}
        >
          Start Game
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GameSettings;
