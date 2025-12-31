/**
 * Primitives - shared component logic and types
 *
 * Each primitive provides:
 * - Types/interfaces for component props
 * - Hooks with shared logic (state, handlers, accessibility)
 */

// Button
export { useButton } from './button';
export type { ButtonProps, ButtonVariant } from './button';

// Checkbox
export { useCheckbox, checkboxSizeConfig } from './checkbox';
export type { CheckboxProps, CheckboxSize } from './checkbox';

// BottomSheetModal
export { useBottomSheetModal } from './bottom-sheet-modal';
export type { BottomSheetModalProps } from './bottom-sheet-modal';

// CollapsibleCard
export { useCollapsibleCard } from './collapsible-card';
export type { CollapsibleCardProps } from './collapsible-card';

// Icon
export type { IconProps } from './icon';

// Card
export type { CardProps, CardVariant } from './card';

// Spacer
export type { SpacerProps, SpacerSize } from './spacer';

// Text
export type { TextProps, TextVariant } from './text';

// ConfirmModal
export type {
  ConfirmModalProps,
  ConfirmModalVariant,
  DeleteConfirmModalProps,
} from './confirm-modal';

// Skeleton
export type {
  SkeletonProps,
  SkeletonTextProps,
  SkeletonAvatarProps,
  SkeletonCardProps,
  SkeletonListItemProps,
  SkeletonListProps,
} from './skeleton';

// SwipeableCard
export type {
  SwipeableCardProps,
  SwipeableCardProviderProps,
} from './swipeable-card';

// Avatar
export {
  useAvatar,
  getColorFromName,
  getInitials,
  getBorderRadius,
  avatarSizeConfig,
  avatarFontSizeConfig,
  avatarNameFontSizeConfig,
  avatarColors,
} from './avatar';
export type { AvatarProps, AvatarSize, AvatarVariant } from './avatar';
