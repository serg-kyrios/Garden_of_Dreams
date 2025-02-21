import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import OutlineButton from "../../component/UI/OutlineButton";
import { CameraView } from "expo-camera";

export default function NotesPageScreen({ navigation }) {
  const [newNote, setNewNote] = useState("");
  const [image, setImage] = useState(null);

  // Функція вибору зображення
  const pickImage = async () => {
    // Додавання нотатки
  };

  return (
    <View style={styles.container}>
      <OutlineButton icon={"camera"}>Take Image</OutlineButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
  },
  input: { borderBottomWidth: 1, padding: 8, marginBottom: 10, fontSize: 16 },
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
  buttonText: { color: "#fff", fontWeight: "bold" },
  preview: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 10,
    borderRadius: 10,
  },
});
