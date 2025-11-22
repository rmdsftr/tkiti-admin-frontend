import { useState } from 'react';

interface SnackbarState {
  isOpen: boolean;
  message: string;
  type: 'success' | 'error';
}

export function useSnackbar() {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    isOpen: false,
    message: '',
    type: 'success'
  });

  const showSuccess = (message: string) => {
    setSnackbar({
      isOpen: true,
      message,
      type: 'success'
    });
  };

  const showError = (message: string) => {
    setSnackbar({
      isOpen: true,
      message,
      type: 'error'
    });
  };

  const closeSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      isOpen: false
    }));
  };

  return {
    snackbar,
    showSuccess,
    showError,
    closeSnackbar
  };
}