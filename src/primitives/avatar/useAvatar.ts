import { useState, useMemo } from 'react';
import type { AvatarProps, AvatarVariant } from './avatar.types';
import {
  avatarSizeConfig,
  avatarFontSizeConfig,
  avatarNameFontSizeConfig,
  avatarColors,
} from './avatar.types';

// Generate a consistent color based on name
export function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

// Extract initials from name
export function getInitials(name: string): string {
  if (!name || !name.trim()) return '?';

  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

// Get border radius based on variant
export function getBorderRadius(variant: AvatarVariant, size: number): number {
  switch (variant) {
    case 'circle':
      return size / 2;
    case 'rounded':
      return size * 0.2;
    case 'square':
      return 0;
  }
}

export interface UseAvatarResult {
  avatarSize: number;
  fontSize: number;
  nameFontSize: number;
  borderRadius: number;
  hasValidImage: boolean;
  initials: string;
  bgColor: string;
  imageError: boolean;
  setImageError: (error: boolean) => void;
}

export function useAvatar({
  imageUrl,
  name = '',
  size = 'md',
  variant = 'circle',
  backgroundColor,
}: Pick<
  AvatarProps,
  'imageUrl' | 'name' | 'size' | 'variant' | 'backgroundColor'
>): UseAvatarResult {
  const [imageError, setImageError] = useState(false);

  const avatarSize = avatarSizeConfig[size];
  const fontSize = avatarFontSizeConfig[size];
  const nameFontSize = avatarNameFontSizeConfig[size];
  const borderRadius = getBorderRadius(variant, avatarSize);

  const hasValidImage = Boolean(imageUrl && !imageError);
  const initials = useMemo(() => getInitials(name), [name]);
  const bgColor = useMemo(
    () => backgroundColor || getColorFromName(name),
    [backgroundColor, name]
  );

  return {
    avatarSize,
    fontSize,
    nameFontSize,
    borderRadius,
    hasValidImage,
    initials,
    bgColor,
    imageError,
    setImageError,
  };
}
