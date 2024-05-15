import Button from "@mui/material/Button"
import propTypes from "prop-types"
import React from "react"

const ButtonLink = ({ text, onClick, type, size }) => {
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

ButtonLink.propTypes = {
    text: propTypes.string,
    onClick: propTypes.func,
    type: propTypes.string,
    size: propTypes.string,
}

export default ButtonLink