import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OutlineButton from "../../component/UI/OutlineButton";
export default function SavedNotesScreen() {
  //const [notes, setNotes] = useState([]);

  function getNotes() {
    const storedNotes = q;
    return "q+q";
  }
  console.log(getNotes);

  return (
    <View style={styles.container}>
      <OutlineButton icon={"camera"} onPress={getNotes}></OutlineButton>
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
  noteImage: { width: 50, height: 50, marginRight: 10, borderRadius: 5 },
  noteText: { fontSize: 16 },
});
