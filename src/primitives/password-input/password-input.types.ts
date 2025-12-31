import type { ReactNode } from 'react';
import type {
  TextInputProps as RNTextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import type { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';

export interface PasswordInputProps
  extends Omit<RNTextInputProps, 'secureTextEntry'> {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  errorStyle?: TextStyle;
  leftIcon?: ReactNode;
  leftIconContainerStyle?: ViewStyle;
  renderShowIcon?: () => ReactNode;
  renderHideIcon?: () => ReactNode;
  rightIconContainerStyle?: ViewStyle;
}

export interface FormPasswordInputProps<T extends FieldValues>
  extends Omit<PasswordInputProps, 'value' | 'onChangeText'> {
  control: Control<T>;
  name: Path<T>;
  rules?: RegisterOptions<T, Path<T>>;
}
