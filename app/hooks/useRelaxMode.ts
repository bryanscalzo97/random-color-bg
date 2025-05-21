import { useEffect, useRef, useState } from 'react';

export function useRelaxMode(onColorChange: () => void) {
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(Date.now());

  const resetTimer = () => {
    startTimeRef.current = Date.now();
    setProgress(0);
  };

  useEffect(() => {
    if (!isActive) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min(elapsed / 5000, 1);
      setProgress(newProgress);

      if (newProgress >= 1) {
        onColorChange();
        resetTimer();
      }
    }, 16);

    return () => clearInterval(interval);
  }, [isActive, onColorChange]);

  return {
    isActive,
    progress,
    toggleRelaxMode: setIsActive,
    resetTimer,
  };
}
