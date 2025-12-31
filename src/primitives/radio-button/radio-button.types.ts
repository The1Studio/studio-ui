import type { ViewStyle, TextStyle, StyleProp } from 'react-native';

export type RadioButtonSize = 'small' | 'medium' | 'large';

export interface RadioOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface RadioButtonProps<T = string> {
  selected?: boolean;
  onPress?: () => void;
  label?: string;
  disabled?: boolean;
  size?: RadioButtonSize;
  style?: StyleProp<ViewStyle>;
  labelStyle?: TextStyle;
}

export interface RadioGroupProps<T = string> {
  options: RadioOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  size?: RadioButtonSize;
  direction?: 'vertical' | 'horizontal';
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  optionStyle?: ViewStyle;
}

export const radioButtonSizeConfig = {
  small: { outer: 18, inner: 8, fontSize: 14 },
  medium: { outer: 22, inner: 10, fontSize: 16 },
  large: { outer: 26, inner: 12, fontSize: 18 },
} as const;
