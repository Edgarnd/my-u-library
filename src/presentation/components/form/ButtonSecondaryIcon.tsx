import React, { MouseEventHandler } from "react"
import Button, { ButtonPropsSizeOverrides } from "@mui/material/Button"
import Icon from "@mui/material/Icon"
import { OverridableStringUnion } from '@mui/types';

type ButtonSecondaryIconProps = {
    text: string,
    onClick: MouseEventHandler<HTMLButtonElement>,
    type?: "submit" | "reset" | "button" | undefined,
    icon: string,
    size?: OverridableStringUnion<'small' | 'medium' | 'large', ButtonPropsSizeOverrides>,
}

const ButtonSecondaryIcon: React.FC<ButtonSecondaryIconProps> = ({ text, onClick, type, icon, size }) => {
    return (
        <>
            <Button variant="outlined" style={{
                width: "100%",
                borderRadius: "10px",
                height: "100%",
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


export default ButtonSecondaryIcon