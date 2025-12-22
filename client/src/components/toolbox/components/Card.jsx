import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';



export function Card({ children, onPress, style, accentColor }) {
  const CardContent = () => (
    <View style={[styles.card, style]}>
      <View style={styles.content}>
        {children}
      </View>
      {accentColor && <View style={[styles.accent, { backgroundColor: accentColor }]} />}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
      >
        <CardContent />
      </TouchableOpacity>
    );
  }

  return <CardContent />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  accent: {
    width: 8,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});
