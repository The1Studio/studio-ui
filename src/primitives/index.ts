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
