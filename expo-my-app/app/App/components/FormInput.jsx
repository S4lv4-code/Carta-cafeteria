import React from 'react';
import { TextInput, StyleSheet, Dimensions } from 'react-native';
import { colors, spacing } from '../theme';

const { width } = Dimensions.get('window');
const isMobile = width < 600;

export function FormInput({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  style,
}) {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      style={[styles.input, style]}
      placeholderTextColor="#999"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: 6,
    marginBottom: spacing.sm,
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
    fontSize: isMobile ? 12 : 13,
    backgroundColor: '#fff',
    width: isMobile ? '90%' : '80%',
  },
});
