import React from "react";
import CardCustom from "../../components/shared/CardCustom.tsx";
import Layout from "../../components/shared/Layout.tsx";
import DataTableCustom from "../../components/shared/DataTableCustom.tsx";
import ButtonLink from "../../components/form/ButtonLink.tsx";
import DialogCustom from "../../components/dialog/DialogCustom.tsx";
import useBooks from "../../../domain/hook/librarian/useBooks.tsx";
import BookDetailContent from "../../content/BookDetailContent.tsx";
import BookForm from "../../content/BookForm.tsx";
import ButtonPrimary from "../../components/form/ButtonPrimary.tsx";
import { Book } from "../../../data/model/response/Book.ts";

const BooksView = () => {
    const {
        columns,
        booksList,
        loadingData,
        isOpen,
        closeModal,
        setIsOpen,
        bookDetail,
        setBookDetail,
        isAdding,
        setIsAdding,
        isViewing,
        setIsViewing,
        title,
        setTitle,
        save,
    } = useBooks();
    return (
        <>
            <Layout>
                <CardCustom>
                    <DataTableCustom
                        label="Books"
                        columns={columns}
                        data={booksList ?? []}
                        loading={loadingData}
                        onAdd={() => {
                            setIsViewing(false);
                            setIsAdding(true);
                            setBookDetail(new Book());
                            setTitle("New Book");
                            setIsOpen(true);
                        }}
                    />
                    <DialogCustom
                        title={`${title}`}
                        isOpen={isOpen}
                        closeAction={closeModal}
                        formAction={(e) => {save(e);}}
                        content={
                            <div>
                                {isAdding && <BookForm book={bookDetail!} />}
                                {isViewing && <BookDetailContent book={bookDetail!} />}
                            </div>
                        }
                        actions={
                            <>
                                <div style={{
                                    width: isAdding ? "300px" : "100px",
                                    display: "inline-flex"
                                }}>
                                    <ButtonLink
                                        text="Cancel"
                                        onClick={closeModal} />
                                    {isAdding && <>
                                        <div style={{ width: "25px" }}></div>
                                        <ButtonPrimary
                                            text="Save book"
                                            type="submit"
                                            onClick={() => {}} />
                                    </>}
                                </div>
                            </>
                        } />
                </CardCustom>
            </Layout>
        </>
    )
};

export default BooksView;