import React, { MouseEventHandler } from "react"
import Button, { ButtonPropsSizeOverrides } from "@mui/material/Button"
import { OverridableStringUnion } from '@mui/types';

type ButtonPrimaryProps = {
    text: string,
    onClick: MouseEventHandler<HTMLButtonElement>,
    type?: "submit" | "reset" | "button" | undefined,
    icon?: string,
    size?: OverridableStringUnion<'small' | 'medium' | 'large', ButtonPropsSizeOverrides>,
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ text, onClick, type, size }) => {
    return (
        <>
            <Button variant="contained" style={{
                width: "100%",
                borderRadius: "10px",
                height: "40px",
                fontWeight: "bold",
                textTransform: "none"
            }}
                onClick={onClick}
                type={type}
                size={size}
            >{text}</Button>
        </>
    )
}

export default ButtonPrimary