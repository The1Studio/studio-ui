import { useCallback, useRef, useState } from 'react';
import { Animated, Easing, LayoutAnimation, Platform, UIManager } from 'react-native';
import type { CollapsibleCardProps } from './collapsible-card.types';

// Enable LayoutAnimation on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * Shared collapsible card logic hook
 * Handles expand/collapse animation
 */
export function useCollapsibleCard(props: CollapsibleCardProps) {
  const { defaultExpanded = false, onToggle, disabled = false } = props;

  const [expanded, setExpanded] = useState(defaultExpanded);
  const rotateAnim = useRef(new Animated.Value(defaultExpanded ? 1 : 0)).current;

  const toggleExpand = useCallback(() => {
    if (disabled) return;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const newExpanded = !expanded;
    setExpanded(newExpanded);
    onToggle?.(newExpanded);

    Animated.timing(rotateAnim, {
      toValue: newExpanded ? 1 : 0,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [expanded, disabled, onToggle, rotateAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return {
    isExpanded: expanded,
    isDisabled: disabled,
    rotation,
    toggleExpand,
    accessibilityProps: {
      accessibilityRole: 'button' as const,
      accessibilityState: {
        expanded,
        disabled,
      },
    },
  };
}
