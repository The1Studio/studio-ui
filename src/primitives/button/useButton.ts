import { useCallback } from 'react';
import type { ButtonProps } from './button.types';

/**
 * Shared button logic hook
 * Used by all theme implementations
 */
export function useButton(props: ButtonProps) {
  const { onPress, disabled, loading } = props;
  const isDisabled = disabled || loading;

  const handlePress = useCallback(() => {
    if (isDisabled) return;
    onPress();
  }, [onPress, isDisabled]);

  return {
    handlePress,
    isDisabled,
    isLoading: loading ?? false,
    accessibilityProps: {
      role: 'button' as const,
      accessibilityRole: 'button' as const,
      accessibilityState: {
        disabled: isDisabled,
        busy: loading,
      },
    },
  };
}
