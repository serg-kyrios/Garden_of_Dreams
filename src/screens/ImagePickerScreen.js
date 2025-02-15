import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { launchCamera } from "react-native-image-picker";
//import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CameraScreen({ navigation }) {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    loadSavedPhoto();
  }, []);

  const takePhoto = async () => {
    const options = {
      mediaType: "photo",
      quality: 0.8,
      saveToPhotos: true,
    };

    launchCamera(options, async (response) => {
      if (response.didCancel) {
        console.log("Користувач скасував зйомку");
      } else if (response.errorMessage) {
        Alert.alert("Помилка", response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        setPhoto(uri);
        await savePhoto(uri);
      }
    });
  };

  const savePhoto = async (uri) => {
    try {
      await AsyncStorage.setItem("savedPhoto", uri);
      console.log("Фото збережено");
    } catch (error) {
      console.log("Помилка збереження фото:", error);
    }
  };

  const loadSavedPhoto = async () => {
    try {
      const savedUri = await AsyncStorage.getItem("savedPhoto");
      if (savedUri) {
        setPhoto(savedUri);
      }
    } catch (error) {
      console.log("Помилка завантаження фото:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📸 Додати фото рослини</Text>

      {photo ? (
        <Image source={{ uri: photo }} style={styles.image} />
      ) : (
        <Text style={styles.placeholder}>Фото ще немає</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={takePhoto}>
        <Text style={styles.buttonText}>📷 Зробити фото</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  placeholder: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
