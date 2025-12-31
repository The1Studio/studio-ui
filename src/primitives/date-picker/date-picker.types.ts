import type { ViewStyle } from 'react-native';
import type { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';

export interface DatePickerProps {
  /** Selected date value */
  value?: Date | null;
  /** Callback when date is selected */
  onChange?: (date: Date | null) => void;
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
  /** Whether to show time picker */
  timePicker?: boolean;
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

export interface FormDatePickerProps<T extends FieldValues>
  extends Omit<DatePickerProps, 'value' | 'onChange' | 'error'> {
  control: Control<T>;
  name: Path<T>;
  rules?: RegisterOptions<T, Path<T>>;
}
