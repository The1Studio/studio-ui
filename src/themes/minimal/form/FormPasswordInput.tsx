import React, { useState } from 'react';
import {
  View,
  TextInput as RNTextInput,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Controller, FieldValues } from 'react-hook-form';
import type { FormPasswordInputProps } from '../../../primitives';
import { colors } from '../../../tokens';

export type { FormPasswordInputProps };

const DefaultShowIcon = () => <Text style={styles.toggleText}>Show</Text>;
const DefaultHideIcon = () => <Text style={styles.toggleText}>Hide</Text>;

// Standalone password input (non-form version)
export interface PasswordInputProps
  extends Omit<FormPasswordInputProps<FieldValues>, 'control' | 'name' | 'rules'> {
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
}

export function PasswordInput({
  label,
  value,
  onChangeText,
  error,
  containerStyle,
  labelStyle,
  inputStyle,
  errorStyle,
  leftIcon,
  leftIconContainerStyle,
  renderShowIcon = DefaultShowIcon,
  renderHideIcon = DefaultHideIcon,
  rightIconContainerStyle,
  ...props
}: PasswordInputProps) {
  const [isSecure, setIsSecure] = useState(true);

  const toggleSecure = () => setIsSecure((prev) => !prev);

  const hasLeftIcon = !!leftIcon;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={[styles.inputWrapper, error && styles.inputWrapperError]}>
        {hasLeftIcon && (
          <View style={[styles.leftIconContainer, leftIconContainerStyle]}>
            {leftIcon}
          </View>
        )}
        <RNTextInput
          style={[
            styles.input,
            hasLeftIcon && styles.inputWithLeftIcon,
            inputStyle,
          ]}
          placeholderTextColor={colors.textSecondary}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={isSecure}
          {...props}
        />
        <Pressable
          onPress={toggleSecure}
          style={[styles.rightIconContainer, rightIconContainerStyle]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {isSecure ? renderShowIcon() : renderHideIcon()}
        </Pressable>
      </View>
      {error && <Text style={[styles.error, errorStyle]}>{error}</Text>}
    </View>
  );
}

export function FormPasswordInput<T extends FieldValues>({
  control,
  name,
  rules,
  label,
  containerStyle,
  labelStyle,
  inputStyle,
  errorStyle,
  leftIcon,
  leftIconContainerStyle,
  renderShowIcon = DefaultShowIcon,
  renderHideIcon = DefaultHideIcon,
  rightIconContainerStyle,
  ...props
}: FormPasswordInputProps<T>) {
  const [isSecure, setIsSecure] = useState(true);

  const toggleSecure = () => setIsSecure((prev) => !prev);

  const hasLeftIcon = !!leftIcon;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={[styles.container, containerStyle]}>
          {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
          <View
            style={[styles.inputWrapper, error && styles.inputWrapperError]}
          >
            {hasLeftIcon && (
              <View style={[styles.leftIconContainer, leftIconContainerStyle]}>
                {leftIcon}
              </View>
            )}
            <RNTextInput
              style={[
                styles.input,
                hasLeftIcon && styles.inputWithLeftIcon,
                inputStyle,
              ]}
              placeholderTextColor={colors.textSecondary}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={isSecure}
              {...props}
            />
            <Pressable
              onPress={toggleSecure}
              style={[styles.rightIconContainer, rightIconContainerStyle]}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {isSecure ? renderShowIcon() : renderHideIcon()}
            </Pressable>
          </View>
          {error?.message && (
            <Text style={[styles.error, errorStyle]}>{error.message}</Text>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  leftIconContainer: {
    paddingLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 16,
    paddingRight: 12,
    fontSize: 16,
    color: colors.text,
  },
  inputWithLeftIcon: {
    paddingLeft: 12,
  },
  inputWrapperError: {
    borderColor: colors.error,
  },
  rightIconContainer: {
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  error: {
    fontSize: 12,
    color: colors.error,
  },
});
