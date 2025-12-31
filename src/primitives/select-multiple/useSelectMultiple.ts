import { useState, useCallback } from 'react';
import type { SelectMultipleOption, SelectMultipleProps } from './select-multiple.types';

/**
 * Shared select multiple logic hook
 * Used by all theme implementations
 */
export function useSelectMultiple<T = string | number>(props: SelectMultipleProps<T>) {
  const {
    options,
    value = [],
    onChange,
    disabled = false,
    clearable = true,
    maxSelected,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const selectedOptions = options.filter((opt) => value.includes(opt.value));
  const hasSelection = selectedOptions.length > 0;
  const showClearButton = clearable && hasSelection && !disabled;
  const isMaxReached = maxSelected ? value.length >= maxSelected : false;

  const handleOpen = useCallback(() => {
    if (!disabled) {
      setIsOpen(true);
    }
  }, [disabled]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleToggle = useCallback(
    (option: SelectMultipleOption<T>) => {
      const isSelected = value.includes(option.value);
      let newValue: T[];

      if (isSelected) {
        newValue = value.filter((v) => v !== option.value);
      } else {
        if (maxSelected && value.length >= maxSelected) {
          return;
        }
        newValue = [...value, option.value];
      }

      onChange?.(newValue);
    },
    [onChange, value, maxSelected]
  );

  const handleRemoveItem = useCallback(
    (itemValue: T) => {
      const newValue = value.filter((v) => v !== itemValue);
      onChange?.(newValue);
    },
    [onChange, value]
  );

  const handleClearAll = useCallback(() => {
    onChange?.([]);
  }, [onChange]);

  const isSelected = useCallback(
    (optionValue: T) => value.includes(optionValue),
    [value]
  );

  const isOptionDisabled = useCallback(
    (optionValue: T) => {
      if (!maxSelected) return false;
      return !value.includes(optionValue) && value.length >= maxSelected;
    },
    [value, maxSelected]
  );

  return {
    isOpen,
    isDisabled: disabled,
    selectedOptions,
    hasSelection,
    showClearButton,
    isMaxReached,
    selectedCount: selectedOptions.length,
    handleOpen,
    handleClose,
    handleToggle,
    handleRemoveItem,
    handleClearAll,
    isSelected,
    isOptionDisabled,
  };
}
