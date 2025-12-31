import type { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import type { SelectMultipleProps } from '../select-multiple';

export interface FormSelectMultipleProps<T extends FieldValues, V = string | number>
  extends Omit<SelectMultipleProps<V>, 'value' | 'onChange'> {
  control: Control<T>;
  name: Path<T>;
  rules?: RegisterOptions<T, Path<T>>;
}
