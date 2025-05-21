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

  return (
    <Pressable
      style={[styles.container, { backgroundColor }]}
      onPress={handleBackgroundPress}
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

        <View style={styles.bottomContainer}>
          <RelaxModeSwitch isActive={isActive} onToggle={toggleRelaxMode} />

          {isActive && <ProgressBar progress={progress} />}
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
  bottomContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: 10,
  },
});
