import { useEffect, useRef, useState } from 'react';

export function useRelaxMode(onColorChange: () => void) {
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(Date.now());

  const resetTimer = () => {
    startTimeRef.current = Date.now();
    setProgress(0);
  };

  const handleColorChange = () => {
    onColorChange();
    resetTimer();
  };

  useEffect(() => {
    if (!isActive) {
      setProgress(0);
      return;
    }

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min(elapsed / 5000, 1);
      setProgress(newProgress);

      if (newProgress >= 1) {
        handleColorChange();
      }
    }, 16);

    return () => clearInterval(progressInterval);
  }, [isActive]);

  return {
    isActive,
    progress,
    toggleRelaxMode: setIsActive,
    resetTimer,
  };
}
