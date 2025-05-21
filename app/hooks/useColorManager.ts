import { useState } from 'react';
import { getColorEmoji } from '../utils/colorUtils';

export const useColorManager = () => {
  const [backgroundColor, setBackgroundColor] = useState(
    'rgba(255, 255, 255, 1)'
  );
  const [currentEmoji, setCurrentEmoji] = useState('✨');

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 1)`;
  };

  const changeColor = () => {
    const newColor = generateRandomColor();
    const [r, g, b] = newColor.match(/\d+/g)?.map(Number) || [255, 255, 255];

    setBackgroundColor(newColor);
    setCurrentEmoji(getColorEmoji(r, g, b));
  };

  return {
    backgroundColor,
    currentEmoji,
    changeColor,
  };
};
