import Button from "@mui/material/Button"
import Icon from "@mui/material/Icon"
import propTypes from "prop-types"

const ButtonPrimaryIcon = ({ text, onClick, type, icon, size }) => {
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

ButtonPrimaryIcon.propTypes = {
    text: propTypes.string,
    onClick: propTypes.func,
    type: propTypes.string,
    icon: propTypes.string,
    size: propTypes.string,
}

export default ButtonPrimaryIcon