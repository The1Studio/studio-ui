import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

export interface SwipeableCardProviderProps {
  children: ReactNode;
}

export interface SwipeableCardProps {
  /** Content of the card */
  children: ReactNode;
  /** Render function for left actions (swipe right to reveal) */
  renderLeftActions?: (
    progress: SharedValue<number>,
    drag: SharedValue<number>,
    close: () => void
  ) => ReactNode;
  /** Render function for right actions (swipe left to reveal) */
  renderRightActions?: (
    progress: SharedValue<number>,
    drag: SharedValue<number>,
    close: () => void
  ) => ReactNode;
  /** Called when swipeable is opened */
  onOpen?: (direction: 'left' | 'right') => void;
  /** Called when swipeable is closed */
  onClose?: () => void;
  /** Container style */
  containerStyle?: ViewStyle;
  /** Content container style */
  contentStyle?: ViewStyle;
  /** Whether to allow overshoot on left side */
  overshootLeft?: boolean;
  /** Whether to allow overshoot on right side */
  overshootRight?: boolean;
  /** Friction for swipe gesture */
  friction?: number;
  /** Whether swipe is enabled */
  enabled?: boolean;
}
