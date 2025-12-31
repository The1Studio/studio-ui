import type { ReactNode } from 'react';
import type { TextInputProps as RNTextInputProps, ViewStyle, TextStyle } from 'react-native';

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  errorStyle?: TextStyle;
  leftIcon?: ReactNode;
  leftIconContainerStyle?: ViewStyle;
  rightIcon?: ReactNode;
  rightIconContainerStyle?: ViewStyle;
  onRightIconPress?: () => void;
}
