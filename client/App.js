import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";

// ⬇️ שינוי כאן: מחליפים את ה-Import מ-native-stack ל-stack הרגיל
import { createStackNavigator } from "@react-navigation/stack";

// מסכים
import SC32_Onboarding from "./src/components/finger4/SC32_Onboarding";
import SC35_Slogan from "./src/components/finger4/SC35_Slogan";
import SC33_Communication from "./src/components/finger4/SC33_Communication";
import SC36_Dashboard from "./src/components/finger4/SC36_Dashboard";
import Index from "./src/components/finger2/index";
import Hand from "./src/components/hand/HomeScreen";
import ResourcesTab from "./src/components/finger3/Resources";
import Finger1 from "./src/components/finger1/app/Finger1";

import RegisterScreen from "./src/components/register";
import LoginScreen from "./src/components/login";
import ResetPasswordScreen from "./src/components/reset-password";

import Lotus from "./src/components/ui/Lotus";
import { ErrorProvider } from "./src/components/hooks/context/ErrorContext";
import ErrorAlert from "./src/components/hooks/context/ErrorAlert";
import ToolboxLobby from "./src/components/toolbox/app/index";
import CommunityWisdom from "./src/components/toolbox/app/wisdom";
import FavoritesPage from "./src/components/toolbox/app/favorites";
import CategoryFeed from "./src/components/toolbox/app/category/categoryId";

const navigationRef = createNavigationContainerRef();
// ⬇️ שינוי כאן: שימוש ב-createStackNavigator
const Stack = createStackNavigator();

const NO_BARS_SCREENS = ["Register", "Login", "ResetPassword"];

export function navigateTo(name) {
  console.log("Attempting to navigate to:", name);
  if (navigationRef.isReady()) {
    console.log("Navigation is ready, calling navigate...");
    navigationRef.navigate(name);
  } else {
    console.error("Navigation NOT ready! current status:", navigationRef.isReady());
  }
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState("Register");
  const hideBars = NO_BARS_SCREENS.includes(currentRoute);

  return (
    <ErrorProvider>
      <SafeAreaView style={styles.container}>

        {/* 🔝 Top Bar */}
        {!hideBars && (
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => console.log("Menu Pressed")}>
              <Image
                source={require("./assets/menu-dots.png")}
                style={styles.icon}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigateTo("Hand")}>
              <Lotus />
            </TouchableOpacity>
          </View>
        )}

        {/* 🔁 Navigation */}
        <View style={styles.content}>
         <NavigationContainer
            ref={navigationRef}
           onStateChange={() => {
    const route = navigationRef.getCurrentRoute();
    if (route) {
      setCurrentRoute(route.name);
    }
  }}
          >
            <Stack.Navigator
              initialRouteName="Register"
              screenOptions={{ 
                headerShown: false,
                // אופציונלי: אנימציה חלקה יותר ב-JS Stack
                animationEnabled: true 
              }}
            >
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
              <Stack.Screen name="Hand" component={Hand} />
              <Stack.Screen name="index" component={SC32_Onboarding} />
              <Stack.Screen name="pinky" component={Index} />
              <Stack.Screen name="ring" component={Finger1} />
              <Stack.Screen name="Communication" component={SC33_Communication} />
              <Stack.Screen name="Slogan" component={SC35_Slogan} />
              <Stack.Screen name="Dashboard" component={SC36_Dashboard} />
              <Stack.Screen name="middle" component={ResourcesTab} />
              <Stack.Screen name="toolbox" component={ToolboxLobby} />
              <Stack.Screen name="wisdom" component={CommunityWisdom} />
              <Stack.Screen name="favorites" component={FavoritesPage} />
              <Stack.Screen name="categoryFeed" component={CategoryFeed} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>

        {/* 🔻 Bottom Bar */}
        {!hideBars && (
          <View style={styles.bottomBar}>
            <TouchableOpacity
              style={styles.tab}
              onPress={() => navigateTo("toolbox")}
            >
              <Image source={require("./assets/toolbox.png")} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tab}
              onPress={() => navigateTo("Hand")}
            >
              <Image source={require("./assets/home.png")} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab}>
              <Image source={require("./assets/divrot.png")} style={styles.icon} />
            </TouchableOpacity>
          </View>
        )}

        <ErrorAlert />
      </SafeAreaView>
    </ErrorProvider>
  );
}

// ... (שאר ה-styles ללא שינוי)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    height: 60,
    marginTop: 50,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  content: {
    flex: 1,
  },
  bottomBar: {
    height: 70,
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginBottom: 50,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});