import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import type { FormRadioGroupProps } from '../../../primitives';
import { RadioGroup } from './RadioButton';

export type { FormRadioGroupProps };

export function FormRadioGroup<T extends FieldValues, V = string>({
  control,
  name,
  rules,
  ...radioGroupProps
}: FormRadioGroupProps<T, V>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <RadioGroup<V>
          {...radioGroupProps}
          value={value}
          onChange={onChange}
          error={error?.message}
        />
      )}
    />
  );
}
