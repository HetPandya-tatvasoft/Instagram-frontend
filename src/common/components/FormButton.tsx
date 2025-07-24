import React from "react";
import { ClipLoader } from "react-spinners";
import type { ButtonHTMLAttributes } from "react";

interface IFormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    loading?: boolean;
    loaderColor?: string;
}

const FormButton: React.FC<IFormButtonProps> = ({
    label,
    loading = false,
    loaderColor = "#fff",
    className = "",
    ...rest
}) => {
    return (
        <button
            {...rest}
            className={`bg-[#4cb5f9] hover:bg-[#4099db] text-white py-1 rounded-lg font-medium disabled:opacity-50 ${className}`}
        >
            {loading ? <ClipLoader size={20} color={loaderColor} /> : label}
        </button>
    );
};

export default FormButton;
