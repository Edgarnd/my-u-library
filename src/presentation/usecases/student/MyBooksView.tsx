import React from "react";
import CardCustom from "../../components/shared/CardCustom.tsx";
import Layout from "../../components/shared/Layout.tsx";
import useSession from "../../../domain/hook/useSession.tsx";
import DataTableCustom from "../../components/shared/DataTableCustom.tsx";
import useMyBooks from "../../../domain/hook/student/useMyBooks.tsx";
import ButtonLink from "../../components/form/ButtonLink.tsx";
import DialogCustom from "../../components/dialog/DialogCustom.tsx";
import MyBookDetailContent from "../../content/MyBookDetailContent.tsx";

const MyBooksView = () => {
    const session = useSession();
    const {
        columns,
        booksList,
        loadingData,
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
                </CardCustom>
                <DialogCustom
                    title="Book detail"
                    isOpen={isOpen}
                    closeAction={closeModal}
                    content={<MyBookDetailContent book={myBookDetail!} />}
                    actions={
                        <>
                            <div style={{
                                width: "100px",
                                display: "inline-flex"
                            }}>
                                <ButtonLink
                                    text="Okay"
                                    onClick={closeModal} />
                                <div style={{ width: "25px" }}></div>
                            </div>
                        </>
                    } />
            </Layout>
        </>
    )
};

export default MyBooksView;