import React from 'react';
import IconButton from '@mui/material/IconButton';
import propTypes from "prop-types"

const ButtonIcon = ({ icon, onClick }) => {
    return (
        <>
            <IconButton variant="contained" style={{
                borderRadius: "10px",
            }}
                onClick={onClick}
                type="submit"
            >{icon}</IconButton>
        </>
    )
}

ButtonIcon.propTypes = {
    icon: propTypes.any,
    onClick: propTypes.func
}

export default ButtonIcon