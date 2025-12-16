import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { getString } from ;

export default function Index({ navigation }) {
  useEffect(() => {
    let mounted = true;

    (async () => {
      const hasSlogan = await getString('familySlogan');
      if (!mounted) return;

      if (hasSlogan) {
        navigation.replace('Communication');
      } else {
        navigation.replace('Onboarding');
      }
    })();

    return () => {
      mounted = false;
    };
  }, [navigation]);

  return (
    <View style={styles.root}>
      <Text style={styles.icon}>🛡️</Text>
      <ActivityIndicator />
      <Text style={styles.text}>טוען...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B0F14',
    gap: 10,
  },
  icon: {
    fontSize: 36,
  },
  text: {
    color: '#AFC0D6',
  },
});
