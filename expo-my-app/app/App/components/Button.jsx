import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { colors, spacing } from '../theme';

const { width } = Dimensions.get('window');
const isMobile = width < 600;

export function PrimaryButton({ onPress, children, style }) {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[styles.button, style]}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

export function IconButton({ onPress, children, danger = false, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.iconButton,
        danger && styles.danger,
        !danger && style,
        danger && style,
      ]}
      activeOpacity={0.7}
    >
      <Text style={[styles.iconText, danger ? styles.dangerText : null]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export function SmallButton({ onPress, children, style }) {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[styles.smallButton, style]}
      activeOpacity={0.7}
    >
      <Text style={styles.smallText}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 6,
    alignItems: 'center',
    minHeight: isMobile ? 44 : 40,
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontWeight: '600',
    fontSize: isMobile ? 13 : 14,
  },
  iconButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    marginLeft: spacing.sm,
    minHeight: 40,
    justifyContent: 'center',
  },
  iconText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: isMobile ? 11 : 12,
  },
  danger: {
    backgroundColor: 'transparent',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  dangerText: {
    color: colors.primaryDark,
  },
  smallButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 6,
    marginLeft: spacing.sm,
    minHeight: 40,
    justifyContent: 'center',
  },
  smallText: {
    color: colors.white,
    fontSize: isMobile ? 11 : 12,
  },
});
