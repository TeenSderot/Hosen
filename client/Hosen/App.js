import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import SC32_Onboarding from "./src/components/SC32_Onboarding";
// import SC35_Slogan from "./src/components/SC35_Slogan";
// import SC33_Communication from "./src/components/SC33_Communication";
// import SC36_Dashboard from "./src/components/SC36_Dashboard";
import UserInfo from "./src/components/UserInfo";
import { ErrorProvider } from "./src/components/hooks/context/ErrorContext";
import HomeScreen from "./src/components/hand/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ErrorProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="UserInfo"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="UserInfo" component={UserInfo} />
       <Stack.Screen name="Hand" component={HomeScreen} />

        {/* <Stack.Screen name="Communication" component={SC33_Communication} />
        <Stack.Screen name="Onboarding" component={SC32_Onboarding} />
        <Stack.Screen name="Slogan" component={SC35_Slogan} />
        <Stack.Screen name="Dashboard" component={SC36_Dashboard} /> */}
      </Stack.Navigator>
    </NavigationContainer></ErrorProvider>
  );
}
