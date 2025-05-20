import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const getColorEmoji = (r: number, g: number, b: number) => {
  // Calculate color temperature
  // Warm colors have more red and yellow
  // Cold colors have more blue
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

export default function HomeScreen() {
  const [backgroundColor, setBackgroundColor] = useState(
    'rgba(255, 255, 255, 1)'
  );
  const [currentEmoji, setCurrentEmoji] = useState('✨');

  const handleColorChange = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const newColor = `rgba(${r}, ${g}, ${b}, 1)`;
    setBackgroundColor(newColor);
    setCurrentEmoji(getColorEmoji(r, g, b));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{currentEmoji}</Text>
        <TouchableOpacity style={styles.button} onPress={handleColorChange}>
          <Text style={styles.buttonText}>Change Color</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 20,
  },
  emoji: {
    fontSize: 80,
  },
  button: {
    backgroundColor: 'rgba(0, 122, 255, 1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
