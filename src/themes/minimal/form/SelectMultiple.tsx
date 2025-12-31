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
  useSelectMultiple,
  type SelectMultipleOption,
  type SelectMultipleProps,
} from '../../../primitives';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import CloseIcon from '../icons/CloseIcon';
import BottomSheetModal from '../overlays/BottomSheetModal';
import { colors } from '../../../tokens';

export type { SelectMultipleOption, SelectMultipleProps };

export function SelectMultiple<T = string | number>(props: SelectMultipleProps<T>) {
  const {
    label,
    placeholder = 'Select options',
    options,
    maxSelected,
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
    selectedOptions,
    hasSelection,
    showClearButton,
    selectedCount,
    handleOpen,
    handleClose,
    handleToggle,
    handleRemoveItem,
    handleClearAll,
    isSelected,
    isOptionDisabled,
  } = useSelectMultiple(props);

  const renderDefaultOption = useCallback(
    (option: SelectMultipleOption<T>, optionIsSelected: boolean) => (
      <View
        style={[styles.optionItem, optionIsSelected && styles.optionItemSelected]}
      >
        <View style={[styles.checkbox, optionIsSelected && styles.checkboxSelected]}>
          {optionIsSelected && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text
          style={[styles.optionText, optionIsSelected && styles.optionTextSelected]}
        >
          {option.label}
        </Text>
      </View>
    ),
    []
  );

  const renderChip = useCallback(
    (option: SelectMultipleOption<T>) => (
      <View key={String(option.value)} style={styles.chip}>
        <Text style={styles.chipText} numberOfLines={1}>
          {option.label}
        </Text>
        {!isDisabled && (
          <Pressable
            onPress={() => handleRemoveItem(option.value)}
            hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
          >
            <CloseIcon size={14} color={colors.primary} />
          </Pressable>
        )}
      </View>
    ),
    [isDisabled, handleRemoveItem]
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
        <View style={styles.inputContent}>
          {hasSelection ? (
            <View style={styles.chipsContainer}>
              {selectedOptions.map(renderChip)}
            </View>
          ) : (
            <Text
              style={[styles.inputText, styles.placeholderText]}
              numberOfLines={1}
            >
              {placeholder}
            </Text>
          )}
        </View>
        <View style={styles.iconsContainer}>
          {showClearButton && (
            <Pressable
              onPress={handleClearAll}
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
        <View style={styles.bottomSheetContent}>
          {hasSelection && (
            <View style={styles.selectedCount}>
              <Text style={styles.selectedCountText}>
                {selectedCount} selected
                {maxSelected ? ` (max ${maxSelected})` : ''}
              </Text>
            </View>
          )}
          <FlatList
            data={options}
            keyExtractor={(item, index) => `${item.value}-${index}`}
            renderItem={({ item }) => {
              const selected = isSelected(item.value);
              const optionDisabled = isOptionDisabled(item.value);
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleToggle(item)}
                  style={[
                    styles.optionTouchable,
                    optionDisabled && styles.optionDisabled,
                  ]}
                  disabled={optionDisabled}
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
        </View>
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
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
  },
  inputContent: {
    flex: 1,
    justifyContent: 'center',
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
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    alignItems: 'center',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '20',
    borderRadius: 16,
    paddingVertical: 6,
    paddingLeft: 12,
    paddingRight: 8,
    gap: 6,
  },
  chipText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    maxWidth: 100,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 8,
    paddingTop: 4,
  },
  clearButton: {
    padding: 2,
  },
  placeholderText: {
    color: colors.textSecondary,
  },
  error: {
    fontSize: 12,
    color: colors.error,
  },
  bottomSheetContent: {
    width: '100%',
  },
  selectedCount: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selectedCountText: {
    fontSize: 14,
    color: colors.textSecondary,
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
  optionDisabled: {
    opacity: 0.5,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    width: '100%',
    gap: 12,
  },
  optionItemSelected: {
    backgroundColor: colors.primary + '15',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  optionTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
});
