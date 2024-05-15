import React, { MouseEventHandler } from "react"
import Button, { ButtonPropsSizeOverrides } from "@mui/material/Button"
import Icon from "@mui/material/Icon"
import { OverridableStringUnion } from '@mui/types';

type ButtonPrimaryIconProps = {
    text: string,
    onClick: MouseEventHandler<HTMLButtonElement>,
    type?: "submit" | "reset" | "button" | undefined,
    icon: string,
    size?: OverridableStringUnion<'small' | 'medium' | 'large', ButtonPropsSizeOverrides>,
}

const ButtonPrimaryIcon: React.FC<ButtonPrimaryIconProps> = ({ text, onClick, type, icon, size }) => {
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
                startIcon={
                    <Icon>{icon}</Icon>
                }
                size={size}
            >{text}</Button>
        </>
    )
}

export default ButtonPrimaryIcon;