import { useCallback, useState } from 'react';
import { getColorEmoji } from '../utils/colorUtils';

// Define a custom hook named 'useColorManager'
export const useColorManager = () => {
  const [backgroundColor, setBackgroundColor] = useState(
    'rgba(255, 255, 255, 1)'
  );
  const [currentEmoji, setCurrentEmoji] = useState('🎨');

  const changeColor = useCallback(() => {
    // Generate random RGB values
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = 1;

    // Create the new color
    const newColor = `rgba(${r}, ${g}, ${b}, ${a})`;

    // Update the state
    setBackgroundColor(newColor);
    setCurrentEmoji(getColorEmoji(r, g, b));

    // Return the new color for immediate use
    return newColor;
  }, []);

  return { backgroundColor, currentEmoji, changeColor };
};
