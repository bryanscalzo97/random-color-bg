import { useEffect, useRef, useState } from 'react';

export function useRelaxMode(onColorChange: () => void) {
  const [isActive, setIsActive] = useState(false);

  const [progress, setProgress] = useState(0);

  // Create a reference to keep track of the start time for the relax mode timer, initialized with the current time
  const startTimeRef = useRef(Date.now());

  // Function to reset the timer and progress
  const resetTimer = () => {
    // Update the start time to the current time
    startTimeRef.current = Date.now();

    // Reset the progress back to 0
    setProgress(0);
  };

  // Use the 'useEffect' hook to manage side effects related to the 'isActive' state
  useEffect(() => {
    // If relax mode is not active, reset the progress and exit
    if (!isActive) {
      setProgress(0);
      return;
    }

    // Set up an interval to update the progress approximately every 16 milliseconds
    const interval = setInterval(() => {
      // Calculate the elapsed time since the last reset
      const elapsed = Date.now() - startTimeRef.current;

      // Calculate new progress as a fraction of 5 seconds (5000 milliseconds), ensuring it does not exceed 1
      const newProgress = Math.min(elapsed / 5000, 1);

      // Update the progress state
      setProgress(newProgress);

      // If the progress reaches or exceeds 1, trigger the 'onColorChange' callback and reset the timer
      if (newProgress >= 1) {
        onColorChange();
        resetTimer();
      }
    }, 16);

    // Return a cleanup function to clear the interval when the component unmounts or dependencies change
    return () => clearInterval(interval);
  }, [isActive, onColorChange]);

  return {
    isActive,
    progress,
    toggleRelaxMode: setIsActive,
    resetTimer,
  };
}
