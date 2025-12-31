import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';

export interface SelectMultipleOption<T = string | number> {
  label: string;
  value: T;
}

export interface SelectMultipleProps<T = string | number> {
  label?: string;
  placeholder?: string;
  options: SelectMultipleOption<T>[];
  value?: T[];
  onChange?: (value: T[]) => void;
  error?: string;
  disabled?: boolean;
  clearable?: boolean;
  maxSelected?: number;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  inputStyle?: ViewStyle;
  renderOption?: (option: SelectMultipleOption<T>, isSelected: boolean) => ReactNode;
}
