import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import type { FormCheckboxProps } from '../../../primitives';
import { Checkbox } from './Checkbox';

export type { FormCheckboxProps };

export function FormCheckbox<T extends FieldValues>({
  control,
  name,
  rules,
  ...checkboxProps
}: FormCheckboxProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Checkbox
          {...checkboxProps}
          checked={Boolean(value)}
          onChange={onChange}
          error={error?.message}
        />
      )}
    />
  );
}
