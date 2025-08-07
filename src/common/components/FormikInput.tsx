import { TextField } from "@mui/material";
import type { ChangeEvent, FocusEvent } from "react";
import { IFormikInputProps } from "../types/commonComponent.type";

// src/types/FormikTextFieldPropsType.ts



const FormikInput: React.FC<IFormikInputProps> = ({
    label,
    id,
    name,
    value,
    type = 'text',
    onChange,
    onBlur,
    error,
    helperText,
    ...rest
}) => {
    return (
        <input
            id={id}
        />
    );
};

export default FormikInput;
