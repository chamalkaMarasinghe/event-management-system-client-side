import React, { useState } from "react";
import { CLIENT_ORDERS_TABLE_TABS } from "../../constants/commonConstants";

const TabButtonPlane = ({ options = [], selectedOption = null, setSelectedOptions = () => {} }) => {
    
    return (
        <div className="flex w-full h-auto">
            <div className="flex flex-row gap-4 border-b border-light-blue">
                {
                    options?.map((item, index) => {
                        return(
                            <>
                                <p
                                    className={`cursor-pointer lg:text-[0.75rem] text-[0.5rem] text-dark-gray font-inter font-medium ${
                                        selectedOption === item
                                            ? "border-b-[2px] pb-1 border-[var(--primary-color)]"
                                            : ""
                                    }`}
                                    onClick={() => setSelectedOptions(item)}
                                    key={index}
                                >
                                    {item}
                                </p>
                            </>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default TabButtonPlane;
