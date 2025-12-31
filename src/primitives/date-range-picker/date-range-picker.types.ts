import type { ViewStyle } from 'react-native';
import type { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface DateRangePickerProps {
  /** Selected date range value */
  value?: DateRange | null;
  /** Callback when date range is selected */
  onChange?: (range: DateRange | null) => void;
  /** Label text */
  label?: string;
  /** Placeholder text when no date selected */
  placeholder?: string;
  /** Date format for display */
  displayFormat?: string;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether the field can be cleared */
  clearable?: boolean;
  /** Error message */
  error?: string;
  /** Container style */
  containerStyle?: ViewStyle;
  /** Title for the modal */
  modalTitle?: string;
}

export interface FormDateRangePickerProps<T extends FieldValues>
  extends Omit<DateRangePickerProps, 'value' | 'onChange' | 'error'> {
  control: Control<T>;
  name: Path<T>;
  rules?: RegisterOptions<T, Path<T>>;
}
