import type { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import type { RadioGroupProps } from '../radio-button';

export interface FormRadioGroupProps<T extends FieldValues, V = string>
  extends Omit<RadioGroupProps<V>, 'value' | 'onChange' | 'error'> {
  control: Control<T>;
  name: Path<T>;
  rules?: RegisterOptions<T, Path<T>>;
}
