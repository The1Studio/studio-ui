import { useCallback, useEffect } from 'react';
import type { ModalProps } from './modal.types';

/**
 * Shared modal logic hook
 * Used by all theme implementations
 */
export function useModal(props: ModalProps) {
  const { visible, onClose, closeOnBackdrop = true } = props;

  const handleBackdropPress = useCallback(() => {
    if (closeOnBackdrop) {
      onClose();
    }
  }, [closeOnBackdrop, onClose]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Handle hardware back button on Android
  useEffect(() => {
    if (!visible) return;
    // Implementation would use BackHandler from react-native
  }, [visible, onClose]);

  return {
    handleBackdropPress,
    handleClose,
    accessibilityProps: {
      accessibilityRole: 'dialog' as const,
      accessibilityViewIsModal: true,
    },
  };
}
