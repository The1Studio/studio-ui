import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../tokens';
import {
  useCheckbox,
  checkboxSizeConfig,
  type CheckboxProps,
} from '../../../primitives';

export { type CheckboxProps };

export function Checkbox(props: CheckboxProps) {
  const {
    label,
    error,
    size = 'medium',
    containerStyle,
    labelStyle,
    errorStyle,
  } = props;

  const { isChecked, isDisabled, handlePress } = useCheckbox(props);

  const config = checkboxSizeConfig[size];

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handlePress}
        disabled={isDisabled}
        style={styles.container}
      >
        <View
          style={[
            styles.checkbox,
            {
              width: config.box,
              height: config.box,
              borderRadius: config.box / 4,
            },
            isChecked && styles.checkboxChecked,
            error && styles.checkboxError,
            isDisabled && styles.checkboxDisabled,
          ]}
        >
          {isChecked && (
            <Text style={[styles.checkmark, { fontSize: config.check }]}>
              ✓
            </Text>
          )}
        </View>
        {label && (
          <Text
            style={[
              styles.label,
              { fontSize: config.fontSize },
              isDisabled && styles.labelDisabled,
              labelStyle,
            ]}
          >
            {label}
          </Text>
        )}
      </TouchableOpacity>
      {error && <Text style={[styles.error, errorStyle]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 4,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxError: {
    borderColor: colors.error,
  },
  checkboxDisabled: {
    backgroundColor: colors.border,
    borderColor: colors.border,
    opacity: 0.6,
  },
  checkmark: {
    color: 'white',
    fontWeight: '700',
  },
  label: {
    marginLeft: 10,
    color: colors.text,
  },
  labelDisabled: {
    color: colors.textSecondary,
  },
  error: {
    fontSize: 12,
    color: colors.error,
    marginLeft: 32,
  },
});
