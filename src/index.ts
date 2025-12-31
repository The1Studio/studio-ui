/**
 * @studio/ui - Component Library
 *
 * Build-time theme selection based on EXPO_PUBLIC_THEME env variable.
 * NO DI needed - themes are selected at build time for optimal bundle size.
 *
 * @example
 * // In .env or build command:
 * // EXPO_PUBLIC_THEME=minimal (default)
 * // EXPO_PUBLIC_THEME=modern
 *
 * import { Button, Checkbox, BottomSheetModal } from '@studio/ui';
 *
 * // Or use primitives for custom components:
 * import { useButton, useCheckbox } from '@studio/ui/primitives';
 */

import * as minimal from './themes/minimal';
import * as modern from './themes/modern';

// Theme registry
const themes = {
  minimal,
  modern,
} as const;

type ThemeName = keyof typeof themes;

// Get theme from env (default: minimal)
const THEME_NAME = (process.env.EXPO_PUBLIC_THEME || 'minimal') as ThemeName;

// Validate theme exists
if (!(THEME_NAME in themes)) {
  console.warn(
    `[studio-ui] Unknown theme "${THEME_NAME}", falling back to "minimal". ` +
      `Available themes: ${Object.keys(themes).join(', ')}`
  );
}

// Get selected theme (fallback to minimal)
const selectedTheme = themes[THEME_NAME] || themes.minimal;

// Re-export selected theme's components
export const {
  // Core
  Button,
  Card,
  Spacer,
  Text,
  // Form - Base Components
  Checkbox,
  TextInput,
  RadioButton,
  RadioGroup,
  SelectField,
  SelectMultiple,
  DatePicker,
  DateRangePicker,
  // Form - react-hook-form Components
  FormTextInput,
  FormSelectField,
  FormSelectMultiple,
  FormCheckbox,
  FormRadioGroup,
  FormPasswordInput,
  PasswordInput,
  FormDatePicker,
  FormDateRangePicker,
  // Overlays
  BottomSheetModal,
  ConfirmModal,
  DeleteConfirmModal,
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonListItem,
  SkeletonList,
  // Shared
  CollapsibleCard,
  SwipeableCard,
  SwipeableCardProvider,
  useSwipeableContext,
  Avatar,
  AvatarImage,
  AvatarWithName,
  // Icons
  CloseIcon,
  ArrowDownIcon,
  CalendarIcon,
} = selectedTheme;

// Export primitives for custom components
export * from './primitives';

// Export tokens for styling
export * from './tokens';
export * from './utils';

// Export theme name for debugging
export const currentTheme = THEME_NAME;
