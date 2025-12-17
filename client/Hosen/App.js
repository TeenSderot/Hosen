import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Finger 2 – מדחום
import Finger2Index from './src/components/finger2/index';

// Finger 4 – מילים בונות מציאות
import SC32_Onboarding from './src/components/finger4/SC32_Onboarding';
import SC33_Communication from './src/components/finger4/SC33_Communication';
import SC35_Slogan from './src/components/finger4/SC35_Slogan';
import SC36_Dashboard from './src/components/finger4/SC36_Dashboard';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.homeTitle}>בחירת אצבע</Text>
      <Text style={styles.homeSubtitle}>
        בחרו את האצבע שתרצו לעבוד איתה כעת
      </Text>

      <TouchableOpacity
        style={styles.homeButtonPrimary}
        onPress={() => navigation.navigate('Finger2')}
      >
        <Text style={styles.homeButtonText}>אצבע 2 – המדחום</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.homeButtonSecondary}
        onPress={() => navigation.navigate('Finger4_Onboarding')}
      >
        <Text style={styles.homeButtonText}>אצבע 4 – מילים בונות מציאות</Text>
      </TouchableOpacity>
    </View>
  );
}

function HomeIcon({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Home')}
      style={styles.homeIconWrapper}
    >
      <Image
        source={require('./assets/icon.png')}
        style={styles.homeIcon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ navigation }) => ({
          headerRight: () => <HomeIcon navigation={navigation} />,
          headerTitleAlign: 'center',
        })}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'מסך פתיחה' }}
        />

        {/* Finger 2 – מדחום */}
        <Stack.Screen
          name="Finger2"
          component={Finger2Index}
          options={{ title: 'אצבע 2 – המדחום' }}
        />

        {/* Finger 4 – זרימה פנימית בין המסכים */}
        <Stack.Screen
          name="Finger4_Onboarding"
          component={SC32_Onboarding}
          options={{ title: 'אצבע 4 – מילים בונות מציאות' }}
        />
        <Stack.Screen
          name="Slogan"
          component={SC35_Slogan}
          options={{ title: 'בחירת סיסמה משפחתית' }}
        />
        <Stack.Screen
          name="Communication"
          component={SC33_Communication}
          options={{ title: 'מה אומרים עכשיו?' }}
        />
        <Stack.Screen
          name="Dashboard"
          component={SC36_Dashboard}
          options={{ title: 'הערכה המוכנה שלכם' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  homeTitle: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 8,
  },
  homeSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  homeButtonPrimary: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    backgroundColor: '#FD954E',
    alignItems: 'center',
    marginBottom: 12,
  },
  homeButtonSecondary: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    backgroundColor: '#84C7DA',
    alignItems: 'center',
  },
  homeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  homeIconWrapper: {
    paddingHorizontal: 8,
  },
  homeIcon: {
    width: 28,
    height: 28,
  },
});
