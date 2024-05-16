import React, { useState, useEffect } from "react";
import useAPI from "../useAPI.ts";
import { MyBook, fromJson as MyBookFromJson } from "../../../data/model/response/MyBook.ts";
import { GetMyBookReq, toJson as GetMyBookToJson } from "../../../data/model/request/GetMyBookReq.ts";
import useSession from "../useSession.tsx";
import ButtonIcon from "../../../presentation/components/form/ButtonIcon.tsx";
import Icon from "@mui/material/Icon";

const useMyBooks = () => {
    const [booksList, setBooksList] = useState<Array<MyBook>|null>(null);
    const [loadingData, setLoadingData] = useState<boolean>(true);
    const [myBookDetail, setMyBookDetail] = useState<MyBook|null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const { fetchData } = useAPI();
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
            name: "Date end",
            selector: (row: any) => row.finish,
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
                        setMyBookDetail(row);
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
                    const response = await fetchData("/api/my-book", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        data: GetMyBookToJson(new GetMyBookReq(
                            `${session.id}:${session.email}`
                        ))
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