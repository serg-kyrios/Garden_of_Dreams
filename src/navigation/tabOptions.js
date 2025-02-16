import { Ionicons } from "@expo/vector-icons"; // Іконки Expo
import { StyleSheet } from "react-native";
import colors from "..//../colors";

// 🔥 Експортуємо окремо tabOptions
export const tabOptions = {
  tabBarStyle: { height: 60 }, // Збільшення висоти
  tabBarLabelStyle: { fontSize: 16 },
  headerStyle: { backgroundColor: "#f4511e" },
  headerTintColor: "#fff",
  headerTitleStyle: { fontWeight: "bold" },
};

// 🔥 Функція для отримання опцій вкладок
export const getTabOptions = (route) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === "Головна") {
      iconName = focused ? "home" : "home-outline";
    } else if (route.name === "MyGarden") {
      iconName = focused ? "leaf" : "leaf-outline";
    } else if (route.name === "Додати") {
      iconName = focused ? "camera" : "camera-outline";
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarStyle: route.name === "Головна" ? { display: "none" } : {}, // Приховати вкладки на HomeScreen
  ...tabOptions, // 🔥 Додаємо загальні опції
});

const styles = StyleSheet.create({
  iconName: {
    fontSize: 24,
    marginBottom: 5,
  },
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
  },
});
