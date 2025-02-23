import React from 'react';

interface GridColorPickerProps {
  gridColor: string;
  setGridColor: (color: string) => void;
  setGridBorderColor: (color: string) => void;
}

// Array with color options for the grid and its border
const colorOptions = [
  { gridColors: '#A7C7E7', borderColors: '#6A8FA9' },
  { gridColors: '#A8D5BA', borderColors: '#6C8B72' },
  { gridColors: '#F5C6CB', borderColors: '#D59AA3' },
  { gridColors: '#F6E1B3', borderColors: '#D1B183' },
  { gridColors: '#FAD0C9', borderColors: '#D8A6A0' },
  { gridColors: '#D3B7E6', borderColors: '#a98bc3' },
];

// GridColorPicker component to allow the user to pick grid and border colors
const GridColorPicker: React.FC<GridColorPickerProps> = ({
  gridColor,
  setGridColor,
  setGridBorderColor,
}) => {
  return (
    <div className='flex space-x-4 mb-6'>
      {/* Map over color options to display color pickers */}
      {colorOptions.map(({ gridColors, borderColors }, index) => (
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
