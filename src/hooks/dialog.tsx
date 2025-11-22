import { useState } from 'react';

interface ConfirmDialogState {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
}

export function useConfirmDialog() {
  const [dialog, setDialog] = useState<ConfirmDialogState>({
    isOpen: false,
    title: '',
    message: '',
    type: 'danger',
    onConfirm: () => {}
  });

  const showConfirm = (
    title: string,
    message: string,
    onConfirm: () => void,
    options?: {
      confirmText?: string;
      cancelText?: string;
      type?: 'danger' | 'warning' | 'info';
    }
  ) => {
    setDialog({
      isOpen: true,
      title,
      message,
      confirmText: options?.confirmText,
      cancelText: options?.cancelText,
      type: options?.type || 'danger',
      onConfirm
    });
  };

  const closeDialog = () => {
    setDialog(prev => ({
      ...prev,
      isOpen: false
    }));
  };

  const handleConfirm = () => {
    dialog.onConfirm();
    closeDialog();
  };

  return {
    dialog,
    showConfirm,
    closeDialog,
    handleConfirm
  };
}