import React from 'react';
import {
  GridColorPickerProps,
  snakeGridColorOptions,
} from '@/lib/typesAndConstants';

// GridColorPicker component to allow the user to pick grid and border colors
const GridColorPicker: React.FC<GridColorPickerProps> = ({
  gridColor,
  setGridColor,
  setGridBorderColor,
}) => {
  return (
    <div className='flex space-x-4 mb-6'>
      {/* Map over color options to display color pickers */}
      {snakeGridColorOptions.map(({ gridColors, borderColors }, index) => (
        <div
          key={index}
          className='zero:w-6 zero:h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 cursor-pointer rounded-md transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-500'
          style={{
            backgroundColor: borderColors,
            border:
              gridColor === gridColors
                ? '2px solid #F472B6' // Highlight border if this is the selected grid color
                : `2px solid ${gridColors}`, // Otherwise, set the border to the current grid color
          }}
          onClick={() => {
            setGridColor(gridColors);
            setGridBorderColor(borderColors);
          }}
        ></div>
      ))}
    </div>
  );
};

export default GridColorPicker;
