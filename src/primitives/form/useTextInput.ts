import { useCallback, useState } from 'react';
import type { TextInputProps } from './form.types';

/**
 * Shared text input logic hook
 * Used by all theme implementations
 */
export function useTextInput(props: TextInputProps) {
  const { value, onChangeText, disabled } = props;
  const [isFocused, setIsFocused] = useState(false);

  const handleChangeText = useCallback(
    (text: string) => {
      if (disabled) return;
      onChangeText(text);
    },
    [onChangeText, disabled]
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return {
    value,
    handleChangeText,
    handleFocus,
    handleBlur,
    isFocused,
    isDisabled: disabled ?? false,
    hasError: !!props.error,
    accessibilityProps: {
      accessibilityRole: 'text' as const,
      accessibilityState: {
        disabled: disabled,
      },
    },
  };
}
