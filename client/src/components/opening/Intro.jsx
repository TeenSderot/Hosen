import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts, Rubik_400Regular, Rubik_600SemiBold, Rubik_700Bold } from '@expo-google-fonts/rubik';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';

SplashScreen.preventAutoHideAsync();

export default function WelcomeScreen() {
  const navigation = useNavigation()
  const [fontsLoaded, fontError] = useFonts({
    'Rubik-Regular': Rubik_400Regular,
    'Rubik-SemiBold': Rubik_600SemiBold,
    'Rubik-Bold': Rubik_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>
            <Text style={styles.logoIn}>in</Text>
            <Text style={styles.logoHand}>Hand</Text>
          </Text>
        </View>

        <Text style={styles.welcomeTitle}>ברוכים הבאים ל-inHand</Text>

        <Text style={styles.subtitle}>הכל בהישג היד שלך</Text>

        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={()=>navigation.navigate("Register")}>
          <Text style={styles.buttonText}>מתחילים</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  logoContainer: {
    marginBottom: 32,
  },
  logoText: {
    fontSize: 60,
    fontFamily: 'Rubik-Bold',
    marginBottom: 8,
  },
  logoIn: {
    color: '#4A5568',
    fontSize: 60,
    fontFamily: 'Rubik-Bold',
  },
  logoHand: {
    color: '#9FD8C9',
    fontSize: 60,
    fontFamily: 'Rubik-Bold',
  },
  welcomeTitle: {
    fontSize: 36,
    fontFamily: 'Rubik-SemiBold',
    color: '#4A5568',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 48,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'Rubik-Regular',
    color: '#4A5568',
    marginBottom: 48,
    textAlign: 'center',
    lineHeight: 32,
  },
  button: {
    backgroundColor: '#EFA560',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Rubik-SemiBold',
    textAlign: 'center',
  },
});
