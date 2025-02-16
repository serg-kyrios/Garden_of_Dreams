import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";

export default function NotesPageScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Нова замітка"
        value={newNote}
        onChangeText={setNewNote}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          if (newNote.trim() !== "") {
            setNotes([...notes, newNote]);
            setNewNote("");
          }
        }}
      >
        <Text style={styles.addButtonText}>Додати</Text>
      </TouchableOpacity>
      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <MaterialIcons name="note" size={24} color="green" />
            <Text style={styles.noteText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    alignContent: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: "#2E7D32",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  noteItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  noteText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  deleteButton: {
    marginLeft: 12,
  },
});
