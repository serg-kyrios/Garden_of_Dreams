import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import NotesPageScreen from "./NotesPageScreen";

export default function SavedNotesScreen() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem("savedNotes");
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.log("Помилка завантаження заміток:", error);
    }
  };

  const saveNotes = async (updatedNotes) => {
    try {
      await AsyncStorage.setItem("savedNotes", JSON.stringify(updatedNotes));
    } catch (error) {
      console.log("Помилка збереження заміток:", error);
    }
  };

  const addNote = async () => {
    if (!newNote.trim()) return;

    const newEntry = { text: newNote, image };
    const updatedNotes = [newEntry, ...notes];
    setNotes(updatedNotes);
    setNewNote("");
    setImage(null);
    await saveNotes(updatedNotes);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.buttonText}>📷 Додати фото</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.preview} />}
      <TouchableOpacity style={styles.addButton} onPress={addNote}>
        <Text style={styles.buttonText}>Додати</Text>
      </TouchableOpacity>
      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.noteImage} />
            )}
            <Text style={styles.noteText}>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E3F2FD",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#4CAF50",
    padding: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  imageButton: {
    backgroundColor: "#FFA726",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  preview: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 10,
    borderRadius: 10,
  },
  noteItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  noteImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  noteText: {
    fontSize: 16,
  },
});
