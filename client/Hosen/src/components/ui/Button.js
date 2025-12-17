import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';

export default function Button({
  title,
  onPress,
  disabled,
  loading,
  variant = 'solid',
  style,
  textStyle,
  leftIcon,
  rightIcon,
}) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        variant === 'solid' ? styles.solid : styles.outline,
        isDisabled ? styles.disabled : null,
        pressed && !isDisabled ? styles.pressed : null,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          {leftIcon || null}

          <Text
            style={[
              styles.text,
              variant === 'solid' ? styles.textSolid : styles.textOutline,
              textStyle,
            ]}
          >
            {title}
          </Text>

          {rightIcon || null}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    borderRadius: 999,
  },
  solid: {
    backgroundColor: '#4F8CFF',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#2A3340',
  },
  disabled: {
    opacity: 0.55,
  },
  pressed: {
    transform: [{ scale: 0.99 }],
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
  textSolid: {
    color: '#06101F',
  },
  textOutline: {
    color: '#E6EEF8',
  },
});
