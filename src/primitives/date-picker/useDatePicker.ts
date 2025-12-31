import { useState, useCallback } from 'react';
import type { DatePickerProps } from './date-picker.types';

/**
 * Shared date picker logic hook
 * Used by all theme implementations
 */
export function useDatePicker(props: DatePickerProps) {
  const { value, onChange, disabled = false, displayFormat } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [tempDate, setTempDate] = useState<Date | null>(value ?? null);

  const openModal = useCallback(() => {
    if (!disabled) {
      setTempDate(value ?? null);
      setModalVisible(true);
    }
  }, [disabled, value]);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleDateChange = useCallback((date: Date | null) => {
    setTempDate(date);
  }, []);

  const handleConfirm = useCallback(() => {
    onChange?.(tempDate);
    closeModal();
  }, [tempDate, onChange, closeModal]);

  const handleClear = useCallback(() => {
    onChange?.(null);
  }, [onChange]);

  const getDisplayValue = useCallback(
    (formatFn: (date: Date, format?: string) => string) => {
      if (!value) return '';
      return formatFn(value, displayFormat);
    },
    [value, displayFormat]
  );

  return {
    modalVisible,
    tempDate,
    isDisabled: disabled,
    hasValue: !!value,
    openModal,
    closeModal,
    handleDateChange,
    handleConfirm,
    handleClear,
    getDisplayValue,
  };
}
