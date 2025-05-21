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
