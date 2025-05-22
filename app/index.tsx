import * as Haptics from 'expo-haptics';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { ColorDisplay } from './components/ColorDisplay';
import { ProgressBar } from './components/ProgressBar';
import { RelaxModeSwitch } from './components/RelaxModeSwitch';
import { useAudio } from './hooks/useAudio';
import { useClipboard } from './hooks/useClipboard';
import { useColorManager } from './hooks/useColorManager';
import { useRelaxMode } from './hooks/useRelaxMode';
import { getTextColor } from './utils/colorUtils';

export default function HomeScreen() {
  const { backgroundColor, currentEmoji, changeColor } = useColorManager();
  const { playSound } = useAudio();
  const { copyToClipboard } = useClipboard();

  const handleColorChange = async () => {
    // Get the new color immediately
    const newColor = changeColor();

    // Determine the sound based on the new color
    const match = newColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      const [, r, g, b] = match.map(Number);
      const isWarm = r > g && r > b;
      const isCold = b > r && b > g;
      const type = isWarm ? 'warm' : isCold ? 'cold' : 'neutral';
      await playSound(type);
    }

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const { isActive, progress, toggleRelaxMode, resetTimer } =
    useRelaxMode(handleColorChange);

  const handleBackgroundPress = async () => {
    await handleColorChange();
    if (isActive) {
      resetTimer();
    }
  };

  const textColor = getTextColor(backgroundColor);
  const softTextColor = getTextColor(backgroundColor, 0.85);

  return (
    <Pressable
      style={[styles.container, { backgroundColor }]}
      onPress={handleBackgroundPress}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.emoji}>{currentEmoji}</Text>
          <Text style={[styles.helloText, { color: softTextColor }]}>
            Hello there
          </Text>
          <ColorDisplay
            backgroundColor={backgroundColor}
            onCopy={() => copyToClipboard(backgroundColor)}
            textColor={textColor}
          />
        </View>

        <View style={styles.bottomContainer}>
          <RelaxModeSwitch
            isActive={isActive}
            onToggle={toggleRelaxMode}
            textColor={textColor}
          />

          {isActive && (
            <ProgressBar
              progress={progress}
              backgroundColor={backgroundColor}
            />
          )}
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
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: 10,
  },
});
