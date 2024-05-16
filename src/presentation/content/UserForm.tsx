import Grid from "@mui/material/Grid";
import React from "react";
import InputTextForm from "../components/form/InputTextForm.tsx";
import { UserRegisterReq } from "../../data/model/request/UserRegisterReq.ts";
import SelectForm from "../components/form/SelectForm.tsx";

interface UserFormProps {
    userRegister?: UserRegisterReq;
    readOnly?: boolean | undefined
}

export default function UserForm({ userRegister = new UserRegisterReq(), readOnly = false }: UserFormProps) {
    return (
        <Grid container columns={12} spacing={5} rowSpacing={3}>
            <Grid item xs={12} md={6}>
                <InputTextForm
                    placeholder="Email"
                    readOnly={readOnly}
                    value={userRegister.email}
                    onChange={(e) => userRegister.email = e.target.value} />
            </Grid>
            <Grid item xs={12} md={6}>
                <InputTextForm
                    placeholder="Password"
                    readOnly={readOnly}
                    value={userRegister.password}
                    onChange={(e) => userRegister.password = e.target.value} />
            </Grid>
            <Grid item xs={12} md={6}>
                <SelectForm
                    placeholder="Role"
                    value={userRegister.role}
                    onChange={(e) => userRegister.role = e.target.value} 
                    readOnly={readOnly} />
            </Grid>
        </Grid>
    )
}

