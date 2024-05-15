import Button from "@mui/material/Button"
import propTypes from "prop-types"
import React from "react"

const ButtonPrimary = ({ text, onClick, type, size }) => {
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

ButtonPrimary.propTypes = {
    text: propTypes.string,
    onClick: propTypes.func,
    type: propTypes.string,
    size: propTypes.string,
}

export default ButtonPrimary