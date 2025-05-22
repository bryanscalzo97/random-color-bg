export const getColorEmoji = (r: number, g: number, b: number): string => {
  const isWarm = r > g && r > b;
  const isCold = b > r && b > g;
  const isNeutral = !isWarm && !isCold;

  if (isWarm) {
    if (r > 200) return '🔥'; // Very intense red
    if (r > 150) return '☀️'; // Orange/Red
    return '🌅'; // Soft warm tones
  }

  if (isCold) {
    if (b > 200) return '❄️'; // Very intense blue
    if (b > 150) return '🌊'; // Medium blue
    return '🌌'; // Soft cold tones
  }

  if (isNeutral) {
    if (g > 150) return '🌱'; // Green
    if (r > 150 && g > 150) return '🌻'; // Yellow
    return '✨'; // Other colors
  }

  return '🎨'; // Default color
};

// Export a function named 'isDarkColor' that determines if a color is dark based on its RGB or RGBA string representation
export const isDarkColor = (color: string) => {
  // Extract RGB values from rgba string using regex
  // Matches both rgb() and rgba() formats
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return false;

  // Convert string values to numbers and destructure RGB components
  const [, r, g, b] = match.map(Number);

  // Calculate perceived brightness using YIQ formula
  // This formula gives more weight to green and less to blue
  // as human eyes are more sensitive to green light
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return true if the color is dark (brightness < 128)
  return brightness < 128;
};

export const getTextColor = (backgroundColor: string, opacity: number = 1) => {
  const isDark = isDarkColor(backgroundColor);
  const color = isDark ? '255, 255, 255' : '0, 0, 0';
  return `rgba(${color}, ${opacity})`;
};
