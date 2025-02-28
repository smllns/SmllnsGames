import React from 'react';
import { motion } from 'framer-motion';
import { GameGridProps } from '@/lib/typesAndConstants';

//2048 grid component and tile animations
const GameGrid: React.FC<GameGridProps> = ({
  grid,
  selectedEmptyTileColor,
  tiles,
  selectedTileColorScheme,
  cellSize,
}) => {
  return (
    <div
      className='relative w-full h-full'
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(4, 1fr)',
        gap: '6px',
      }}
    >
      {/* Empty tiles background */}
      {grid.flat().map((_, index) => (
        <div
          key={index}
          className={`
      rounded-md `}
          style={{
            backgroundColor: selectedEmptyTileColor
              ? selectedEmptyTileColor
              : '#404040',
          }}
        />
      ))}

      {/* Animated tiles */}
      {tiles.map((tile) => (
        <motion.div
          key={tile.id}
          className={`absolute flex items-center justify-center rounded-md text-xl font-bold ${
            selectedTileColorScheme.tileColors[
              tile.value as keyof typeof selectedTileColorScheme.tileColors
            ] || 'bg-yellow-900 text-white'
          }`}
          initial={{
            x: tile.prevX * (cellSize + 6),
            y: tile.prevY * (cellSize + 6),
            scale: tile.isRandom ? 0.9 : 1,
          }}
          animate={{
            x: tile.x * (cellSize + 6),
            y: tile.y * (cellSize + 6),
            scale: tile.isNew ? [1, 0.95, 1] : tile.isRandom ? 1 : 1,
          }}
          transition={{
            duration: 0.2,
            ease: 'easeInOut',
            scale: {
              duration: tile.isNew ? 0.3 : tile.isRandom ? 0.2 : 0,
              ease: 'easeInOut',
              times: tile.isNew
                ? [0, 0.5, 1]
                : tile.isRandom
                ? [0, 1]
                : undefined,
            },
          }}
          style={{
            width: cellSize,
            height: cellSize,
            fontSize: 'calc(2vmin + 10px)',
            position: 'absolute',
            willChange: 'transform',
          }}
        >
          {tile.value}
        </motion.div>
      ))}
    </div>
  );
};

export default GameGrid;
