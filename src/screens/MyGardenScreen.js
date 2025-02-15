import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import DATA from "../data/data";

export default function MyGardenScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌿 Мій Сад 🌿</Text>
      <Text style={styles.subtitle}>Cписок моїх рослин</Text>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>⬅ Повернутися</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
    margin: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    //padding: 10,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
});
