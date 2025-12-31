import React from 'react';
import { View } from 'react-native';
import { spacing } from '../../../tokens';
import type { SpacerProps, SpacerSize } from '../../../primitives';

export { type SpacerProps, type SpacerSize };

const sizeMap: Record<SpacerSize, number> = {
  xs: spacing.xs,
  sm: spacing.sm,
  md: spacing.md,
  lg: spacing.lg,
  xl: spacing.xl,
  xxl: spacing.xxl,
};

export function Spacer({ size = 'md', horizontal = false }: SpacerProps) {
  const sizeValue = typeof size === 'string' ? sizeMap[size] : size;

  return <View style={horizontal ? { width: sizeValue } : { height: sizeValue }} />;
}
