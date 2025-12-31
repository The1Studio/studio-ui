/**
 * Typography tokens - font sizes, weights, line heights
 * Using moderateScale for responsive sizing
 */
import { TextStyle } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export const typography: Record<string, TextStyle> = {
  h1: {
    fontSize: moderateScale(32),
    lineHeight: moderateScale(40),
    fontWeight: '700',
  },
  h2: {
    fontSize: moderateScale(24),
    lineHeight: moderateScale(32),
    fontWeight: '600',
  },
  body: {
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
  },
  caption: {
    fontSize: moderateScale(12),
    lineHeight: moderateScale(16),
  },
} as const;

// Individual tokens for fine-grained control
export const fontSize = {
  xs: moderateScale(12),
  sm: moderateScale(14),
  base: moderateScale(16),
  lg: moderateScale(18),
  xl: moderateScale(20),
  '2xl': moderateScale(24),
  '3xl': moderateScale(30),
  '4xl': moderateScale(36),
} as const;

export const fontWeight = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const lineHeight = {
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.75,
} as const;

export type FontSize = typeof fontSize;
export type FontWeight = typeof fontWeight;
export type LineHeight = typeof lineHeight;
