import React from 'react';
import {StyleSheet, TextInput, ViewStyle, TextStyle} from 'react-native';

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
};

export default function Input({value, onChangeText, placeholder, style, inputStyle}: Props) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#8CA0B8"
      style={[styles.input, style, inputStyle]}
      textAlign="right"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#101824',
    borderColor: '#2A3340',
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 18,
    color: '#E6EEF8',
  },
});
