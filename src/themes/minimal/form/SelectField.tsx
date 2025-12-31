import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
import {
  useSelectField,
  type SelectOption,
  type SelectFieldProps,
} from '../../../primitives';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import CloseIcon from '../icons/CloseIcon';
import BottomSheetModal from '../overlays/BottomSheetModal';
import { colors } from '../../../tokens';

export type { SelectOption, SelectFieldProps };

export function SelectField<T = string | number>(props: SelectFieldProps<T>) {
  const {
    label,
    placeholder = 'Select an option',
    options,
    error,
    containerStyle,
    labelStyle,
    errorStyle,
    inputStyle,
    renderOption,
  } = props;

  const {
    isOpen,
    isDisabled,
    selectedOption,
    showClearButton,
    handleOpen,
    handleClose,
    handleSelect,
    handleClear,
    isSelected,
  } = useSelectField(props);

  const renderDefaultOption = useCallback(
    (option: SelectOption<T>, isSelected: boolean) => (
      <View
        style={[styles.optionItem, isSelected && styles.optionItemSelected]}
      >
        <Text
          style={[styles.optionText, isSelected && styles.optionTextSelected]}
        >
          {option.label}
        </Text>
      </View>
    ),
    []
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleOpen}
        disabled={isDisabled}
        style={[
          styles.inputWrapper,
          error && styles.inputWrapperError,
          isDisabled && styles.inputWrapperDisabled,
          inputStyle,
        ]}
      >
        <Text
          style={[
            styles.inputText,
            !selectedOption && styles.placeholderText,
            isDisabled && styles.disabledText,
          ]}
          numberOfLines={1}
        >
          {selectedOption?.label || placeholder}
        </Text>
        <View style={styles.iconsContainer}>
          {showClearButton && (
            <Pressable
              onPress={handleClear}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.clearButton}
            >
              <CloseIcon size={18} color={colors.textSecondary} />
            </Pressable>
          )}
          <ArrowDownIcon
            size={20}
            color={isDisabled ? colors.textSecondary : colors.text}
          />
        </View>
      </TouchableOpacity>

      {error && <Text style={[styles.error, errorStyle]}>{error}</Text>}

      <BottomSheetModal
        visible={isOpen}
        onClose={handleClose}
        title={label || 'Select'}
      >
        <FlatList
          data={options}
          keyExtractor={(item, index) => `${item.value}-${index}`}
          renderItem={({ item }) => {
            const selected = isSelected(item.value);
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleSelect(item)}
                style={styles.optionTouchable}
              >
                {renderOption
                  ? renderOption(item, selected)
                  : renderDefaultOption(item, selected)}
              </TouchableOpacity>
            );
          }}
          style={styles.optionsList}
          contentContainerStyle={styles.optionsListContent}
          showsVerticalScrollIndicator={false}
        />
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  inputWrapperError: {
    borderColor: colors.error,
  },
  inputWrapperDisabled: {
    backgroundColor: colors.border,
    opacity: 0.6,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginRight: 8,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  clearButton: {
    padding: 2,
  },
  placeholderText: {
    color: colors.textSecondary,
  },
  disabledText: {
    color: colors.textSecondary,
  },
  error: {
    fontSize: 12,
    color: colors.error,
  },
  optionsList: {
    flexGrow: 0,
    maxHeight: 300,
    width: '100%',
  },
  optionsListContent: {
    width: '100%',
  },
  optionTouchable: {
    width: '100%',
  },
  optionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    width: '100%',
  },
  optionItemSelected: {
    backgroundColor: colors.primary + '15',
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
  },
  optionTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
});
