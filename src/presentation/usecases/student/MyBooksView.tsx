import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardCustom from "../../components/shared/CardCustom.tsx";
import Layout from "../../components/shared/Layout.tsx";
import useSession from "../../../domain/hook/useSession.tsx";
import DataTableCustom from "../../components/shared/DataTableCustom.tsx";
import useMyBooks from "../../../domain/hook/student/useMyBooks.tsx";
import ButtonLink from "../../components/form/ButtonLink.tsx";
import DialogCustom from "../../components/dialog/DialogCustom.tsx";

const MyBooksView = () => {
    const session = useSession();
    const {
        columns,
        booksList,
        loadingData,
        setTitle,
        setIsOpen,
        title,
        isOpen,
        closeModal,
        myBookDetail
    } = useMyBooks();
    return (
        <>
            <Layout>
                <CardCustom>
                    <DataTableCustom
                        label="My Books"
                        columns={columns}
                        data={booksList ?? []}
                        loading={loadingData}
                    />
                    <DialogCustom
                        title={`${title}`}
                        isOpen={isOpen}
                        closeAction={closeModal}
                        content={
                            <div></div>
                        }
                        actions={
                            <>
                                <div style={{
                                    width: "300px",
                                    display: "inline-flex"
                                }}>
                                    <ButtonLink
                                        text="Cancel"
                                        onClick={closeModal} />
                                </div>
                            </>
                        } />
                </CardCustom>
            </Layout>
        </>
    )
};

export default MyBooksView;