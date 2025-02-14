import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MyGardenScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌿 Мій Сад 🌿</Text>
      <Text style={styles.subtitle}>Тут буде список моїх рослин</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>⬅ Повернутися</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
