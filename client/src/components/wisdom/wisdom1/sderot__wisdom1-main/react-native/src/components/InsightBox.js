import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function InsightBox({ children }) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fefce8',
    borderWidth: 2,
    borderColor: '#eab308',
    borderRadius: 12,
    padding: 20,
    marginTop: 8,
  },
});
