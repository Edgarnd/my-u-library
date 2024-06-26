import * as React from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useTheme } from '@mui/system';

type InputTextAreaFormProps = {
  placeholder?: string,
  type?: string,
  value?: string | null,
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | null,
  mtLabel?: string,
  hInput?: string,
  required?: boolean
}

const InputTextAreaForm: React.FC<InputTextAreaFormProps> = ({
  placeholder,
  type,
  value,
  onChange,
  mtLabel = "0px",
  hInput,
  required = false
}) => {
  const [val, setVal] = React.useState<string>(value ?? "");
  return (
    <React.Fragment>
      <TextareaAutosize
        className="CustomTextarea"
        aria-label="empty textarea"
        placeholder={placeholder}
        value={val}
        required={required}
        minRows={4}
        onChange={(e) => {
          setVal(e.target.value);
          if (onChange != null && onChange !== undefined) {
            onChange!(e);
          }
        }}
        style={{
          width: "100%"
        }}
      />
      <Styles />
    </React.Fragment>
  );
}
const cyan = {
  50: '#E9F8FC',
  100: '#BDEBF4',
  200: '#99D8E5',
  300: '#66BACC',
  400: '#1F94AD',
  500: '#0D5463',
  600: '#094855',
  700: '#063C47',
  800: '#043039',
  900: '#022127',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

function Styles() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  return (
    <style>
      {`
      .CustomTextarea {
        box-sizing: border-box;
        width: 320px;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: ${isDarkMode ? grey[300] : grey[900]};
        background: transparent;
        border: 1px solid ${isDarkMode ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${isDarkMode ? grey[900] : grey[50]};
        width: 100%;
      }

     .CustomTextarea:hover {
        border-color: ${cyan[400]};
      }

     .CustomTextarea:focus {
        outline: 0;
        border-color: ${cyan[400]};
        box-shadow: 0 0 0 3px ${isDarkMode ? cyan[500] : cyan[200]};
      }

      // firefox
      .CustomTextarea:focus-visible {
        outline: 0;
      }
    `}
    </style>
  );
}

export default InputTextAreaForm;