import { FileUploadOutlined } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import React, { ChangeEventHandler } from "react";

type InputFileFormProps = {
    onChange?: ChangeEventHandler<any> | undefined;
    value?: string | undefined
}

const InputFileForm: React.FC<InputFileFormProps> = ({ onChange, value }) => {
    const [val, setVal] = React.useState<string>(value ?? "");
    return (
        <TextField
            variant="standard"
            type="text"
            value={val}
            InputProps={{
                readOnly: true,
                endAdornment: (
                    <IconButton component="label">
                        <FileUploadOutlined />
                        <input
                            style={{ display: "none" }}
                            accept="image/*"
                            type="file"
                            hidden
                            onChange={(e) => {
                                if (e.target.files !== null && e.target.files !== undefined) {
                                    let filePhoto = e.target.files[0];
                                    if (filePhoto !== null && filePhoto !== undefined) {
                                        setVal(filePhoto.name);
                                        if (onChange !== undefined && onChange !== null) {
                                            onChange(e);
                                        }
                                    }
                                }
                            }}
                            name="[photo]"
                        />
                    </IconButton>
                ),
            }}
        />
    );
}

export default InputFileForm;