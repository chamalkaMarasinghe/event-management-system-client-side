import React, { useState, useRef, useEffect } from "react";
import ArrowDownIcon from "../../assets/icons/arrow-down.png";
import ArrowUpIcon from "../../assets/icons/arrow-up.png";
import { twMerge } from "tailwind-merge";
import { FiMinus } from "react-icons/fi";

const DropDownNew = ({
  options = [],
  placeholder = "Select an option",
  defaultOption = null,
  displayKey = "name", // Key for displaying the option
  idKey = "_id", // Key for the unique option identifier
  isSearchable = false,
  disabled = false,
  wrapperClassName = "",
  buttonClassName = "",
  dropdownClassName = "",
  optionClassName = "",
  filterClassName = "",
  outerContainerStyle = "",
  onSelect,
  error,
  label,
  labelStyle,
  isRequired = false,
  name,
  onBlur,
  onFocus,
  allowFillColor = false,
  isForm = false,
  showArrow = true,
  icon = null,
  iconPosition = "right",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [hasBlurred, setHasBlurred] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setSearchTerm("");
    setIsOpen(false);
    onSelect && onSelect(option);

    // Trigger form validation
    if (name && onBlur) {
      onBlur(name, option ? getDisplayValue(option) : "");
    }
  };

  const handleBlur = () => {
    if (name && onBlur) {
      onBlur(name, selectedOption ? getDisplayValue(selectedOption) : "");
    }
  };

  const handleButtonClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      onFocus && onFocus();
      setHasBlurred(true);
    }
  };

  useEffect(() => {
    setSelectedOption(defaultOption);
  }, [defaultOption]);

  const getDisplayValue = (option) => {
    if (!option) return "";
    if (displayKey?.includes("+")) {
      // Handle key combination (e.g., "firstName + lastName")
      const keys = displayKey.split("+").map((key) => key.trim());
      return keys.map((key) => option[key]).join(" ");
    }
    return option[displayKey] || "";
  };

  const filteredOptions = options.filter((option) =>
    getDisplayValue(option).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveSelected = () => {
    setSelectedOption(null);
    onSelect && onSelect(null);

    // Trigger validation when clearing selection
    if (name && onBlur) {
      onBlur(name, "");
    }
  };

  return (
    <div className={twMerge("flex flex-col gap-2 w-full", outerContainerStyle)}>
      {label && !isForm && (
        <label
          className={twMerge(
            "text-light-gray font-inter font-medium text-sm",
            labelStyle
          )}
        >
          {label} {isRequired && <span className="text-light-red">*</span>}
        </label>
      )}
      <div ref={dropdownRef} className={`relative ${wrapperClassName}`}>
        <button
          onClick={handleButtonClick}
          onBlur={() => {
            // Only trigger blur if dropdown is closed
            if (!isOpen && hasBlurred) {
              handleBlur();
            }
          }}
          className={`w-full flex items-center border border-[#CBD5E0] justify-between px-2 py-[10px] rounded-lg text-sm placeholder:text-content placeholder:text-opacity-50 font-inter focus:outline-none ${
            disabled ? "cursor-not-allowed" : "bg-white cursor-pointer"
          } ${
            error
              ? "border-light-red"
              : "border-medium-gray focus:border-light-blue-2"
          } ${buttonClassName} ${
            allowFillColor && selectedOption
              ? "bg-[#E0F2F1] bg-opacity-[30%]"
              : ""
          } `}
        >
          {/* Label inside the border when isForm is true */}
          {label && isForm && (
            <label
              className={twMerge(
                "absolute text-level-6 font-roboto text-light-gray font-medium -top-2.5 left-3 px-1 bg-white",
                labelStyle
              )}
            >
              {label} {isRequired && <span className="text-light-red">*</span>}
            </label>
          )}

          <div className="relative">
            {icon && (
              <span className="absolute left-0 transform -translate-y-1/2 top-1/2">
                {icon}
              </span>
            )}
            <span
              className={`text-level-6 text-light-gray font-medium block truncate ${
                selectedOption ? "opacity-100 font-medium" : "opacity-50"
              } ${icon ? 'pl-6 pr-4' : 'px-2'}`}
              title={
                typeof selectedOption === "object" && selectedOption !== null
                  ? getDisplayValue(selectedOption)
                  : selectedOption || placeholder || "Select an option"
              } // Tooltip on hover
            >
              {typeof selectedOption === "object" && selectedOption !== null
                ? getDisplayValue(selectedOption)
                : selectedOption || placeholder || "Select an option"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {selectedOption && !disabled && (
              <div
                onClick={(event) => {
                  event.stopPropagation(); // Prevent click event from propagating to the parent button
                  handleRemoveSelected();
                }}
                className="flex items-center justify-center w-4 h-4 bg-red-100 rounded-full cursor-pointer hover:bg-red-200"
              >
                <FiMinus className="w-3 h-3 text-red-500" />
              </div>
            )}
            {showArrow && (
              <img
                src={isOpen ? ArrowUpIcon : ArrowDownIcon}
                alt="arrow"
                className="w-4 h-4"
              />
            )}
          </div>
        </button>

        {isOpen && (
          <div
            className={`absolute w-full rounded-lg px-2 py-2 mt-[2px] bg-white border z-10 ${dropdownClassName}`}
          >
            {isSearchable && (
              <div className="p-2 mb-1 border-b">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-3 py-2 border rounded outline-none "
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}

            <div
              className={twMerge`max-h-[200px] overflow-y-auto scrollbar-no-radius pr-2 ${filterClassName}`}
            >
              {/* {filteredOptions.map((option) => (
                <div
                  key={option[idKey]}
                  onClick={() => handleSelect(option)}
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${optionClassName}`}
                  title={getDisplayValue(option)} // Tooltip on hover
                >
                  <span className="block truncate">
                    {getDisplayValue(option)}
                  </span>
                </div>
              ))} */}
              {filteredOptions.map((option) => {
                const isSelected =
                  selectedOption && option[idKey] === selectedOption[idKey];

                return (
                  <div
                    key={option[idKey]}
                    onClick={() => handleSelect(option)}
                    className={twMerge(
                      "px-4 py-2 cursor-pointer rounded-md",
                      optionClassName,
                      isSelected ? "bg-gray-50" : "hover:bg-gray-100"
                    )}
                    style={isSelected ? { border: "1px solid #DDE1E666" } : {}}
                    title={getDisplayValue(option)} // Tooltip on hover
                  >
                    <span
                      className={`font-inter text-level-6 text-light-gray block truncate ${
                        isSelected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {getDisplayValue(option)}
                    </span>
                  </div>
                );
              })}

              {filteredOptions.length === 0 && (
                <div className="px-4 py-2 font-medium text-center text-gray-500 font-inter">
                  No results found
                </div>
              )}
            </div>
          </div>
        )}
        {error && (
          <span className="pl-3 text-light-red text-level-7 font-inter">
            {error}
          </span>
        )}
      </div>
    </div>
  );
};

export default DropDownNew;
