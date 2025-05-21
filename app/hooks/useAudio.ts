import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';

export const useAudio = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      } catch (error) {
        console.error('Error setting up audio:', error);
      }
    };

    setupAudio();
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playSound = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const soundFile = require('../../assets/pop.wav');
      if (!soundFile) {
        console.error('Sound file not found');
        return;
      }

      const { sound: newSound } = await Audio.Sound.createAsync(soundFile, {
        shouldPlay: true,
        volume: 1.0,
      });

      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  return { playSound };
};
