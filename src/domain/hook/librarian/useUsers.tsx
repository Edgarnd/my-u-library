import React, { useState, useEffect } from "react";
import useAPI from "../useAPI.ts";
import ButtonIcon from "../../../presentation/components/form/ButtonIcon.tsx";
import Icon from "@mui/material/Icon";
import { useSnackbarContext } from "../../../data/context/snackbarContext.ts";
import { UserInfoRes, fromJson as UserFromJson } from "../../../data/model/response/UserInfoRes.ts";
import { UserRegisterReq } from "../../../data/model/request/UserRegisterReq.ts";

const useUsers = () => {
    const [usersList, setUserList] = useState<Array<UserInfoRes> | null>(null);
    const [loadingData, setLoadingData] = useState<boolean>(true);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [isViewing, setIsViewing] = useState<boolean>(false);
    const [userDetail, setUserDetail] = useState<UserRegisterReq | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const { fetchData } = useAPI();
    const { showSnackbar } = useSnackbarContext();
    const columns = [
        {
            name: "ID",
            selector: (row: any) => row.id,
            sortable: true,
            width: "20%"
        },
        {
            name: "Email",
            selector: (row: any) => row.email,
            sortable: true,
            width: "25%"
        },
        {
            name: "Role",
            selector: (row: any) => row.role,
            sortable: true,
            width: "25%"
        },
        {
            name: "Details",
            cell: (row: any) => <div>
                <ButtonIcon icon={
                    <Icon sx={{ display: "block" }}>
                        delete
                    </Icon>} onClick={() => {
                    }} />
            </div>,
            ignoreRowClick: true,
            button: true,
            width: "25%"
        },
    ];
    useEffect(() => {
        const getAll = async () => {
            try {
                if (loadingData && usersList === null) {
                    setUserList([]);
                    const response = await fetchData("/api/user", {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    if (response !== null && response !== undefined) {
                        const jsonResponse = response.data;
                        var usersArr: UserInfoRes[] = [];
                        for (let index = 0; index < jsonResponse.length; index++) {
                            const u = jsonResponse[index];
                            const userInList = UserFromJson(u);
                            usersArr.push(userInList);
                        }
                        setUserList(usersArr);
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
    }, [loadingData, fetchData, usersList])

    const save = async () => {
        try {
            const response = await fetchData("/api/user/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify(userDetail)
            });
            if (response !== null && response !== undefined && response.status == 200) {
                closeModal();
                reloadTable();
                showSnackbar("User saved successfully!")
            } else {
                closeModal();
                showSnackbar("An error ocurred, report this please")
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    const reloadTable = () => {
        setLoadingData(true);
        setUserList(null);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return {
        columns,
        usersList,
        loadingData,
        userDetail,
        setUserDetail,
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

export default useUsers;