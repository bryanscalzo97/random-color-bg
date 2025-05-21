import * as Haptics from 'expo-haptics';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { ColorDisplay } from './components/ColorDisplay';
import { useAudio } from './hooks/useAudio';
import { useClipboard } from './hooks/useClipboard';
import { useColorManager } from './hooks/useColorManager';

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
  const { backgroundColor, currentEmoji, changeColor } = useColorManager();
  const { playSound } = useAudio();
  const { copyToClipboard } = useClipboard();

  const handleColorChange = async () => {
    changeColor();
    await playSound();
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <Pressable
      style={[styles.container, { backgroundColor }]}
      onPress={handleColorChange}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.emoji}>{currentEmoji}</Text>
          <Text style={styles.helloText}>Hello there</Text>
          <ColorDisplay
            backgroundColor={backgroundColor}
            onCopy={() => copyToClipboard(backgroundColor)}
          />
        </View>
        <Toast />
      </SafeAreaView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
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
  helloText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#000',
  },
});
