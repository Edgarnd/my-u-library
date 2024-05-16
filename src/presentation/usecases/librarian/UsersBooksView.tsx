import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardCustom from "../../components/shared/CardCustom.tsx";
import Layout from "../../components/shared/Layout.tsx";
import useSession from "../../../domain/hook/useSession.tsx";

const UserBooksView = () => {
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
                                    <Typography variant="body2">This is the library platform of the Stanford University here you can check the books you lent, you can review those ones and read a description and basic information about the book, also you can review the dates where you have to come back the books or request more time to have them.</Typography>
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

export default UserBooksView;