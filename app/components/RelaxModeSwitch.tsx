import { StyleSheet, Switch, Text, View } from 'react-native';

interface RelaxModeSwitchProps {
  isActive: boolean;
  onToggle: (value: boolean) => void;
}

export function RelaxModeSwitch({ isActive, onToggle }: RelaxModeSwitchProps) {
  return (
    <View style={styles.switchContainer}>
      <Text style={styles.switchText}>🧘‍♀️ Relax Mode</Text>
      <Switch
        value={isActive}
        onValueChange={onToggle}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  switchText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
