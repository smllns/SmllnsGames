import {
  emptyBackgroundOptions,
  gridBackgroundOptions2048,
  tilesColorOptions,
  TileColorScheme,
  ColorType,
  ColorValue,
  ColorSelectionProps,
} from '@/lib/typesAndConstants';
import React, { useMemo } from 'react';

// A unified component for selecting colors for different game elements (grid, tiles, empty tiles).
const ColorSelection = <T extends ColorType>({
  whichColor,
  selectedValue,
  handleColorChange,
}: ColorSelectionProps<T>) => {
  const options = useMemo(() => {
    switch (whichColor) {
      case 'EmptyTile':
        return emptyBackgroundOptions as ColorValue<T>[];
      case 'GridColor':
        return gridBackgroundOptions2048 as ColorValue<T>[];
      case 'TileColor':
        return tilesColorOptions as ColorValue<T>[];
      default:
        throw new Error(`Unsupported color type: ${whichColor}`);
    }
  }, [whichColor]);

  const getBackgroundColor = useMemo(() => {
    // Retrieves the background color for a given scheme based on the color type.
    return (item: ColorValue<T>): string => {
      switch (whichColor) {
        case 'EmptyTile':
        case 'GridColor':
          return item as string;
        case 'TileColor':
          return (item as TileColorScheme).gridColors;
        default:
          throw new Error(`Unsupported color type: ${whichColor}`);
      }
    };
  }, [whichColor]);

  const getBorderColor = useMemo(() => {
    // Retrieves the border color for a given scheme based on the color type.
    return (item: ColorValue<T>): string => {
      switch (whichColor) {
        case 'EmptyTile':
        case 'GridColor':
          return item as string;
        case 'TileColor':
          return (item as TileColorScheme).emptyColors;
        default:
          throw new Error(`Unsupported color type: ${whichColor}`);
      }
    };
  }, [whichColor]);

  const isSelected = useMemo(() => {
    // Determines if a given item is the currently selected value, using deep comparison for TileColorScheme.
    return (item: ColorValue<T>): boolean => {
      const activeValue = selectedValue ?? options[0]; // Use first item if selectedValue is undefined

      switch (whichColor) {
        case 'EmptyTile':
        case 'GridColor':
          return item === (activeValue as string);
        case 'TileColor':
          const tileScheme = item as TileColorScheme;
          const activeTileScheme = activeValue as TileColorScheme;

          // Compare TileColorScheme objects by their content (e.g., gridColors and emptyColors)
          return (
            tileScheme.gridColors === activeTileScheme.gridColors &&
            tileScheme.emptyColors === activeTileScheme.emptyColors
          );
        default:
          throw new Error(`Unsupported color type: ${whichColor}`);
      }
    };
  }, [whichColor, selectedValue, options]);

  return (
    <div className='flex space-x-4 mb-6'>
      {options.map((scheme, index) => (
        <div
          key={index}
          className='zero:w-6 zero:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 cursor-pointer rounded-md transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-500'
          style={{
            backgroundColor: getBackgroundColor(scheme),
            border: isSelected(scheme)
              ? '2px solid #F472B6'
              : `2px solid ${getBorderColor(scheme)}`,
          }}
          onClick={() => handleColorChange(scheme)}
        ></div>
      ))}
    </div>
  );
};

export default ColorSelection;
