import React from 'react';
import {
  Animated,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import { colors } from '../../../tokens';
import {
  useBottomSheetModal,
  type BottomSheetModalProps,
} from '../../../primitives';
import CloseIcon from '../icons/CloseIcon';

export { type BottomSheetModalProps };

export function BottomSheetModal(props: BottomSheetModalProps) {
  const { title, children, renderCloseButton } = props;

  const {
    isVisible,
    translateY,
    backdropOpacity,
    handleClose,
    handleBackdropPress,
  } = useBottomSheetModal(props);

  return (
    <Modal visible={isVisible} transparent statusBarTranslucent>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <Animated.View
            style={[styles.backdrop, { opacity: backdropOpacity }]}
          />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[styles.content, { transform: [{ translateY }] }]}
        >
          <View style={styles.handle} />
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            {renderCloseButton ? (
              renderCloseButton()
            ) : (
              <TouchableOpacity hitSlop={10} onPress={handleClose}>
                <CloseIcon color={colors.text} />
              </TouchableOpacity>
            )}
          </View>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.surface,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    paddingBottom: 20,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    marginTop: 8,
    marginBottom: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
});

export default BottomSheetModal;
