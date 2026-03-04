import React from "react";
import { twMerge } from "tailwind-merge";
import { ClipLoader } from "react-spinners";

const CustomButton = ({
    buttonText = "Button",
    bgColor = "bg-primary",
    textColor = "text-white",
    width = "w-full",
    height = "h-12",
    borderColor = "border-transparent",
    icon,
    iconPosition = "left",
    loading = false,
    pulse = false,
    className,
    textWeight = "font-bold",
    loaderColor = "var(--tertiary-color)",
    ...rest
}) => {

    if (pulse) {
        return (
            <div
                className={twMerge(
                    `flex items-center justify-center border gap-2 rounded-xl font-medium focus:outline-none`,
                    bgColor,
                    textColor,
                    width,
                    height,
                    borderColor,
                    className,
                    "border-none bg-slate-300 animate-pulse text-transparent"
                )}
            >
                Loading
            </div>
        );
    }

    return (
        <button
            className={twMerge(
                `flex items-center justify-center border gap-2 rounded-xl font-medium focus:outline-none transition-all duration-300 ease-in-out`,
                bgColor,
                textColor,
                width,
                height,
                borderColor,
                className,
                rest.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            )}
            {...rest}
        >
            {loading ? (
                <ClipLoader size={18} color={loaderColor} />
            ) : (
                <>
                    {icon && iconPosition === "left" && icon}
                    <span className={textWeight}>{buttonText}</span>
                    {icon && iconPosition === "right" && icon}
                </>
            )}
        </button>
    );
};

export default CustomButton;