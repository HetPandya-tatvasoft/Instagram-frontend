import { TextField } from "@mui/material";
import type { ChangeEvent, FocusEvent } from "react";

interface FormikTextFieldProps {
    label: string;
    id?: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error?: boolean;
    helperText: string | false | undefined;
}

const FormikTextField: React.FC<FormikTextFieldProps> = ({
    label,
    id,
    name,
    type = "text",
    value,
    onChange,
    onBlur,
    error,
    helperText,
}) => {
    return (
        <TextField
            fullWidth
            label={label}
            id={id}
            name={name}
            type={type}
            variant="outlined"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            helperText={helperText}
        />
    );
};

export default FormikTextField;
