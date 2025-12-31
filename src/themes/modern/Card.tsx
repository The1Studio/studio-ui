import React from 'react';
import { StyleSheet, type ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { colors } from '../../tokens/colors';
import { spacing, borderRadius } from '../../tokens/spacing';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  pressable?: boolean;
  onPress?: () => void;
}

/**
 * Modern theme Card - with hover/press animations
 */
export function Card({
  children,
  variant = 'elevated',
  pressable = false,
  onPress,
  style,
  ...props
}: CardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(scale.value, { damping: 15, stiffness: 300 }) }],
  }));

  const handlePressIn = () => {
    if (pressable) {
      scale.value = 0.98;
    }
  };

  const handlePressOut = () => {
    if (pressable) {
      scale.value = 1;
    }
  };

  return (
    <Animated.View
      style={[styles.base, styles[variant], animatedStyle, style]}
      onTouchStart={handlePressIn}
      onTouchEnd={handlePressOut}
      {...props}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.xl,
    padding: spacing[5],
  },
  elevated: {
    backgroundColor: colors.white,
    shadowColor: colors.primary[900],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
  },
  outlined: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.neutral[200],
  },
  filled: {
    backgroundColor: colors.neutral[50],
  },
});
