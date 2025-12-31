import type { ReactNode } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';

export interface CollapsibleCardProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  contentStyle?: ViewStyle;
  renderHeaderRight?: () => ReactNode;
}
