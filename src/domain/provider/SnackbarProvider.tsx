import React from 'react';
import { ReactNode } from 'react';
import SnackbarContext from '../../data/context/snackbarContext.ts';
import { useSnackbar } from '../hook/useSnackbar.ts';

const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { snackbarState, showSnackbar, closeSnackbar } = useSnackbar();

    return (
        <SnackbarContext.Provider value={{ snackbarState, showSnackbar, closeSnackbar }}>
            {children}
        </SnackbarContext.Provider>
    );
};

export default SnackbarProvider;