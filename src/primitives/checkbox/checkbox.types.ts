import type { ViewStyle, TextStyle } from 'react-native';

export type CheckboxSize = 'small' | 'medium' | 'large';

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  error?: string;
  size?: CheckboxSize;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
}

export const checkboxSizeConfig = {
  small: { box: 18, check: 10, fontSize: 14 },
  medium: { box: 22, check: 12, fontSize: 16 },
  large: { box: 26, check: 14, fontSize: 18 },
} as const;
