import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SC32_Onboarding from './src/components/SC32_Onboarding';
import SC33_Communication from './src/components/SC33_Communication';
import SC35_Slogan from './src/components/SC35_Slogan';
import SC36_Dashboard from './src/components/SC36_Dashboard';

export default function App() {
  return (
    <View style={styles.container}>
 {/* <SC32_Onboarding/> */}
 {/* <SC33_Communication/> */}
 <SC36_Dashboard/>
       <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
