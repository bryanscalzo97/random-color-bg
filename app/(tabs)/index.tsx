import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import {
  Animated,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

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
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const scaleAnim = new Animated.Value(1);
  const opacityAnim = new Animated.Value(1);

  // Initialize audio
  useEffect(() => {
    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
        });
      } catch (error) {
        console.log('Error setting up audio:', error);
      }
    };

    setupAudio();
  }, []);

  // Load and unload sound
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playSound = async () => {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../../assets/pop.wav'),
        { shouldPlay: true }
      );
      setSound(newSound);
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  const animateButton = () => {
    // Scale down
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
      // Scale back up
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  const handleColorChange = async () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const newColor = `rgba(${r}, ${g}, ${b}, 1)`;
    setBackgroundColor(newColor);
    setCurrentEmoji(getColorEmoji(r, g, b));

    // Animate button
    animateButton();

    // Play sound and trigger haptic feedback
    await playSound();
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleCopyColor = async () => {
    try {
      await Clipboard.setStringAsync(backgroundColor);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Toast.show({
        type: 'success',
        text1: 'Color copied',
        text2: backgroundColor,
        position: 'bottom',
        visibilityTime: 2000,
      });
    } catch (error) {
      console.log('Error copying to clipboard:', error);
      Toast.show({
        type: 'error',
        text1: 'Error copying color',
        position: 'bottom',
        visibilityTime: 2000,
      });
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{currentEmoji}</Text>

        <Animated.View
          style={[
            styles.buttonContainer,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <Pressable
            style={styles.button}
            onPress={handleColorChange}
            android_disableSound
          >
            <Text style={styles.buttonText}>Change Color</Text>
          </Pressable>
        </Animated.View>

        <View style={styles.colorContainer}>
          <Text style={styles.colorText}>{backgroundColor}</Text>
          <Pressable
            style={({ pressed }) => [
              styles.copyButton,
              pressed && styles.copyButtonPressed,
            ]}
            onPress={handleCopyColor}
            android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
          >
            <MaterialIcons name='content-copy' size={24} color='#000' />
          </Pressable>
        </View>
      </View>
      <Toast />
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
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 10,
    gap: 8,
  },
  colorText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  copyButton: {
    padding: 4,
    borderRadius: 4,
  },
  copyButtonPressed: {
    opacity: 0.8,
  },
  buttonContainer: {
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: 'rgba(0, 122, 255, 1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
