import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';

export interface SelectOption<T = string | number> {
  label: string;
  value: T;
}

export interface SelectFieldProps<T = string | number> {
  label?: string;
  placeholder?: string;
  options: SelectOption<T>[];
  value?: T | null;
  onChange?: (value: T | null) => void;
  error?: string;
  disabled?: boolean;
  clearable?: boolean;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  inputStyle?: ViewStyle;
  renderOption?: (option: SelectOption<T>, isSelected: boolean) => ReactNode;
}
