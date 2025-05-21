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
import { isDarkColor } from './utils/colorUtils';

export default function HomeScreen() {
  const { backgroundColor, currentEmoji, changeColor } = useColorManager();
  const { playSound } = useAudio();
  const { copyToClipboard } = useClipboard();

  const handleColorChange = async () => {
    changeColor();
    await playSound();
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

  const textColor = isDarkColor(backgroundColor) ? '#FFFFFF' : '#000000';
  const softTextColor =
    textColor === '#FFFFFF'
      ? 'rgba(255, 255, 255, 0.85)'
      : 'rgba(0, 0, 0, 0.85)';

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
            <ProgressBar progress={progress} textColor={textColor} />
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
