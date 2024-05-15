import { PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useState } from 'react';

export default function useThemeCustom (){
    const soThemeConfig = window.matchMedia("(prefers-color-scheme: dark)");
    const [soTheme, setSOTheme] = useState<PaletteMode>(soThemeConfig.matches ? "dark" : "light");
    const [isDarkMode, setIsDarkMode] = useState(soThemeConfig.matches ? true : false);

    const currentTheme = createTheme({
        palette: {
            mode: soTheme,
        },
    });

    soThemeConfig.addEventListener("change", (e) => {
        if (e.matches) {
            setSOTheme("dark")
            setIsDarkMode(true)
        } else {
            setSOTheme("light")
            setIsDarkMode(false)
        }
    })
    return {
        soTheme,
        setSOTheme,
        isDarkMode,
        setIsDarkMode,
        currentTheme
    }
}