import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useThemeCustom from '../hook/useThemeCustom.tsx';

type ThemeProviderCustomProps = {
    children: React.ReactNode
}

const ThemeProviderCustom: React.FC<ThemeProviderCustomProps> = ({ children }) => {
    const { currentTheme } = useThemeCustom();
    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
export default ThemeProviderCustom