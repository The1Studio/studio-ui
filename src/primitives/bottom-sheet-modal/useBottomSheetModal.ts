import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing } from 'react-native';
import type { BottomSheetModalProps } from './bottom-sheet-modal.types';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const ANIMATION_DURATION = 300;

/**
 * Shared bottom sheet modal logic hook
 * Handles animation and visibility state
 */
export function useBottomSheetModal(props: BottomSheetModalProps) {
  const { visible, onClose } = props;

  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = useState(visible);

  const animateIn = useCallback(() => {
    setIsVisible(true);
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateY, backdropOpacity]);

  const animateOut = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: ANIMATION_DURATION,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsVisible(false);
    });
  }, [translateY, backdropOpacity]);

  useEffect(() => {
    if (visible) {
      animateIn();
    } else if (isVisible) {
      animateOut();
    }
  }, [visible, animateIn, animateOut, isVisible]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleBackdropPress = useCallback(() => {
    onClose();
  }, [onClose]);

  return {
    isVisible,
    translateY,
    backdropOpacity,
    handleClose,
    handleBackdropPress,
  };
}
