import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import type { FormTextInputProps } from '../../../primitives';
import { TextInput } from './TextInput';

export type { FormTextInputProps };

export function FormTextInput<T extends FieldValues>({
  control,
  name,
  rules,
  ...props
}: FormTextInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <TextInput
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          error={error?.message}
          {...props}
        />
      )}
    />
  );
}
