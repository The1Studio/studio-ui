import { useState, useCallback } from 'react';
import type { DateRange, DateRangePickerProps } from './date-range-picker.types';

export interface DateRangePickerState {
  tempStartDate: Date | null;
  tempEndDate: Date | null;
}

/**
 * Shared date range picker logic hook
 * Used by all theme implementations
 */
export function useDateRangePicker(props: DateRangePickerProps) {
  const { value, onChange, disabled = false, displayFormat } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [tempRange, setTempRange] = useState<DateRangePickerState>({
    tempStartDate: value?.startDate ?? null,
    tempEndDate: value?.endDate ?? null,
  });

  const openModal = useCallback(() => {
    if (!disabled) {
      setTempRange({
        tempStartDate: value?.startDate ?? null,
        tempEndDate: value?.endDate ?? null,
      });
      setModalVisible(true);
    }
  }, [disabled, value]);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleDateChange = useCallback(
    (startDate: Date | null, endDate: Date | null) => {
      setTempRange({ tempStartDate: startDate, tempEndDate: endDate });
    },
    []
  );

  const handleConfirm = useCallback(() => {
    onChange?.({
      startDate: tempRange.tempStartDate,
      endDate: tempRange.tempEndDate,
    });
    closeModal();
  }, [tempRange, onChange, closeModal]);

  const handleClear = useCallback(() => {
    onChange?.(null);
  }, [onChange]);

  const getDisplayValue = useCallback(
    (formatFn: (date: Date, format?: string) => string) => {
      if (!value?.startDate) return '';
      const startStr = formatFn(value.startDate, displayFormat);
      if (!value.endDate) return startStr;
      const endStr = formatFn(value.endDate, displayFormat);
      return `${startStr} - ${endStr}`;
    },
    [value, displayFormat]
  );

  return {
    modalVisible,
    tempStartDate: tempRange.tempStartDate,
    tempEndDate: tempRange.tempEndDate,
    isDisabled: disabled,
    hasValue: !!value?.startDate,
    openModal,
    closeModal,
    handleDateChange,
    handleConfirm,
    handleClear,
    getDisplayValue,
  };
}
