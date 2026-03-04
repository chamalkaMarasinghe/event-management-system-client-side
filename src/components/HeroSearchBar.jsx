import React, { useState } from "react";

const HeroSearchBar = ({ searchTerm = "", setSearchTerm, handleSearch}) => {
  
  return (
    <div className="w-full max-w-4xl mx-auto border-[3px] rounded-[10px] border-[#FFFFFF]">
      <div className="flex items-center">
        <div className="flex items-center justify-between w-full bg-[#00000066] bg-opacity-70 rounded-[10px]">
          <input
            type="text"
            placeholder="Search Events, Workshops, And Experiences"
            value={searchTerm}
            onChange={(e => setSearchTerm(e.target.value))}
            className="w-full max-w-[600px] h-[55px] py-2 px-4 bg-transparent font-medium font-roboto text-sm sm:text-base md:text-[16px] text-[#FFFFFF] capitalize focus:outline-none placeholder:text-[#FFFFFF] placeholder:font-normal placeholder:font-roboto"
          />
          <button 
            onClick={handleSearch}
            className="w-24 sm:w-28 md:w-[114px] h-[45px] flex items-center justify-center mr-[5px] bg-white rounded-[5px]"
          >
            <p className="font-medium text-black font-roboto text-sm sm:text-base md:text-[16px]">SEARCH</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSearchBar;