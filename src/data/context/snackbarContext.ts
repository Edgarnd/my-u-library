import React, { createContext, useContext, ReactNode } from 'react';

interface SnackbarContextType {
  snackbarState: { open: boolean; message: string };
  showSnackbar: (message: string) => void;
  closeSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbarContext = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbarContext must be used within a SnackbarProvider');
  }
  return context;
};

export default  SnackbarContext;