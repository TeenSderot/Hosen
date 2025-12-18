import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

interface PillProps {
  children: React.ReactNode;
  color?: string;
}

export function Pill({ children, color }: PillProps) {
  return (
    <View style={[styles.pill, color && { backgroundColor: color }]}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
  },
  text: {
    fontSize: 13,
    color: Colors.text.secondary,
    fontFamily: 'Rubik-Medium',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});
