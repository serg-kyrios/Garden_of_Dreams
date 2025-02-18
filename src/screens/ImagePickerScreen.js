// import React, { useState } from "react";
// import { View, Button, Image, StyleSheet } from "react-native";
// import {
//   launchCameraAsync,
//   useCameraPermissions,
//   PermissionStatus,
// } from "expo-image-picker";
// //Частина логіки (не бб'явлена) до => NotesPageScreen
// export default function ImagePickerScreen({ setSelectedImage }) {
//   const [pickedImage, setPickedImage] = useState(null);
//   const [cameraPermission, requestPermission] = useCameraPermissions();

//   async function verifyPermissions() {
//     if (cameraPermission.status === PermissionStatus.UNDETERMINED) {
//       const permissionResponse = await requestPermission();
//       return permissionResponse.granted;
//     }
//     if (cameraPermission.status === PermissionStatus.DENIED) {
//       Alert.alert("Недостатньо прав!", "Дайте дозвіл на використання камери.");
//       return false;
//     }
//     return true;
//   }

//   async function takeImageHandler() {
//     const hasPermission = await verifyPermissions();
//     if (!hasPermission) return;

//     const image = await launchCameraAsync({
//       allowsEditing: true,
//       quality: 0.5,
//     });

//     if (!image.canceled) {
//       setPickedImage(image.assets[0].uri);
//       setSelectedImage(image.assets[0].uri);
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <Button title="📸 Додати фото" onPress={takeImageHandler} />
//       {pickedImage && (
//         <Image source={{ uri: pickedImage }} style={styles.imagePreview} />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   imagePreview: {
//     width: 100,
//     height: 100,
//     borderRadius: 5,
//     marginTop: 10,
//   },
// });
