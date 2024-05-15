import { Icon } from "@mui/material";
import React, { useState, useEffect } from "react";
import useAPI from "../useAPI.ts";
import ButtonIcon from "../../../presentation/components/form/ButtonIcon.tsx";
import { MyBook, fromJson as MyBookFromJson } from "../../../data/model/response/MyBook.ts";
import { MyBookDetailRes } from "../../../data/model/response/MyBookDetailResponse.ts";


const useMyBooks = () => {
    const [booksList, setBooksList] = useState<Array<MyBook>|null>(null);
    const [loadingData, setLoadingData] = useState<boolean>(true);
    const [myBookDetail, setMyBookDetail] = useState<MyBookDetailRes|null>(null);
    const [myBookId, setMyBookId] = useState<string|null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const { fetchData } = useAPI();
    const columns = [
        {
            name: "Book",
            selector: row => row.photo,
            sortable: true,
            width: "15%"
        },
        {
            name: "Name",
            selector: row => row.title,
            sortable: true,
            width: "15%"
        },
        {
            name: "Description",
            selector: row => row.description,
            sortable: true,
            width: "15%"
        },
        {
            name: "Date end",
            selector: row => row.finish,
            sortable: true,
            width: "25%"
        },
        {
            name: <div style={{ textAlign: "left", width: "40%" }}>Acciones</div>,
            cell: (row) => <div>
                <ButtonIcon icon={
                    <Icon sx={{ display: "block" }}>
                        mail_lock
                    </Icon>} onClick={() => {
                    }} />
            </div>,
            ignoreRowClick: true,
            button: true,
            width: "20%"
        },
    ];
    useEffect(() => {
        const getAll = async () => {
            try {
                if (loadingData && booksList === null) {
                    setBooksList([]);
                    const response = await fetchData("/api/my-book/list", {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
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

    useEffect(() => {
        if (myBookDetail === null && myBookId !== null) {
            const getUsuario = async () => {
                const response = await fetchData(`/api/my-book/detail/${myBookId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response !== null && response !== undefined) {
                    const jsonResponse = response.data;
                    setMyBookDetail(new MyBookDetailRes(jsonResponse));
                    setMyBookId(null);
                    setIsOpen(true);
                }
            };
            getUsuario();
        }
    }, [fetchData, myBookDetail, myBookId]);

    const reloadTable = () => {
        setLoadingData(true);
        setBooksList(null);
    }

    const closeModal = () => {
        setIsOpen(false);
        setMyBookDetail(null);
    }

    return {
        columns,
        booksList,
        loadingData,
        myBookDetail,
        setMyBookDetail,
        isOpen,
        setIsOpen,
        title,
        setTitle,
        closeModal
    };
}

export default useMyBooks