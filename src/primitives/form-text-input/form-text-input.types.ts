import type { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import type { TextInputProps } from '../text-input';

export interface FormTextInputProps<T extends FieldValues>
  extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  control: Control<T>;
  name: Path<T>;
  rules?: RegisterOptions<T, Path<T>>;
}
