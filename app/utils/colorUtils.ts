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
  // Use a regular expression to extract the RGB values from an 'rgba' or 'rgb' formatted string
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);

  // If the color string doesn't match the expected format, return false as we cannot determine the darkness
  if (!match) return false;

  // Destructure and convert the matched RGB values from strings to numbers
  const [, r, g, b] = match.map(Number);

  // Calculate the brightness of the color using the YIQ formula
  // This formula gives more weight to green, then red, and less to blue as they contribute differently to perceived brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return true if brightness is less than 128, indicating a dark color; otherwise, return false
  return brightness < 128;
};
