//       <Button title="📸 Додати фото" onPress={takeImageHandler} />
//
import React, { useState, useEffect } from "react";
import {
  TextInput,
  Text,
  Image,
  StyleSheet,
  View,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import OutlineButton from "../../component/UI/OutlineButton";

export default function ImagePickerScreen({ navigation }) {
  const [image, setImage] = useState(null);

  // Попросити дозволи при запуску
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "We need camera permissions to make this work!"
        );
      }
    })();
  }, []);

  async function takeImageHandler() {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result); // Лог для перевірки

    if (!result.canceled && result.assets?.length > 0) {
      setImage(result.assets[0].uri);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput style={styles.input} placeholder="Title" />
        <OutlineButton icon={"camera"} onPress={takeImageHandler}>
          Take Image
        </OutlineButton>

        {image && <Image source={{ uri: image }} style={styles.preview} />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "#76ABD1FF",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
  },
  input: { borderBottomWidth: 1, padding: 8, marginBottom: 10, fontSize: 16 },
  preview: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 10,
  },
});
