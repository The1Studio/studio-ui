import React from 'react';
import { View, StyleSheet, type ViewProps } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing, borderRadius } from '../../tokens/spacing';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
}

/**
 * Minimal theme Card - clean container component
 */
export function Card({ children, variant = 'elevated', style, ...props }: CardProps) {
  return (
    <View style={[styles.base, styles[variant], style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.lg,
    padding: spacing[4],
  },
  elevated: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  outlined: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  filled: {
    backgroundColor: colors.neutral[100],
  },
});
