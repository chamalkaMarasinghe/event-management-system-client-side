import { useState } from "react";
import arrowDown from "../../assets/icons/circle-arrow-down.svg";
import arrowUp from "../../assets/icons/circle-arrow-up.svg";

const ExpandableText = ({ text, maxLength = 253 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

   // Add a check to handle undefined or null text
   if (!text) return null; 

  // Check if the text exceeds the maxLength
  const shouldShowSeeMore = text.length > maxLength;

  return (
    <div>
      <div className="text-sm font-normal text-content md:text-base font-inter">
        <p>{isExpanded ? text : `${text.substring(0, maxLength)}`}</p>
      </div>
      {/* Render See More button only if the text exceeds maxLength */}
      {shouldShowSeeMore && (
        <div className="flex flex-row ">
          <button
            className="flex flex-row justify-center items-center gap-[10px] text-[var(--primary-color)] text-inter font-semibold text-[18px]"
            onClick={toggleExpand}
          >
            {isExpanded ? "See Less" : "See More"}{" "}
            <img src={isExpanded ? arrowUp : arrowDown} alt="arrow" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpandableText;
