import { useCallback } from 'react';
import type { CheckboxProps } from './checkbox.types';

/**
 * Shared checkbox logic hook
 * Used by all theme implementations
 */
export function useCheckbox(props: CheckboxProps) {
  const { checked = false, onChange, disabled = false } = props;

  const handlePress = useCallback(() => {
    if (!disabled) {
      onChange?.(!checked);
    }
  }, [checked, onChange, disabled]);

  return {
    isChecked: checked,
    isDisabled: disabled,
    handlePress,
  };
}
