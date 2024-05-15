import { TextField } from '@mui/material'
import propTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';

function InputTextForm({
  placeholder,
  type,
  value,
  onChange,
  mtLabel = "0px",
  hInput,
  required = false
}) {
  const [val, setVal] = useState(value);
  return (
    <div style={{ height: hInput }}>
      <TextField
        id="outlined-basic"
        label={placeholder}
        variant="outlined"
        type={type}
        value={val}
        size="small"
        autoComplete="off"
        required={required}
        style={{
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}
        InputLabelProps={{
          style: {
            marginTop: mtLabel,
            fontSize: "14px"
          }
        }}
        InputProps={{
          sx: { borderRadius: "8px" },
          style: {
            height: "100%",
            boxSizing: "border-box",
            fontSize: "14px"
          },
        }}
        onChange={(e) => {
          setVal(e.target.value);
          if (onChange != null && onChange !== undefined) {
            onChange(e.target);
          }
        }} />
    </div>
  );
}

InputTextForm.propTypes = {
  placeholder: propTypes.string,
  type: propTypes.string,
  value: propTypes.string,
  onChange: propTypes.func,
  mtLabel: propTypes.string,
  hInput: propTypes.string,
}

export default InputTextForm;