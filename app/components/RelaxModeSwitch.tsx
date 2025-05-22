import { StyleSheet, Switch, Text, View } from 'react-native';

interface RelaxModeSwitchProps {
  isActive: boolean;
  onToggle: (value: boolean) => void;
  textColor: string;
}

export function RelaxModeSwitch({
  isActive,
  onToggle,
  textColor,
}: RelaxModeSwitchProps) {
  return (
    <View style={styles.switchContainer}>
      <Text style={[styles.switchText, { color: textColor }]}>
        🧘‍♀️ Relax Mode
      </Text>
      <Switch
        value={isActive}
        onValueChange={onToggle}
        trackColor={{
          false: 'rgba(0, 0, 0, 0.2)',
          true: 'rgba(255, 255, 255, 0.3)',
        }}
        thumbColor={isActive ? '#f5dd4b' : '#f4f3f4'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 25,
  },
  switchText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
