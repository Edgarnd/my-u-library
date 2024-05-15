import React, { MouseEventHandler } from "react"
import Button, { ButtonPropsSizeOverrides } from "@mui/material/Button"
import { OverridableStringUnion } from '@mui/types';

type ButtonLinkProps = {
    text: string,
    onClick: MouseEventHandler<HTMLButtonElement>,
    type?: "submit" | "reset" | "button" | undefined,
    icon?: string,
    size?: OverridableStringUnion<'small' | 'medium' | 'large', ButtonPropsSizeOverrides>,
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ text, onClick, type, size }) => {
    return (
        <>
            <Button variant="text"
                style={{
                    width: "100%",
                    textTransform: "none"
                }}
                onClick={onClick}
                type={type}
                size={size}
            >{text}</Button>
        </>
    )
}

export default ButtonLink