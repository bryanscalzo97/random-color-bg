import { StyleSheet, View } from 'react-native';

interface ProgressBarProps {
  progress: number;
  textColor: string;
}

export function ProgressBar({ progress, textColor }: ProgressBarProps) {
  // Add 85% opacity to the text color
  const progressColor =
    textColor === '#FFFFFF'
      ? 'rgba(255, 255, 255, 0.85)'
      : 'rgba(0, 0, 0, 0.85)';

  return (
    <View style={styles.progressContainer}>
      <View
        style={[
          styles.progressBar,
          {
            width: `${progress * 100}%`,
            backgroundColor: progressColor,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    width: '90%',
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
});
