import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ImagePickerScreen from "./ImagePickerScreen";

export default function NotesPageScreen() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // Функція для додавання замітки
  const addNote = () => {
    if (newNote.trim() !== "" || selectedImage) {
      const newEntry = { text: newNote, image: selectedImage };
      setNotes([...notes, newEntry]);
      setNewNote("");
      setSelectedImage(null);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Нова замітка"
        value={newNote}
        onChangeText={setNewNote}
      />

      {/* Виклик вибору фото */}
      <ImagePickerScreen setSelectedImage={setSelectedImage} />

      {/* Попередній перегляд фото перед додаванням */}
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.previewImage} />
      )}

      <TouchableOpacity style={styles.addButton} onPress={addNote}>
        <Text style={styles.addButtonText}>Додати</Text>
      </TouchableOpacity>

      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <MaterialIcons name="note" size={24} color="green" />
            <Text style={styles.noteText}>{item.text}</Text>
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.noteImage} />
            )}
          </View>
        )}
      />
    </View>
  );
}

// Стилі
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#E3F2FD",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  noteItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 5,
  },
  noteText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  noteImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 10,
  },
});
