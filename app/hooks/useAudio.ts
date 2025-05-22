import { Audio, AVPlaybackStatus } from 'expo-av';
import { useCallback, useEffect, useState } from 'react';

export const useAudio = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // Effect to set up the audio mode when the component using this hook is mounted
  useEffect(() => {
    // Define an asynchronous function to configure audio settings
    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true, // Allow audio to play in silent mode on iOS
          staysActiveInBackground: false, // Do not keep audio active in background
          shouldDuckAndroid: true, // Reduce volume of other sounds for this app on Android
          playThroughEarpieceAndroid: false, // Do not route audio through earpiece on Android
        });
      } catch (error) {
        console.error('Error setting up audio:', error); // Log any errors encountered
      }
    };

    setupAudio();
  }, []);

  // Effect to unload the audio resource when the sound changes or the component unmounts
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); // Unload the current sound if it exists
        }
      : undefined; // No clean-up needed if no sound is set
  }, [sound]);

  // Function to handle playing the sound
  const playSound = useCallback(
    async (type: 'warm' | 'cold' | 'neutral') => {
      try {
        // Stop and unload current sound if it exists
        if (sound) {
          await sound.stopAsync();
          await sound.unloadAsync();
        }

        const soundFile = {
          warm: require('../../assets/isWarm.wav'),
          cold: require('../../assets/isCold.wav'),
          neutral: require('../../assets/isNeutral.wav'),
        }[type];

        const { sound: newSound } = await Audio.Sound.createAsync(soundFile);
        setSound(newSound); // Store the new sound instance
        await newSound.playAsync();

        // Clean up the sound after it finishes playing
        newSound.setOnPlaybackStatusUpdate(async (status: AVPlaybackStatus) => {
          if (!status.isLoaded) return;
          if (status.didJustFinish) {
            await newSound.unloadAsync();
            setSound(null); // Clear the sound reference
          }
        });
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    },
    [sound]
  ); // Add sound to dependencies since we're using it in the callback

  return { playSound };
};
