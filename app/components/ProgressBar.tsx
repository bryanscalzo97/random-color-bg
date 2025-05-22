import { StyleSheet, View } from 'react-native';
import { getTextColor } from '../utils/colorUtils';

interface ProgressBarProps {
  progress: number;
  backgroundColor: string;
}

export function ProgressBar({ progress, backgroundColor }: ProgressBarProps) {
  const progressColor = getTextColor(backgroundColor, 0.85);

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
