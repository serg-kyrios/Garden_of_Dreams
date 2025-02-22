import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../colors";
function OutlineButton({ onPress, icon, children }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress} // 🔥 Виправлено
    >
      <Ionicons
        style={styles.icon}
        name={icon}
        size={18}
        color={colors.primary50}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default OutlineButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary50,
    width: "60%",
    borderRadius: 10,
    //backgroundColor: colors.primary50,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: { marginRight: 1 },
  text: { color: colors.primary50, flex: 1, textAlign: "center" },
});
