import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyGardenScreen from "./src/screens/MyGardenScreen";
import ImagePickerScreen from "./src/screens/ImagePickerScreen";

const Tab = createBottomTabNavigator();

// **Головний екран**
function HomeScreen({ navigation }) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.rootScreen}>
        <LinearGradient
          colors={["#4c669f", "#98773BFF", "#6A194EFF"]}
          style={styles.rootScreen}
        >
          <ImageBackground
            source={require("./assets/images/nico-wijaya-33463ADa_10-unsplash.jpg")}
            resizeMode="cover"
            style={styles.rootScreen}
            imageStyle={styles.backgroundImage}
          >
            <View style={styles.centeredContainer}>
              <Text style={styles.text}>#Garden_of_Dreams</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("MyGarden")} // ✅ Виправлено
              >
                <Text style={styles.buttonText}>Перейти в мій сад 🌿</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <StatusBar style="auto" />
        </LinearGradient>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// **Основний додаток**
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Головна"
          component={HomeScreen}
          options={{ tabBarStyle: { display: "none" } }} // ✅ Приховає вкладки
        />
        <Tab.Screen name="MyGarden" component={MyGardenScreen} />
        <Tab.Screen name="Додати" component={ImagePickerScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  rootScreen: { flex: 1 },
  backgroundImage: { opacity: 0.7 },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    //  textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowColor: "#E31621FF",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#FF512F",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
