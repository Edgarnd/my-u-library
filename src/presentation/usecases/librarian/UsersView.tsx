import React from "react";
import CardCustom from "../../components/shared/CardCustom.tsx";
import Layout from "../../components/shared/Layout.tsx";
import DataTableCustom from "../../components/shared/DataTableCustom.tsx";
import ButtonLink from "../../components/form/ButtonLink.tsx";
import DialogCustom from "../../components/dialog/DialogCustom.tsx";
import ButtonPrimary from "../../components/form/ButtonPrimary.tsx";
import useUsers from "../../../domain/hook/librarian/useUsers.tsx";
import UserForm from "../../content/UserForm.tsx";
import { UserRegisterReq } from "../../../data/model/request/UserRegisterReq.ts";

const UsersView = () => {
    const {
        columns,
        usersList,
        loadingData,
        isOpen,
        closeModal,
        setIsOpen,
        userDetail,
        setUserDetail,
        isAdding,
        setIsAdding,
        isViewing,
        setIsViewing,
        title,
        setTitle,
        save,
    } = useUsers();
    return (
        <>
            <Layout>
                <CardCustom>
                    <DataTableCustom
                        label="Books"
                        columns={columns}
                        data={usersList ?? []}
                        loading={loadingData}
                        onAdd={() => {
                            setIsViewing(false);
                            setIsAdding(true);
                            setUserDetail(new UserRegisterReq());
                            setTitle("New User");
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
                                {isAdding && <UserForm userRegister={userDetail!} />}
                                {isViewing && <UserForm userRegister={userDetail!} readOnly={true} />}
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
                                            text="Save user"
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

export default UsersView;