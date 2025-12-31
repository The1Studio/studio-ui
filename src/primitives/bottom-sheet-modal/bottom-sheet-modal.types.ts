import type { ReactNode } from 'react';

export interface BottomSheetModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  renderCloseButton?: () => ReactNode;
}
