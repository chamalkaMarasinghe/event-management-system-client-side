import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import searchIconImg from "../../assets/icons/search-icon.png";
import { ClipLoader } from "react-spinners";

const Input = ({
  id,
  name,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  onBlur,
  isRequired,
  labelStyle,
  inputStyle,
  error,
  className = "",
  outerContainerStyle = "",
  searchIcon = false,
  icon,
  allowFillColor = false,
  disabled,
  isFilterSearch = false,
  isForm = false,
  loading = false,
  inlineLoading = false,
  loaderColor = "var(--tertiary-color)",
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getBorderClasses = () => {
    if (error) return "border-light-red";
    if (isFocused) return "border-light-blue-2";
    return "border-medium-gray";
  };

  if (type === "textarea") {
    return (
      <div className={twMerge("flex flex-col w-full", outerContainerStyle)}>
        {label && !isForm && (
          <label
            htmlFor={id}
            className={twMerge(
              "text-light-gray font-inter font-medium text-sm mb-2",
              labelStyle
            )}
          >
            {label} 
          </label>
        )}
        <div className="relative">
          <textarea
            id={id}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              if (onBlur) onBlur(e);
            }}
            className={twMerge(
              `w-full h-12 px-4 py-[13px] rounded-lg border text-sm placeholder:text-content placeholder:text-opacity-50 font-inter focus:outline-none ${className}
              ${allowFillColor && value ? "bg-[#E0F2F1] bg-opacity-[30%]" : ""}
              ${getBorderClasses()}`,
              inputStyle
            )}
            {...rest}
          />
          
          {/* Label inside the border when isForm is true */}
          {label && isForm && (
            <label
              htmlFor={id}
              className={twMerge(
                "absolute text-level-6 font-inter text-light-gray font-medium -top-2.5 left-3 px-1 bg-white",
                labelStyle
              )}
            >
              {label} 
            </label>
          )}
        </div>
        
        {!isFilterSearch && (
          <div className="h-3 flex items-start justify-start">
            {error && (
              <span className="text-light-red text-level-7 pl-2 font-inter">
                {error}
              </span>
            )}
          </div>
        )}
      </div>
    );
  } else {
    if(!loading){
      return (
        <div className={twMerge("flex flex-col w-full", outerContainerStyle)}>
          {label && !isForm && (
            <label
              htmlFor={id}
              className={twMerge(
                "text-light-gray font-inter font-medium mb-2 text-sm",
                labelStyle
              )}
            >
              {label} 
            </label>
          )}
          <div className="relative">
            {searchIcon && (
              <img
                src={searchIconImg}
                alt="search"
                className="absolute top-1/2 left-3 w-5 h-5 transform -translate-y-1/2"
              />
            )}
            {
              inlineLoading &&
              <div className="absolute top-1/2 right-3 w-5 h-5 transform -translate-y-1/2">
                <ClipLoader size={18} color={loaderColor} />
              </div>
            }
            <input
              id={id}
              type={type}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              disabled={disabled}
              onFocus={() => setIsFocused(true)}
              onBlur={(e) => {
                setIsFocused(false);
                if (onBlur) onBlur(e);
              }}
              className={twMerge(
                `w-full h-12 px-4 rounded-lg border text-sm placeholder:text-content placeholder:text-opacity-50 font-inter focus:outline-none ${className} 
                ${allowFillColor && value ? "bg-[#E0F2F1] bg-opacity-[30%]" : ""}
                ${getBorderClasses()}`,
                inputStyle
              )}
              {...rest}
            />
            
            {/* Label inside the border when isForm is true */}
            {label && isForm && (
              <label
                htmlFor={id}
                className={twMerge(
                  "absolute text-level-6 font-inter text-light-gray font-medium -top-2.5 left-3 px-1 bg-white",
                  labelStyle
                )}
              >
                {label} 
              </label>
            )}
            
            {icon}
          </div>
  
          {!isFilterSearch && (
            <div className="h-3 flex items-start justify-start">
              {error && (
                <span className="text-light-red text-level-7 pl-2 pt-[2px] font-inter">
                  {error}
                </span>
              )}
            </div>
          )}
        </div>
      );
    }else{
      return (
        <div className={twMerge("flex flex-col w-full", outerContainerStyle)}>
          {label && !isForm && (
            <label
              htmlFor={id}
              className={twMerge(
                "text-light-gray font-inter font-medium mb-2 text-sm",
                labelStyle,
                "rounded-[10px] w-[150px] text-transparent bg-slate-200 animate-pulse"
              )}
            >
              {label} 
            </label>
          )}
          <div className="relative">
            {searchIcon && (
              <img
                src={searchIconImg}
                alt="search"
                className="absolute top-1/2 left-3 w-5 h-5 transform -translate-y-1/2"
              />
            )}
            <input
              id={id}
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              disabled={disabled}
              onFocus={() => setIsFocused(true)}
              onBlur={(e) => {
                setIsFocused(false);
                if (onBlur) onBlur(e);
              }}
              className={twMerge(
                `w-full h-12 px-4 rounded-lg border text-sm placeholder:text-content placeholder:text-opacity-50 font-inter focus:outline-none ${className} 
                ${allowFillColor && value ? "bg-[#E0F2F1] bg-opacity-[30%]" : ""}
                ${getBorderClasses()}`,
                inputStyle,
                "bg-slate-200 animate-pulse"
              )}
              {...rest}
            />
            
            {/* Label inside the border when isForm is true */}
            {/* {label && isForm && (
              <label
                htmlFor={id}
                className={twMerge(
                  "absolute text-level-6 font-inter text-light-gray font-medium -top-2.5 left-3 px-1 bg-white",
                  labelStyle,
                  "rounded-[10px] w-[150px] text-transparent bg-slate-200 animate-pulse"
                )}
              >
                {label} 
              </label>
            )} */}
            
            {icon}
          </div>
  
          {!isFilterSearch && (
            <div className="h-3 flex items-start justify-start">
              {error && (
                <span className="text-light-red text-level-7 pl-2 pt-[2px] font-inter">
                  {error}
                </span>
              )}
            </div>
          )}
        </div>
      );
    }
  }
};

export default Input;

