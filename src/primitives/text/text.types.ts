import type { ReactNode } from 'react';
import type { TextStyle } from 'react-native';

export type TextVariant = 'h1' | 'h2' | 'body' | 'caption';

export interface TextProps {
  children: ReactNode;
  variant?: TextVariant;
  style?: TextStyle;
  color?: string;
}
