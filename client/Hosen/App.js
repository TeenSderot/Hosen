import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SC32_Onboarding from "./src/components/finger4/SC32_Onboarding";
import SC35_Slogan from "./src/components/finger4/SC35_Slogan";
import SC33_Communication from "./src/components/finger4/SC33_Communication";
import SC36_Dashboard from "./src/components/finger4/SC36_Dashboard";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={SC32_Onboarding} />
        <Stack.Screen name="Slogan" component={SC35_Slogan} />
        <Stack.Screen name="Communication" component={SC33_Communication} />
        <Stack.Screen name="Dashboard" component={SC36_Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
