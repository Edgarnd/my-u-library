import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import propTypes from "prop-types";
import useThemeCustom from '../hook/useThemeCustom.tsx';

ThemeProviderCustom.propTypes = {
    children: propTypes.any
}

export default function ThemeProviderCustom({ children }) {
    const { currentTheme } = useThemeCustom();
    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}