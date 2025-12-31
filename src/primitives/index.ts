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

// TextInput
export type { TextInputProps } from './text-input';

// RadioButton
export { radioButtonSizeConfig } from './radio-button';
export type {
  RadioOption,
  RadioButtonProps,
  RadioGroupProps,
  RadioButtonSize,
} from './radio-button';

// SelectField
export { useSelectField } from './select-field';
export type { SelectOption, SelectFieldProps } from './select-field';

// SelectMultiple
export { useSelectMultiple } from './select-multiple';
export type {
  SelectMultipleOption,
  SelectMultipleProps,
} from './select-multiple';

// DatePicker
export { useDatePicker } from './date-picker';
export type { DatePickerProps, FormDatePickerProps } from './date-picker';

// DateRangePicker
export { useDateRangePicker } from './date-range-picker';
export type { DateRange, DateRangePickerProps, FormDateRangePickerProps } from './date-range-picker';

// PasswordInput
export type { PasswordInputProps, FormPasswordInputProps } from './password-input';

// FormTextInput
export type { FormTextInputProps } from './form-text-input';

// FormSelectField
export type { FormSelectFieldProps } from './form-select-field';

// FormSelectMultiple
export type { FormSelectMultipleProps } from './form-select-multiple';

// FormCheckbox
export type { FormCheckboxProps } from './form-checkbox';

// FormRadioGroup
export type { FormRadioGroupProps } from './form-radio-group';
