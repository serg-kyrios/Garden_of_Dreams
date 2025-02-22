import React, { useState, useEffect } from "react";
import {
  TextInput,
  Text,
  Image,
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Додали імпорт
import { colors } from "../../colors";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OutlineButton from "../../component/UI/OutlineButton";

export default function ImagePickerScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);

  // Завантажуємо збережені дані при старті
  useEffect(() => {
    async function loadNotes() {
      const storedNotes = await AsyncStorage.getItem("notes");
      if (storedNotes) {
        setSavedNotes(JSON.parse(storedNotes));
      }
    }
    loadNotes();
  }, []);

  // Перевіряємо дозвіл на використання камери
  useEffect(() => {
    async function checkPermissions() {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    }
    checkPermissions();
  }, []);

  // Обробник для фотографії
  async function takeImageHandler() {
    if (!hasPermission) {
      Alert.alert(
        "Доступ заборонено",
        "Надайте доступ до камери в налаштуваннях."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImage(result.assets[0].uri);
    }
  }

  // Функція для збереження нотатки
  async function saveNoteHandler() {
    if (!title.trim() && !image) {
      Alert.alert("Помилка", "Додайте текст або зображення!");
      return;
    }

    const newNote = { title, image };
    const updatedNotes = [newNote, ...savedNotes];

    setSavedNotes(updatedNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));

    // Очищаємо форму
    setTitle("");
    setImage(null);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <OutlineButton icon={"camera"} onPress={takeImageHandler}>
          Зробити Фотографію
        </OutlineButton>

        {image && <Image source={{ uri: image }} style={styles.preview} />}
        <OutlineButton icon={"document-text-outline"} onPress={saveNoteHandler}>
          Зберегти вашу нотатку
        </OutlineButton>
        {/* <Button title="" onPress={saveNoteHandler} /> */}

        <Text style={styles.sectionTitle}>Збережені нотатки:</Text>
        {savedNotes.map((note, index) => (
          <View key={index} style={styles.noteItem}>
            <Ionicons
              name="document-text-outline"
              size={24}
              color={colors.primary50}
              style={styles.noteIcon}
            />
            {note.image && (
              <Image source={{ uri: note.image }} style={styles.noteImage} />
            )}
            <Text style={styles.noteText}>{note.title}</Text>
          </View>
        ))}
      </ScrollView>
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
    padding: 8,
    marginBottom: 10,
    fontSize: 16,
    borderColor: colors.primary15,
  },
  preview: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  noteItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  noteIcon: {
    marginRight: 10,
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

//       <Button title="📸 Додати фото" onPress={takeImageHandler} />
//
