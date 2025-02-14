import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MyGardenScreen from './screens/MyGardenScreen'; // Друга сторінка

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.rootScreen}>
        <LinearGradient colors={['#4c669f', '#98773BFF', '#6A194EFF']} style={styles.rootScreen}>
          <ImageBackground
            source={require('./assets/images/nico-wijaya-33463ADa_10-unsplash.jpg')}
            resizeMode="cover"
            style={styles.rootScreen}
            imageStyle={styles.backgroundImage}
          >
            <View style={styles.centeredContainer}>
            
              <Text style={styles.text}>#Garden_of_Dreams</Text>
              {/* Кнопка для переходу на другу сторінку */}
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyGarden')}>
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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MyGarden" component={MyGardenScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  rootScreen: { flex: 1 },
  backgroundImage: { opacity: 0.7 },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
   //  textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowColor: '#E31621FF',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#FF512F',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
