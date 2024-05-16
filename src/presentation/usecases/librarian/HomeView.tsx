import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardCustom from "../../components/shared/CardCustom.tsx";
import Layout from "../../components/shared/Layout.tsx";
import useSession from "../../../domain/hook/useSession.tsx";

const HomeView = () => {
    const session = useSession();
    return (
        <>
            <Layout>
                <CardCustom>
                    <Box mx={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={9} ml={1} mb={2}>
                                <Box display="flex" flexDirection="column">
                                    <Typography variant="h6" fontWeight="bold">Welcome! {session?.name}</Typography>
                                    <div style={{ height: "10px" }}></div>
                                    <Typography variant="body2">This is the library platform of the Stanford University here you can:</Typography>
                                    <br />
                                    <ul style={{ listStyleType: "circle" }}>
                                        <Typography variant="body2">Manage the books</Typography>
                                        <Typography variant="body2">Manage the stock</Typography>
                                        <Typography variant="body2">Manage the users</Typography>
                                    </ul>
                                </Box>
                            </Grid>
                            <Grid item xs={5} md={2} alignSelf="flex-end" sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                                <img src="/images/anim/woman_intro.png" />
                            </Grid>
                        </Grid>
                    </Box>
                </CardCustom>
            </Layout>
        </>
    )
};

export default HomeView;