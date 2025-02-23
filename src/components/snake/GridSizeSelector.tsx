import React from 'react';

interface GridSizeSelectorProps {
  gridSize: number;
  setGridSize: (size: number) => void;
}

const GridSizeSelector: React.FC<GridSizeSelectorProps> = ({
  gridSize,
  setGridSize,
}) => {
  return (
    <div className='flex border border-neutral-500 rounded-md overflow-hidden mb-6'>
      {/* Grid size button for 10x10 grid */}
      <div
        className={`w-20 h-12 cursor-pointer flex items-center justify-center ${
          gridSize === 10 ? 'bg-neutral-500' : 'bg-neutral-800'
        }`}
        onClick={() => setGridSize(10)} // Updates the grid size to 10 when clicked
      >
        <span className='text-center text-white font-semibold'>10x10</span>
      </div>
      {/* Grid size button for 20x20 grid */}
      <div
        className={`w-20 h-12 cursor-pointer flex items-center justify-center ${
          gridSize === 20 ? 'bg-neutral-500' : 'bg-neutral-800'
        }`}
        onClick={() => setGridSize(20)} // Updates the grid size to 20 when clicked
      >
        <span className='text-center text-white font-semibold'>20x20</span>
      </div>
    </div>
  );
};

export default GridSizeSelector;
