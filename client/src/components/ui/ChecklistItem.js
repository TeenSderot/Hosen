import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ChecklistItem({ text, checked, onChange }) {
  return (
    <Pressable
      onPress={() => onChange(!checked)}
      style={styles.row}
    >
      <View style={[styles.box, checked ? styles.boxChecked : null]}>
        {checked ? <Text style={styles.tick}>✓</Text> : null}
      </View>

      <Text style={styles.label}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 10,
  },
  box: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2A3340',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  boxChecked: {
    backgroundColor: '#4F8CFF',
    borderColor: '#4F8CFF',
  },
  tick: {
    color: '#06101F',
    fontWeight: '900',
  },
  label: {
    flex: 1,
    color: '#E6EEF8',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'right',
  },
});
