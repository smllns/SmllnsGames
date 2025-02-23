import React from 'react';

interface FoodPickerProps {
  foodEmoji: string;
  setFoodEmoji: (emoji: string) => void;
}

// Array of food emojis for the food picker options
const foodOptions = ['🍏', '🍓', '🍌', '🥑', '🍒', '🥝'];

// FoodPicker component allows users to select a food emoji from a list
const FoodPicker: React.FC<FoodPickerProps> = ({ setFoodEmoji, foodEmoji }) => {
  return (
    <div className='flex space-x-4 mb-6 flex-wrap justify-center'>
      {/* Loop through the food options to display the emoji buttons */}
      {foodOptions.map((emoji, index) => (
        <div
          key={index}
          className={`zero:w-6 zero:h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 flex items-center rounded-md justify-center cursor-pointer zero:text-xl sm:text-2xl lg:text-3xl transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
            emoji === foodEmoji ? 'border-2 border-pink-500 bg-neutral-700' : '' // Highlight the selected emoji with a pink border and background
          }`}
          onClick={() => setFoodEmoji(emoji)}
        >
          {emoji}
        </div>
      ))}
    </div>
  );
};

export default FoodPicker;
