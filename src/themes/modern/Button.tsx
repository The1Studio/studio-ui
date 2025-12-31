import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useButton, type ButtonProps } from '../../primitives/button';
import { colors } from '../../tokens/colors';
import { spacing, borderRadius } from '../../tokens/spacing';
import { fontSize, fontWeight } from '../../tokens/typography';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * Modern theme Button - with spring animations
 */
export function Button(props: ButtonProps) {
  const { children, variant = 'primary', size = 'md', fullWidth } = props;
  const { handlePress, isDisabled, isLoading, accessibilityProps } = useButton(props);

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(scale.value, { damping: 15, stiffness: 300 }) }],
  }));

  const handlePressIn = () => {
    scale.value = 0.95;
  };

  const handlePressOut = () => {
    scale.value = 1;
  };

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
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      style={[buttonStyle, animatedStyle]}
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
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
    // Modern shadow
    shadowColor: colors.primary[600],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  // Variants
  variant_primary: {
    backgroundColor: colors.primary[600],
  },
  variant_secondary: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary[200],
    shadowColor: colors.neutral[400],
  },
  variant_ghost: {
    backgroundColor: colors.transparent,
    shadowOpacity: 0,
    elevation: 0,
  },
  variant_danger: {
    backgroundColor: colors.error.main,
    shadowColor: colors.error.main,
  },

  // Sizes
  size_sm: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
  },
  size_md: {
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[5],
  },
  size_lg: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[8],
  },

  // Text
  text: {
    fontWeight: fontWeight.bold,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  text_primary: {
    color: colors.white,
  },
  text_secondary: {
    color: colors.primary[600],
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
