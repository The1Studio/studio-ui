import type { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import type { CheckboxProps } from '../checkbox';

export interface FormCheckboxProps<T extends FieldValues>
  extends Omit<CheckboxProps, 'checked' | 'onChange' | 'error'> {
  control: Control<T>;
  name: Path<T>;
  rules?: RegisterOptions<T, Path<T>>;
}
