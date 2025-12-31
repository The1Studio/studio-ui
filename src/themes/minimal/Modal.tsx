import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useModal, type ModalProps } from '../../primitives/modal';
import { colors } from '../../tokens/colors';
import { spacing, borderRadius } from '../../tokens/spacing';
import { fontSize, fontWeight } from '../../tokens/typography';

/**
 * Minimal theme Modal - clean, simple design with slide animation
 */
export function Modal(props: ModalProps) {
  const { visible, children, title } = props;
  const { handleBackdropPress, handleClose, accessibilityProps } = useModal(props);

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <Pressable style={styles.backdrop} onPress={handleBackdropPress}>
        <Pressable style={styles.content} {...accessibilityProps}>
          {title && (
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              <Pressable onPress={handleClose} style={styles.closeButton}>
                <Text style={styles.closeText}>×</Text>
              </Pressable>
            </View>
          )}
          <View style={styles.body}>{children}</View>
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.neutral[900],
  },
  closeButton: {
    padding: spacing[1],
  },
  closeText: {
    fontSize: fontSize['2xl'],
    color: colors.neutral[500],
    lineHeight: fontSize['2xl'],
  },
  body: {
    padding: spacing[4],
  },
});
