import React from "react";
import { MyBook } from "../../data/model/response/MyBook.ts"
import { Box, Grid, Typography } from "@mui/material";

type MyBookDetailContentProps = {
    book: MyBook
}

const MyBookDetailContent: React.FC<MyBookDetailContentProps> = ({ book }) => {
    return (
        <Box mx={1}>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <img src={`data:${book.photoType};base64,${book.photo}`} style={{
                        width: "100%"
                    }} />
                    <div style={{ height: "30px" }}></div>
                    <Typography variant="body2" fontWeight="bold">Return day</Typography>
                    <Typography variant="body2">{book.finish}</Typography>
                </Grid>
                <Grid item xs={7} mt={1}>
                    <Box display="flex" flexDirection="column">
                        <Typography variant="h5" fontWeight="bold">{book.title}</Typography>
                        <Typography variant="body2">{book.genre}</Typography>
                        <div style={{ height: "30px" }}></div>
                        <Typography variant="body2" fontWeight="bold">Description</Typography>
                        <Typography variant="body2">{book.description}</Typography>
                        <div style={{ height: "30px" }}></div>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2" fontWeight="bold">Author</Typography>
                                <Typography variant="body2">{book.author}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" fontWeight="bold">Revision</Typography>
                                <Typography variant="body2">{book.revision}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" fontWeight="bold">Year Published</Typography>
                                <Typography variant="body2">{book.yearPub}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" fontWeight="bold">Lent</Typography>
                                <Typography variant="body2">1</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default MyBookDetailContent;