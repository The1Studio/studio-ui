import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { formatDate, DateFormats } from '@repo/core';
import {
  useDatePicker,
  type DatePickerProps,
  type FormDatePickerProps,
} from '../../../primitives';
import CalendarIcon from '../icons/CalendarIcon';
import { colors } from '../../../tokens';
import { Controller, FieldValues } from 'react-hook-form';

export type { DatePickerProps, FormDatePickerProps };

export function DatePicker(props: DatePickerProps) {
  const {
    value,
    label,
    placeholder = 'Select date',
    minDate,
    maxDate,
    timePicker = false,
    clearable = true,
    error,
    containerStyle,
    modalTitle = 'Select Date',
  } = props;

  const {
    modalVisible,
    tempDate,
    isDisabled,
    openModal,
    closeModal,
    handleDateChange,
    handleConfirm,
    handleClear,
    getDisplayValue,
  } = useDatePicker(props);

  // Convert Date to dayjs for DateTimePicker
  const tempDateDayjs: DateType = tempDate ? dayjs(tempDate) : dayjs();

  // Handle DateTimePicker change (convert dayjs to Date)
  const onPickerChange = (params: { date: DateType }) => {
    const date = params.date ? dayjs(params.date).toDate() : null;
    handleDateChange(date);
  };

  const displayValue = getDisplayValue((date, format) =>
    formatDate(date, timePicker ? DateFormats.DATETIME_MEDIUM : (format || DateFormats.DATE_MEDIUM))
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={[
          styles.field,
          isDisabled && styles.fieldDisabled,
          error && styles.fieldError,
        ]}
        onPress={openModal}
        disabled={isDisabled}
        activeOpacity={0.7}
      >
        <CalendarIcon
          size={20}
          color={isDisabled ? colors.textSecondary : colors.text}
        />
        <Text
          style={[
            styles.fieldText,
            !value && styles.placeholder,
            isDisabled && styles.textDisabled,
          ]}
          numberOfLines={1}
        >
          {displayValue || placeholder}
        </Text>
        {clearable && value && !isDisabled && (
          <TouchableOpacity
            onPress={handleClear}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.clearButton}>✕</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.backdrop}>
          <Pressable style={styles.backdropPressable} onPress={closeModal} />
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>

            <DateTimePicker
              mode="single"
              date={tempDateDayjs}
              onChange={onPickerChange}
              minDate={minDate ? dayjs(minDate) : undefined}
              maxDate={maxDate ? dayjs(maxDate) : undefined}
              timePicker={timePicker}
              styles={{
                header: {
                  backgroundColor: colors.surface,
                },
                month_selector_label: {
                  color: colors.text,
                  fontWeight: '600',
                },
                year_selector_label: {
                  color: colors.text,
                  fontWeight: '600',
                },
                button_next: {
                  tintColor: colors.primary,
                },
                button_prev: {
                  tintColor: colors.primary,
                },
                selected: {
                  backgroundColor: colors.primary,
                },
                selected_label: {
                  color: '#ffffff',
                },
                today: {
                  borderColor: colors.primary,
                  borderWidth: 1,
                },
                today_label: {
                  color: colors.primary,
                },
                day_label: {
                  color: colors.text,
                },
                weekday_label: {
                  color: colors.textSecondary,
                },
                outside_label: {
                  color: colors.border,
                },
              }}
            />

            <View style={styles.footer}>
              <TouchableOpacity
                style={[styles.footerButton, styles.footerButtonCancel]}
                onPress={closeModal}
              >
                <Text style={styles.footerButtonTextCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.footerButton}
                onPress={handleConfirm}
              >
                <Text style={styles.footerButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export function FormDatePicker<T extends FieldValues>({
  control,
  name,
  rules,
  ...props
}: FormDatePickerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <DatePicker
          {...props}
          value={value}
          onChange={onChange}
          error={error?.message}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    gap: 10,
  },
  fieldDisabled: {
    backgroundColor: colors.border,
    opacity: 0.6,
  },
  fieldError: {
    borderColor: colors.error,
  },
  fieldText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  placeholder: {
    color: colors.textSecondary,
  },
  textDisabled: {
    color: colors.textSecondary,
  },
  clearButton: {
    fontSize: 16,
    color: colors.textSecondary,
    paddingHorizontal: 4,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: 4,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backdropPressable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    width: '100%',
    maxWidth: 360,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 12,
  },
  footerButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  footerButtonCancel: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  footerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  footerButtonTextCancel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
});
