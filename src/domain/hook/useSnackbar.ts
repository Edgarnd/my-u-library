import { useState, useCallback } from 'react';

interface SnackbarState {
  open: boolean;
  message: string;
}

export const useSnackbar = () => {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({ open: false, message: '' });

  const showSnackbar = useCallback((message: string) => {
    setSnackbarState({ open: true, message });
  }, []);

  const closeSnackbar = useCallback(() => {
    setSnackbarState((prevState) => ({ ...prevState, open: false }));
  }, []);

  return { snackbarState, showSnackbar, closeSnackbar };
};
