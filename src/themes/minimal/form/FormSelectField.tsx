import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import type { FormSelectFieldProps } from '../../../primitives';
import { SelectField } from './SelectField';

export type { FormSelectFieldProps };

export function FormSelectField<T extends FieldValues, V = string | number>({
  control,
  name,
  rules,
  ...props
}: FormSelectFieldProps<T, V>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <SelectField<V>
          value={value}
          onChange={onChange}
          error={error?.message}
          {...props}
        />
      )}
    />
  );
}
