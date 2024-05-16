import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardCustom from "../../components/shared/CardCustom.tsx";
import Layout from "../../components/shared/Layout.tsx";
import useSession from "../../../domain/hook/useSession.tsx";
import InputTextForm from "../../components/form/InputTextForm.tsx";
import ButtonIcon from "../../components/form/ButtonIcon.tsx";
import Icon from "@mui/material/Icon";
import useMyHome from "../../../domain/hook/student/useMyHome.tsx";
import DialogCustom from "../../components/dialog/DialogCustom.tsx";
import ButtonLink from "../../components/form/ButtonLink.tsx";
import ButtonPrimary from "../../components/form/ButtonPrimary.tsx";
import BookDetailContent from "../../content/BookDetailContent.tsx";
import ButtonBase from "@mui/material/ButtonBase";

const MyHomeView = () => {
    const session = useSession();
    const {
        recentList,
        loadBooks,
        booksList,
        term,
        setTerm,
        getResultSearch,
        isOpen,
        checkOut,
        bookDetail,
        closeModal,
        openModal
    } = useMyHome();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        getResultSearch();
    };
    return (
        <>
            <Layout>
                <Box mx={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <CardCustom>
                                <Box mx={2}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={12} ml={1} mb={2}>
                                            <Box display="flex" flexDirection="column">
                                                <Typography variant="h6" fontWeight="bold">Welcome! {session?.name}</Typography>
                                                <div style={{ height: "10px" }}></div>
                                                <Typography variant="body2">This is the library platform of the Stanford University here you might search the books that you need and lend them, also check the books you lent, review the dates where you have to come back the books or request more time to have them.</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={12} alignSelf="flex-end" sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                                            <img src="/images/anim/woman_intro.png" />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </CardCustom>
                        </Grid>
                        <Grid item xs={12} md={5} mt={1}>
                            <Box display="flex" flexDirection="column">
                                <form onSubmit={handleSubmit} className="form-inline">
                                    <Grid item xs={11} md={11}>
                                        <InputTextForm
                                            placeholder="Search any book"
                                            value={term}
                                            onChange={(e) => setTerm(e.target.value)} />
                                    </Grid>
                                    <Grid item xs={1} md={1}>
                                        <ButtonIcon
                                            icon={
                                                <Icon>
                                                    search
                                                </Icon>
                                            } />
                                    </Grid>
                                </form>
                                {booksList?.length === 0 && !loadBooks &&
                                    <Typography variant="subtitle2">
                                        There aren't books with this name, try different names
                                    </Typography>}
                                {booksList?.map(book => (
                                    <Box my={1}
                                        key={book.id + book.title}>
                                        <CardCustom>
                                            <ButtonBase
                                                sx={{
                                                    width: "100%",
                                                    display: "inline-block"
                                                }}
                                                onClick={(e) => openModal(book)}>
                                                <Box pb={2}>
                                                    <Grid container>
                                                        <Grid item xs={6}>
                                                            <img src={`data:${book.photoType};base64,${book.photo}`} style={{
                                                                height: "130px"
                                                            }} />
                                                        </Grid>
                                                        <Grid item xs={6} className="text-left">
                                                            <Typography variant="body1" fontWeight="bold">{book.title}</Typography>
                                                            <Typography variant="body2">Author: {book.author}</Typography>
                                                            <Typography variant="body2">Year: {book.yearPub}</Typography>
                                                            <Typography variant="body2">Available: {book.quantity}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </ButtonBase>
                                        </CardCustom>
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={3} mt={1}>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="subtitle2" fontWeight="bold" textAlign="left">Recent added</Typography>
                                {recentList?.map(book => (
                                    <Box my={1}
                                        key={book.id}>
                                        <CardCustom>
                                            <ButtonBase
                                                sx={{
                                                    width: "100%",
                                                    display: "inline-block"
                                                }}
                                                onClick={(e) => openModal(book)}>
                                                <Box pb={2}>
                                                    <Grid container>
                                                        <Grid item xs={6}>
                                                            <img src={`data:${book.photoType};base64,${book.photo}`} style={{
                                                                height: "100px"
                                                            }} />
                                                        </Grid>
                                                        <Grid item xs={6} className="text-left">
                                                            <Typography variant="body1" fontWeight="bold">{book.title}</Typography>
                                                            <Typography variant="body2">{book.genre}</Typography>
                                                            <Typography variant="body2">{book.author}</Typography>
                                                            <Typography variant="body2">{book.yearPub}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </ButtonBase>
                                        </CardCustom>
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <DialogCustom
                    title="Book"
                    isOpen={isOpen}
                    closeAction={closeModal}
                    content={<BookDetailContent book={bookDetail!} />}
                    actions={
                        <>
                            <div style={{
                                width: "300px",
                                display: "inline-flex"
                            }}>
                                <ButtonLink
                                    text="Cancel"
                                    onClick={closeModal} />
                                <div style={{ width: "25px" }}></div>
                                <ButtonPrimary
                                    text="Check out"
                                    onClick={checkOut} />
                            </div>
                        </>
                    } />
            </Layout>
        </>
    )
};

export default MyHomeView;