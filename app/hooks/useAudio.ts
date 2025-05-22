import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';

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
  const playSound = async () => {
    try {
      // If there's an existing sound, unload it before playing a new one
      if (sound) {
        await sound.unloadAsync();
      }

      // Load the sound file. Make sure the file path is correct and accessible.
      const soundFile = require('../../assets/pop.wav');
      if (!soundFile) {
        console.error('Sound file not found');
        return;
      }

      // Create a new sound instance and automatically start playing the sound
      const { sound: newSound } = await Audio.Sound.createAsync(soundFile, {
        shouldPlay: true, // Start playing immediately
        volume: 1.0, // Set the initial volume to maximum
      });

      setSound(newSound); // Store the new sound in the state
      await newSound.playAsync(); // Ensure the sound starts playing
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  return { playSound };
};
