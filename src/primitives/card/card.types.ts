import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

export type CardVariant = 'default' | 'outlined' | 'elevated';

export interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  style?: ViewStyle;
}
