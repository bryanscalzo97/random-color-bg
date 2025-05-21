import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface ColorDisplayProps {
  backgroundColor: string;
  onCopy: () => void;
}

export const ColorDisplay = ({
  backgroundColor,
  onCopy,
}: ColorDisplayProps) => {
  return (
    <View style={styles.colorContainer}>
      <Text style={styles.colorText}>{backgroundColor}</Text>
      <Pressable
        style={({ pressed }) => [
          styles.copyButton,
          pressed && styles.copyButtonPressed,
        ]}
        onPress={onCopy}
        android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
      >
        <MaterialIcons name='content-copy' size={24} color='#000' />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
