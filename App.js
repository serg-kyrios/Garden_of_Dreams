import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MaskedView from '@react-native-masked-view/masked-view';
import { GradientText } from 'react-native-text-gradient';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.rootScreen}>
        <LinearGradient
          colors={['#4c669f', '#98773BFF', '#6A194EFF']}
          style={styles.rootScreen}
        >
          <ImageBackground
            source={require('./assets/images/nico-wijaya-33463ADa_10-unsplash.jpg')}
            resizeMode="cover"
            style={styles.rootScreen}
            imageStyle={styles.backgroundImage}
          >
             <View style={styles.centeredContainer}>
              <View
                style={styles.text}
                locations={[0, 1]}
                colors={['#FF512F', '#F09819']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                  <Text style={styles.text}>#Garden_of_Dreams</Text>
               
              
            </View>
           
            </View>
          </ImageBackground>
          <StatusBar style="auto" />
        </LinearGradient>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.7,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskedContainer: {
    height: 50, // Висота тексту (залежить від розміру шрифту)
  },
  text: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent', // ВАЖЛИВО!
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowColor: '#FF512F',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
  },
});
