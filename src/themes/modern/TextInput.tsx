import React from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  StyleSheet,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import { useTextInput, type TextInputProps } from '../../primitives/form';
import { colors } from '../../tokens/colors';
import { spacing, borderRadius } from '../../tokens/spacing';
import { fontSize, fontWeight } from '../../tokens/typography';

const AnimatedView = Animated.View;

/**
 * Modern theme TextInput - with animated border and floating label
 */
export function TextInput(props: TextInputProps) {
  const { label, error, placeholder, secureTextEntry, keyboardType, autoCapitalize } = props;
  const {
    value,
    handleChangeText,
    handleFocus,
    handleBlur,
    isFocused,
    isDisabled,
    hasError,
    accessibilityProps,
  } = useTextInput(props);

  const focusProgress = useSharedValue(0);

  const handleFocusAnimated = () => {
    focusProgress.value = withSpring(1, { damping: 15 });
    handleFocus();
  };

  const handleBlurAnimated = () => {
    focusProgress.value = withSpring(0, { damping: 15 });
    handleBlur();
  };

  const borderAnimatedStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      focusProgress.value,
      [0, 1],
      [colors.neutral[300], colors.primary[500]]
    );
    return {
      borderColor,
      transform: [{ scale: 1 + focusProgress.value * 0.01 }],
    };
  });

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <AnimatedView
        style={[
          styles.inputWrapper,
          borderAnimatedStyle,
          hasError && styles.inputWrapperError,
          isDisabled && styles.inputWrapperDisabled,
        ]}
      >
        <RNTextInput
          value={value}
          onChangeText={handleChangeText}
          onFocus={handleFocusAnimated}
          onBlur={handleBlurAnimated}
          placeholder={placeholder}
          placeholderTextColor={colors.neutral[400]}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={!isDisabled}
          style={styles.input}
          {...accessibilityProps}
        />
      </AnimatedView>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[4],
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.neutral[700],
    marginBottom: spacing[2],
  },
  inputWrapper: {
    backgroundColor: colors.neutral[50],
    borderWidth: 2,
    borderColor: colors.neutral[300],
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  inputWrapperError: {
    borderColor: colors.error.main,
  },
  inputWrapperDisabled: {
    backgroundColor: colors.neutral[200],
    opacity: 0.7,
  },
  input: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    fontSize: fontSize.base,
    color: colors.neutral[900],
  },
  error: {
    fontSize: fontSize.sm,
    color: colors.error.main,
    marginTop: spacing[1],
    fontWeight: fontWeight.medium,
  },
});
