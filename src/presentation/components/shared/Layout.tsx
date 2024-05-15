import propTypes from "prop-types";
import DrawerMenu from "./DrawerMenu.js";
import FooterCustom from "./FooterCustom.tsx";
import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";
import React from "react";

const Layout = ({ children }) => {
    return (
        <>
            <CssBaseline />
            <DrawerMenu>
                <Box sx={{ pl: 2, pr: 2, pb: 10 }}>
                    {children}
                </Box>
                <FooterCustom />
            </DrawerMenu>
        </>
    )
}

Layout.propTypes = {
    children: propTypes.any
}

export default Layout