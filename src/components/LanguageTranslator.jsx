import React, { useRef, useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LANGUAGE } from "../constants/commonConstants";
import { capitalize } from "../utils/formatting";
import { useLanguage } from "../context/language/language";

export default function LanguageSelector({ viewType = "desktop" }) {
  const { language, setLanguage } = useLanguage();

  const dropdownRef = useRef(null); // menu
  const triggerRef = useRef(null); // button
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef, isOpen, triggerRef]);

  return (
    <div className="relative">
      <div
        ref={triggerRef}
        key={language}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex ${
          viewType === "mobile" ? "w-full" : "w-[114px]"
        } h-auto cursor-pointer select-none items-center`}
      >
        <div
          className={`flex justify-content-between items-center ${
            viewType === "mobile" ? "gap-x-[13px]" : "gap-x-[8px]"
          } `}
        >
          <img
            src={LANGUAGE[language]?.flag}
            alt=""
            className={`${viewType === "mobile" ? "w-8 h-8" : "w-6 h-6"}`}
          />
          <div className="w-[53px] h-[19px] flex items-center justify-center">
            <span className="font-roboto font-medium text-[16px]">
              {capitalize(language)}
            </span>
          </div>
          {!isOpen ? (
            <IoIosArrowDown className="w-[16px] h-[16px]" />
          ) : (
            <IoIosArrowUp className="w-[16px] h-[16px]" />
          )}
        </div>
      </div>

      {isOpen &&
        (viewType === "mobile" ? (
          <div
            ref={dropdownRef}
            className={`
                    mt-4 ml-[43px] flex flex-col gap-6 overflow-hidden transition-all duration-300
                    ${
                      isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                    }
                  `}
          >
            {Object.values(LANGUAGE).map((l) => (
              <span
                key={l.value}
                onClick={() => {
                  setLanguage(l.value);
                  setIsOpen(false);
                }}
                className="flex items-center gap-x-3"
              >
                <img src={l.flag} alt="" className="w-6 h-6 rounded-full" />
                {capitalize(l.value)}
              </span>
            ))}
          </div>
        ) : (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-[180px] rounded-[12px] border border-[#E6E7EC] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-50 overflow-hidden"
          >
            {Object.values(LANGUAGE).map((l, index) => (
              <button
                key={l.value}
                onClick={() => {
                  setLanguage(l.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 flex items-center gap-x-3 text-[16px] text-[#334155] hover:bg-gray-100 hover:text-user-orange transition ${
                  index === 0
                    ? "hover:rounded-t-[12px]"
                    : index === Object.values(LANGUAGE).length - 1
                    ? "hover:rounded-b-[12px]"
                    : "hover:rounded-none"
                }`}
              >
                <img src={l.flag} alt="" className="w-6 h-6 rounded-full" />
                {capitalize(l.value)}
              </button>
            ))}
          </div>
        ))}
    </div>
  );
}
