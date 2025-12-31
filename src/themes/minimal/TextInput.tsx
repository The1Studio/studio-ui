import React from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  StyleSheet,
} from 'react-native';
import { useTextInput, type TextInputProps } from '../../primitives/form';
import { colors } from '../../tokens/colors';
import { spacing, borderRadius } from '../../tokens/spacing';
import { fontSize } from '../../tokens/typography';

/**
 * Minimal theme TextInput - clean, simple design
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

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNTextInput
        value={value}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        placeholderTextColor={colors.neutral[400]}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        editable={!isDisabled}
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          hasError && styles.inputError,
          isDisabled && styles.inputDisabled,
        ]}
        {...accessibilityProps}
      />
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
    fontWeight: '500',
    color: colors.neutral[700],
    marginBottom: spacing[1],
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: borderRadius.md,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[3],
    fontSize: fontSize.base,
    color: colors.neutral[900],
  },
  inputFocused: {
    borderColor: colors.primary[500],
  },
  inputError: {
    borderColor: colors.error.main,
  },
  inputDisabled: {
    backgroundColor: colors.neutral[100],
    opacity: 0.7,
  },
  error: {
    fontSize: fontSize.sm,
    color: colors.error.main,
    marginTop: spacing[1],
  },
});
