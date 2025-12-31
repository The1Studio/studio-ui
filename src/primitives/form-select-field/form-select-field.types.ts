import type { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import type { SelectFieldProps } from '../select-field';

export interface FormSelectFieldProps<T extends FieldValues, V = string | number>
  extends Omit<SelectFieldProps<V>, 'value' | 'onChange'> {
  control: Control<T>;
  name: Path<T>;
  rules?: RegisterOptions<T, Path<T>>;
}
