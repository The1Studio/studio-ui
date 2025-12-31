import { useCallback } from 'react';
import type { ButtonProps } from './button.types';

/**
 * Shared button logic hook
 * Used by all theme implementations
 */
export function useButton(props: ButtonProps) {
  const { onPress, disabled, isLoading } = props;
  const isDisabled = disabled || isLoading;

  const handlePress = useCallback(() => {
    if (isDisabled) return;
    onPress();
  }, [onPress, isDisabled]);

  return {
    handlePress,
    isDisabled,
    isLoading: isLoading ?? false,
    accessibilityProps: {
      accessibilityRole: 'button' as const,
      accessibilityState: {
        disabled: isDisabled,
        busy: isLoading,
      },
    },
  };
}
