import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import type { FormSelectMultipleProps } from '../../../primitives';
import { SelectMultiple } from './SelectMultiple';

export type { FormSelectMultipleProps };

export function FormSelectMultiple<T extends FieldValues, V = string | number>({
  control,
  name,
  rules,
  ...props
}: FormSelectMultipleProps<T, V>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <SelectMultiple<V>
          value={value || []}
          onChange={onChange}
          error={error?.message}
          {...props}
        />
      )}
    />
  );
}
