import { TextField } from "@mui/material";
import type { ChangeEvent, FocusEvent } from "react";

// src/types/FormikTextFieldPropsType.ts

export interface IFormikInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: boolean;
    helperText?: string;
}

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
