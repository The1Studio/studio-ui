import type { ReactNode } from 'react';

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  closeOnBackdrop?: boolean;
}
