import { DimensionValue, ViewStyle } from 'react-native';

export interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  style?: ViewStyle;
}

export interface SkeletonTextProps {
  lines?: number;
  lineHeight?: number;
  spacing?: number;
  lastLineWidth?: DimensionValue;
  style?: ViewStyle;
}

export interface SkeletonAvatarProps {
  size?: number;
  style?: ViewStyle;
}

export interface SkeletonCardProps {
  style?: ViewStyle;
}

export interface SkeletonListItemProps {
  hasAvatar?: boolean;
  style?: ViewStyle;
}

export interface SkeletonListProps {
  count?: number;
  hasAvatar?: boolean;
  style?: ViewStyle;
}
