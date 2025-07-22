import { TextField, type TextFieldProps } from "@mui/material";
import type { ChangeEvent, FocusEvent } from "react";

export interface FormikTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id?: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: boolean;
  helperText: string | false | undefined;
  shrinkLabel?: boolean;
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
  shrinkLabel,
  placeholder,
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
      placeholder={placeholder}
      error={error}
      helperText={helperText}
      slotProps={{
        inputLabel: {
          shrink: shrinkLabel,
        },
      }}
    />
  );
};

export default FormikTextField;
