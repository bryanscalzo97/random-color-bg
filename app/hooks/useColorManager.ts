import { useState } from 'react';
import { getColorEmoji } from '../utils/colorUtils';

// Define a custom hook named 'useColorManager'
export const useColorManager = () => {
  const [backgroundColor, setBackgroundColor] = useState(
    'rgba(255, 255, 255, 1)'
  );

  const [currentEmoji, setCurrentEmoji] = useState('✨');

  const generateRandomColor = () => {
    // Generate random values for red, green, and blue
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Return the generated color as an RGBA string
    return `rgba(${r}, ${g}, ${b}, 1)`;
  };

  // Function to change the background color and update the emoji
  const changeColor = () => {
    // Generate a new random color
    const newColor = generateRandomColor();

    // Extract RGB values from the new color string
    const [r, g, b] = newColor.match(/\d+/g)?.map(Number) || [255, 255, 255];

    // Update the 'backgroundColor' state with the new color
    setBackgroundColor(newColor);

    // Get an appropriate emoji based on the RGB values and update 'currentEmoji' state
    setCurrentEmoji(getColorEmoji(r, g, b));
  };

  return {
    backgroundColor,
    currentEmoji,
    changeColor,
  };
};
