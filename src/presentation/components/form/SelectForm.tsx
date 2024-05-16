
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import React from 'react';
import { useState } from 'react';

type SelectFormProps = {
  placeholder?: string,
  value?: string | null,
  onChange?: SelectInputProps<string>['onChange'],
  required?: boolean,
  readOnly?: boolean
}

const SelectForm: React.FC<SelectFormProps> = ({
  placeholder,
  value,
  onChange,
  required = false,
  readOnly = false
}) => {
  const [val, setVal] = useState<string>(value ?? "");
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{placeholder}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={val}
        label={placeholder}
        readOnly={readOnly}
        required={required}
        onChange={(e, c) => {
          setVal(e.target.value);
          if (onChange != null && onChange !== undefined) {
            onChange!(e, c);
          }
        }}
      >
        <MenuItem value={1}>Student</MenuItem>
        <MenuItem value={2}>Librarian</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SelectForm;