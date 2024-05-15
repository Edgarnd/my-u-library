import React from "react";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid";
import packageJson from "../../../../package.json"
import useThemeCustom from "../../../domain/hook/useThemeCustom.tsx";

export default function FooterCustom() {
    const { isDarkMode } = useThemeCustom();
    const colorBg = () => {
        return isDarkMode ? "#1E1E1E" : "#EDEDED";
    }
    return (
        <Box
            sx={{
                width: "100%",
                height: "auto",
                backgroundColor: colorBg(),
                paddingTop: "15px",
                paddingBottom: "15px",
                paddingLeft: "40px",
                position: "fixed",
                bottom: 0,
            }}
        >
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={7} md={8}>
                    <Typography variant="caption" color="GrayText">
                        Powered by Edgar Renderos
                    </Typography>
                </Grid>
                <Grid item xs={3} md={3}>
                    <Typography variant="caption" sx={{float: "right"}} color="GrayText">
                        Versión {packageJson.version}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}