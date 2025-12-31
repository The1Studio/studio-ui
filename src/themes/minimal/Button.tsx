import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useButton, type ButtonProps } from '../../primitives/button';
import { colors } from '../../tokens/colors';
import { spacing, borderRadius } from '../../tokens/spacing';
import { fontSize, fontWeight } from '../../tokens/typography';

/**
 * Minimal theme Button - clean, simple design
 */
export function Button(props: ButtonProps) {
  const { children, variant = 'primary', size = 'md', fullWidth } = props;
  const { handlePress, isDisabled, isLoading, accessibilityProps } = useButton(props);

  const buttonStyle: ViewStyle[] = [
    styles.base,
    styles[`variant_${variant}`],
    styles[`size_${size}`],
    fullWidth && styles.fullWidth,
    isDisabled && styles.disabled,
  ].filter(Boolean) as ViewStyle[];

  const textStyle: TextStyle[] = [
    styles.text,
    styles[`text_${variant}`],
    styles[`text_${size}`],
  ];

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      style={buttonStyle}
      {...accessibilityProps}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.white : colors.primary[600]}
        />
      ) : (
        <Text style={textStyle}>{children}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
  },

  // Variants
  variant_primary: {
    backgroundColor: colors.primary[600],
  },
  variant_secondary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.neutral[300],
  },
  variant_ghost: {
    backgroundColor: colors.transparent,
  },
  variant_danger: {
    backgroundColor: colors.error.main,
  },

  // Sizes
  size_sm: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
  },
  size_md: {
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
  },
  size_lg: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[6],
  },

  // Text
  text: {
    fontWeight: fontWeight.semibold,
    textAlign: 'center',
  },
  text_primary: {
    color: colors.white,
  },
  text_secondary: {
    color: colors.neutral[700],
  },
  text_ghost: {
    color: colors.primary[600],
  },
  text_danger: {
    color: colors.white,
  },
  text_sm: {
    fontSize: fontSize.sm,
  },
  text_md: {
    fontSize: fontSize.base,
  },
  text_lg: {
    fontSize: fontSize.lg,
  },

  // States
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
});
