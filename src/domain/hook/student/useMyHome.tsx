import React, { useState, useEffect } from "react";
import useAPI from "../useAPI.ts";
import { MyBook, fromJson as MyBookFromJson } from "../../../data/model/response/MyBook.ts";
import { CheckoutReq } from "../../../data/model/request/CheckoutReq.ts";
import useSession from "../useSession.tsx";
import { useSnackbarContext } from "../../../data/context/snackbarContext.ts";

const useMyHome = () => {
    const [booksList, setBooksList] = useState<Array<MyBook> | null>(null);
    const [loadBooks, setLoadBooks] = useState<boolean>(true);
    const [recentList, setRecentList] = useState<Array<MyBook> | null>(null);
    const [loadRecentBooks, setLoadRecentBooks] = useState<boolean>(true);
    const [term, setTerm] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [bookDetail, setBookDetail] = useState<MyBook | null>(null);
    const { fetchData } = useAPI();
    const session = useSession();
    const { showSnackbar } = useSnackbarContext();

    useEffect(() => {
        const getRecentList = async () => {
            try {
                if (loadRecentBooks && recentList === null) {
                    setRecentList([]);
                    const response = await fetchData("/api/book/recents", {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    if (response !== null && response !== undefined) {
                        const jsonResponse = response.data;
                        var myBooksArr: MyBook[] = [];
                        for (let index = 0; index < jsonResponse.length; index++) {
                            const u = jsonResponse[index];
                            const myBookInList = MyBookFromJson(u);
                            myBooksArr.push(myBookInList);
                        }
                        setRecentList(myBooksArr);
                        setLoadRecentBooks(false);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (loadRecentBooks) {
            getRecentList();
        }
    }, [fetchData, loadRecentBooks, recentList]);

    const getResultSearch = async () => {
        try {
            setBooksList([]);
            const response = await fetchData("/api/book/query", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                params: { term }
            });
            if (response !== null && response !== undefined) {
                const jsonResponse = response.data;
                var myBooksArr: MyBook[] = [];
                for (let index = 0; index < jsonResponse.length; index++) {
                    const u = jsonResponse[index];
                    const myBookInList = MyBookFromJson(u);
                    myBooksArr.push(myBookInList);
                }
                setBooksList(myBooksArr);
                setLoadBooks(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const checkOut = async () => {
        const response = await fetchData("/api/user-book", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(new CheckoutReq(
                `${session.id}:${session.email}`,
                Number(bookDetail?.id), 1
            ))
        });
        if (response !== null && response !== undefined) {
            closeModal();
            showSnackbar(`Checkout successfully, review the section "My Books"`)
        }
    };

    const openModal = (book: MyBook) => {
        setBookDetail(book);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return {
        booksList,
        loadBooks,
        recentList,
        loadRecentBooks,
        getResultSearch,
        term,
        setTerm,
        isOpen,
        checkOut,
        bookDetail,
        closeModal,
        openModal
    };
};

export default useMyHome;