import type { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarVariant = 'circle' | 'rounded' | 'square';

export interface AvatarProps {
  /** Image URL */
  imageUrl?: string | null;
  /** Name to display or extract initials from */
  name?: string;
  /** Size of the avatar */
  size?: AvatarSize;
  /** Shape variant */
  variant?: AvatarVariant;
  /** Show full name next to avatar */
  showName?: boolean;
  /** Position of the name */
  namePosition?: 'right' | 'bottom';
  /** Custom background color for initials */
  backgroundColor?: string;
  /** Custom text color for initials */
  textColor?: string;
  /** Container style */
  style?: ViewStyle;
  /** Image style override */
  imageStyle?: ImageStyle;
  /** Name text style override */
  nameStyle?: TextStyle;
  /** Initials text style override */
  initialsStyle?: TextStyle;
}

// Size configuration for avatar dimensions
export const avatarSizeConfig: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
};

// Font size configuration for initials
export const avatarFontSizeConfig: Record<AvatarSize, number> = {
  xs: 10,
  sm: 12,
  md: 16,
  lg: 22,
  xl: 32,
};

// Font size configuration for name text
export const avatarNameFontSizeConfig: Record<AvatarSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
};

// Color palette for auto-generated avatar backgrounds
export const avatarColors = [
  '#6366f1', // indigo
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#f43f5e', // rose
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#14b8a6', // teal
  '#06b6d4', // cyan
  '#3b82f6', // blue
];
