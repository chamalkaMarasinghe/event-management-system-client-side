import { twMerge } from "tailwind-merge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import { FiMinus } from "react-icons/fi";

export default function CustomDatePicker({
                                             id,
                                             label,
                                             placeholder,
                                             onChange,
                                             onBlur,
                                             value,
                                             isRequired = false,
                                             labelStyle,
                                             outerContainerStyle,
                                             inputStyle,
                                             pickerWidth = "100%",
                                             pickerHeight = "3rem",
                                             error,
                                             disabled = false,
                                             onFocus,
                                             allowFillColor = false,
                                             borderRadius = "8px",
                                         }) {
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [pickerIconClicked, setPickerIconClicked] = useState(false);

    // Handle real blur events
    const handleRealBlur = () => {
        if (!isPickerOpen && onBlur) {
            onBlur();
        }
    };

    // Handle clear date
    const handleClearDate = (e) => {
        e.stopPropagation(); // Prevent opening the date picker
        if (onChange) {
            onChange(null);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className={twMerge("flex flex-col w-full", outerContainerStyle)}>
                {label && (
                    <label
                        htmlFor={id}
                        className={twMerge(
                            "text-light-gray font-inter mb-2 font-medium text-sm",
                            labelStyle
                        )}
                    >
                        {label} {isRequired && <span className="text-light-red">*</span>}
                    </label>
                )}
                <div
                    style={{
                        width: pickerWidth,
                        height: pickerHeight,
                    }}
                    className={
                        disabled ? "cursor-not-allowed relative" : "bg-white cursor-pointer relative"
                    }
                    onBlur={onBlur}
                >
                    <DatePicker
                        disabled={disabled}
                        sx={{
                            width: "100%",
                            height: "100%",
                            "& .MuiOutlinedInput-root": {
                                width: "100%",
                                height: "100%",
                                "& input": {
                                    width: "100%",
                                    cursor: "pointer",
                                    caretColor: "transparent", // Hide cursor
                                    "&::placeholder": {
                                        color: "#33415580",
                                        opacity: 1,
                                        fontSize: "14px",
                                        fontFamily: "Roboto",
                                        fontWeight: 400,
                                    },
                                },
                                "& fieldset": {
                                    borderWidth: "1px",
                                    borderRadius: borderRadius,
                                    borderColor: error ? "#C90303" : "#D1D5DB",
                                    backgroundColor:
                                        allowFillColor && value ? "rgba(224, 242, 241, 0.3)" : "",
                                },
                                "&:hover fieldset": {
                                    borderColor: error ? "#C90303" : "#B9C1CA",
                                },
                                "&.Mui-focused fieldset": {
                                    borderWidth: "1px",
                                    borderColor: "#B9C1CA",
                                },
                                // Hide the default calendar icon when the user enters a value (show the close icn)
                                "& .MuiInputAdornment-root": {
                                    display: value ? "none" : "flex",
                                },
                            },
                        }}
                        slotProps={{
                            popper: {
                                sx: {
                                    "& .MuiDateCalendar-root": {
                                        backgroundColor: "white",
                                        "& .MuiPickersDay-root": {
                                            "&.Mui-selected": {
                                                backgroundColor: "var(--primary-color)",
                                                color: "white",
                                                "&:hover": {
                                                    backgroundColor: "var(--secondary-color)",
                                                },
                                            },
                                            "& .font-size-12": {
                                                fontSize: "12px",
                                            },
                                        },
                                    },
                                },
                            },
                            textField: {
                                onBlur: handleRealBlur,
                                onFocus: onFocus,
                                placeholder: placeholder || "Date",
                                inputProps: {
                                    readOnly: true, // Disable keyboard input
                                    style: { cursor: "pointer" }
                                }
                            },
                        }}
                        format="YYYY/MM/DD"
                        value={value || null}
                        onChange={onChange}
                        onFocus={onFocus}
                        onOpen={() => {
                            setPickerIconClicked(true);
                            setIsPickerOpen(true);
                        }}
                        onClose={() => {
                            setPickerIconClicked(false);
                            setIsPickerOpen(false);
                        }}
                    />

                    {value && !disabled && (
                        <button
                            type="button"
                            onClick={handleClearDate}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10 transition-colors duration-200"
                            style={{
                                padding: "4px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "transparent",
                                border: "none",
                                outline: "none"
                            }}
                            aria-label="Clear date"
                        >
                            <FiMinus size={15} className="bg-red-200 rounded-full text-red-500" />
                        </button>
                    )}
                </div>
                <div className="h-3">
                    {!isPickerOpen && !pickerIconClicked && error && (
                        <span className="pl-3 text-light-red text-level-7 font-inter">
              {error}
            </span>
                    )}
                </div>
            </div>
        </LocalizationProvider>
    );
}
