import React, { MouseEventHandler } from "react"
import IconButton from "@mui/material/IconButton"

type ButtonIconProps = {
    icon: React.ReactNode,
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ icon, onClick }) => {
    return (
        <>
            <IconButton style={{
                borderRadius: "10px",
            }}
                onClick={onClick}
                type="submit"
            >{icon}</IconButton>
        </>
    )
}

export default ButtonIcon