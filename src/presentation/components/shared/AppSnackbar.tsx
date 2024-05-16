import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { useSnackbarContext } from '../../../data/context/snackbarContext.ts';

export const AppSnackbar: React.FC = () => {
  const { snackbarState, closeSnackbar } = useSnackbarContext();

  return (
    <Snackbar
      open={snackbarState.open}
      message={snackbarState.message}
      autoHideDuration={4000}
      onClose={closeSnackbar}
      anchorOrigin={{vertical: "top", horizontal: "right"}}
    />
  );
};
