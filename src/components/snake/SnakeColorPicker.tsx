import React from 'react';

interface SnakeColorPickerProps {
  snakeColor: string;
  setSnakeColor: (color: string) => void;
}

const snakeColorOptions = [
  '#4B5D67',
  '#3A4B42',
  '#C18D8C',
  '#C2A269',
  '#B79B93',
  '#8C6D9B',
];

const SnakeColorPicker: React.FC<SnakeColorPickerProps> = ({
  snakeColor,
  setSnakeColor,
}) => {
  return (
    <div className='flex space-x-4 mb-6 flex-wrap justify-center'>
      {/* Loop through available snake color options */}
      {snakeColorOptions.map((color, index) => (
        <div
          key={index}
          className='zero:w-6 zero:h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 cursor-pointer rounded-md transition-all duration-300 ease-in-out transform hover:scale-110'
          style={{
            backgroundColor: color, // Set the background color of the color option
          }}
          onClick={() => setSnakeColor(color)} // Update the snake color when clicked
        >
          <div className='w-full h-full rounded-md transition-all duration-300 ease-in-out'>
            <div
              className={`w-full h-full rounded-md ${
                color === snakeColor ? 'border-2 border-pink-500' : '' // Highlight selected color with a border
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SnakeColorPicker;
