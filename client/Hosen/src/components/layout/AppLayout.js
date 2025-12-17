import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

export default function AppLayout({ children }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inner}>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 28,
  },
  inner: {
    flex: 1,
  },
});
