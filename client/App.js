import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  I18nManager,
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
import BreathingExercise from "./src/components/toolbox/app/exercise/breathing";
import Divrot from './src/components/divrot/Divrot'
import Finger5Intro from "./src/components/finger5/screens/Finger5Intro";
import WhoSavesTheSaviorScreen from "./src/components/finger5/screens/WhoSavesTheSaviorScreen"
import RechargeChecklistScreen from "./src/components/finger5/screens/RechargeChecklistScreen";
import SelfCareChecklistScreen from "./src/components/finger5/screens/SelfCareChecklistScreen";
import GoodEnoughParentScreen from "./src/components/finger5/screens/GoodEnoughParentScreen";
import CopingInfo from './src/components/info/CopingInfo'
import StressDefinitionScreen from "./src/components/opening/stress-definition";
import { Dashboard } from "./src/components/opening/Dashboard";
import { Gauge } from "./src/components/Gauge";
import WelcomeScreen from "./src/components/opening/Intro";
import Finger3App from "./src/components/finger3/Finger3App";
import CopingInfoFinger1 from "./src/components/finger1/info/CopingInfoFinger1";
import CopingInfoFinger2 from "./src/components/finger2/info/CopingInfoFinger2";
import CopingInfoFinger3 from "./src/components/finger3/info/CopingInfoFinger3";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserInfo from "./src/components/UserInfo";
import ToolDetail from "./src/components/toolbox/app/tool/toolId";
import YogaExercise from "./src/components/toolbox/app/exercise/yoga";
import StretchingExercise from "./src/components/toolbox/app/exercise/stretching";

const navigationRef = createNavigationContainerRef();
// ⬇️ שינוי כאן: שימוש ב-createStackNavigator
const Stack = createStackNavigator();

const NO_BARS_SCREENS = ["Register", "Login", "ResetPassword"];


I18nManager.allowRTL(true);
I18nManager.forceRTL(true);


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
  useEffect(()=>{
    const logoff=async ()=>{
      await SecureStore.deleteItemAsync("_id");
      await SecureStore.deleteItemAsync("access_token")
      await SecureStore.deleteItemAsync("full_name")
    }
    //logoff()
  },[])

  return (
    <ErrorProvider>
      <SafeAreaView style={styles.container}>

        {/* 🔝 Top Bar */}
        {!hideBars && (
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigateTo("Breathing")}>
              <Lotus navigateTo={navigateTo}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo("UserInfo")
            }>
              <Image
                source={require("./assets/menu-dots.png")}
                style={styles.menuicon}
              />
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
              initialRouteName="Intro"
              screenOptions={{ 
                headerShown: false,
                // אופציונלי: אנימציה חלקה יותר ב-JS Stack
                animationEnabled: true 
              }}
            >
              <Stack.Screen name="Intro" component={WelcomeScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
              <Stack.Screen name="Hand" component={Hand} />
              <Stack.Screen name="index" component={SC32_Onboarding} />
              <Stack.Screen name="pinky" component={CopingInfoFinger2} />
              <Stack.Screen name="ring" component={CopingInfoFinger1} />
              <Stack.Screen name="thumb" component={Finger5Intro} />
              <Stack.Screen name="Communication" component={SC33_Communication} />
              <Stack.Screen name="Slogan" component={SC35_Slogan} />
              <Stack.Screen name="Dashboard" component={SC36_Dashboard} />
              <Stack.Screen name="toolbox" component={ToolboxLobby} />
              <Stack.Screen name="wisdom" component={CommunityWisdom} />
              <Stack.Screen name="favorites" component={FavoritesPage} />
              <Stack.Screen name="categoryFeed" component={CategoryFeed} />
              <Stack.Screen name="ToolDetail" component={ToolDetail} />
              <Stack.Screen name="YogaExercise" component={YogaExercise} />
              <Stack.Screen name="StretchingExercise" component={StretchingExercise} />
              <Stack.Screen name="Breathing" component={BreathingExercise} />
              <Stack.Screen name="Divrot" component={Divrot} />
              <Stack.Screen name="Finger5Intro" component={Finger5Intro} />
              <Stack.Screen name="WhoSavesTheSavior" component={WhoSavesTheSaviorScreen} />
              <Stack.Screen name="RechargeChecklist" component={RechargeChecklistScreen} />
              <Stack.Screen name="SelfCareChecklist" component={SelfCareChecklistScreen} />
              <Stack.Screen name="GoodEnoughParent" component={GoodEnoughParentScreen} />
              <Stack.Screen name="CopingInfo" component={CopingInfo} />
              <Stack.Screen name="UserInfo" component={UserInfo} />
              <Stack.Screen name="StressDefinitionScreen" component={StressDefinitionScreen} />
              <Stack.Screen name="Dashboard_Dashborad" component={Dashboard} />
              <Stack.Screen name="Gauge" component={Gauge} />
              <Stack.Screen name="middle" component={CopingInfoFinger3} />
              <Stack.Screen name="Finger1" component={Finger1} />
              <Stack.Screen name="Finger2" component={Index} />
               <Stack.Screen name="Finger3" component={Finger3App} />
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

            <TouchableOpacity style={styles.tab} onPress={() => navigateTo("Divrot")}>
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
    backgroundColor: "#f8f8f8",

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
    backgroundColor: "#f8f8f8",
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
  menuicon:{
    width: 24,
    height: 24,
    resizeMode: "contain",
    transform: [{ rotate: '90deg' }],

  }
});