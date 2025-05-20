import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';

const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const a = 1;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export default function HomeScreen() {
  const [backgroundColor, setBackgroundColor] = useState(
    'rgba(255, 255, 255, 1)'
  );

  const handleColorChange = () => {
    setBackgroundColor(generateRandomColor());
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <TouchableOpacity style={styles.button} onPress={handleColorChange}>
        <Text style={styles.buttonText}>Change Color</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(0, 122, 255, 1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
