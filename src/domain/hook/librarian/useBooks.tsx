import React, { useState, useEffect } from "react";
import useAPI from "../useAPI.ts";
import { Book, fromJson as BookFromJson } from "../../../data/model/response/Book.ts";
import useSession from "../useSession.tsx";
import ButtonIcon from "../../../presentation/components/form/ButtonIcon.tsx";
import Icon from "@mui/material/Icon";
import { useSnackbarContext } from "../../../data/context/snackbarContext.ts";

const useBooks = () => {
    const [booksList, setBooksList] = useState<Array<Book> | null>(null);
    const [loadingData, setLoadingData] = useState<boolean>(true);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [isViewing, setIsViewing] = useState<boolean>(false);
    const [bookDetail, setBookDetail] = useState<Book | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const { fetchData } = useAPI();
    const { showSnackbar } = useSnackbarContext();
    const session = useSession();
    const columns = [
        {
            name: "Portrait",
            cell: (row: any) => <div>
                <img src={`data:${row.photoType};base64,${row.photo}`} style={{
                    width: "100%"
                }} />
            </div>,
            ignoreRowClick: true,
            button: false,
            width: "15%"
        },
        {
            name: "Name",
            selector: (row: any) => row.title,
            sortable: true,
            width: "20%"
        },
        {
            name: "Genre",
            selector: (row: any) => row.genre,
            sortable: true,
            width: "15%"
        },
        {
            name: "Quantity",
            selector: (row: any) => row.quantity,
            sortable: true,
            width: "15%"
        },
        {
            name: "Lend",
            selector: (row: any) => row.qtyLend,
            sortable: true,
            width: "15%"
        },

        {
            name: "Details",
            cell: (row: any) => <div>
                <ButtonIcon icon={
                    <Icon sx={{ display: "block" }}>
                        visibility
                    </Icon>} onClick={() => {
                        setIsAdding(false);
                        setIsViewing(true);
                        setBookDetail(row);
                        setTitle("Book Detail");
                        setIsOpen(true);
                    }} />
            </div>,
            ignoreRowClick: true,
            button: true,
            width: "10%"
        },
    ];
    useEffect(() => {
        const getAll = async () => {
            try {
                if (loadingData && booksList === null) {
                    setBooksList([]);
                    const response = await fetchData("/api/book", {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    if (response !== null && response !== undefined) {
                        const jsonResponse = response.data;
                        var booksArr: Book[] = [];
                        for (let index = 0; index < jsonResponse.length; index++) {
                            const u = jsonResponse[index];
                            const bookInList = BookFromJson(u);
                            booksArr.push(bookInList);
                        }
                        setBooksList(booksArr);
                        setLoadingData(false);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (loadingData) {
            getAll();
        }
    }, [loadingData, fetchData, booksList])

    const save = async () => {
        try {
            const response = await fetchData("/api/book", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify(bookDetail)
            });
            if (response !== null) {
                closeModal();
                reloadTable();
                showSnackbar("Book saved successfully!")
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    const reloadTable = () => {
        setLoadingData(true);
        setBooksList(null);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return {
        columns,
        booksList,
        loadingData,
        bookDetail,
        setBookDetail,
        isOpen,
        setIsOpen,
        title,
        setTitle,
        closeModal,
        isAdding,
        setIsAdding,
        isViewing,
        setIsViewing,
        save
    };
}

export default useBooks;