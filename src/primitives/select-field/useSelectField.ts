import { useState, useCallback } from 'react';
import type { SelectOption, SelectFieldProps } from './select-field.types';

/**
 * Shared select field logic hook
 * Used by all theme implementations
 */
export function useSelectField<T = string | number>(props: SelectFieldProps<T>) {
  const { options, value, onChange, disabled = false, clearable = true } = props;

  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);
  const showClearButton = clearable && !!selectedOption && !disabled;

  const handleOpen = useCallback(() => {
    if (!disabled) {
      setIsOpen(true);
    }
  }, [disabled]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSelect = useCallback(
    (option: SelectOption<T>) => {
      onChange?.(option.value);
      setIsOpen(false);
    },
    [onChange]
  );

  const handleClear = useCallback(() => {
    onChange?.(null);
  }, [onChange]);

  const isSelected = useCallback(
    (optionValue: T) => value === optionValue,
    [value]
  );

  return {
    isOpen,
    isDisabled: disabled,
    selectedOption,
    showClearButton,
    handleOpen,
    handleClose,
    handleSelect,
    handleClear,
    isSelected,
  };
}
