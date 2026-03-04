import React from "react";
import { IoRepeatOutline } from "react-icons/io5";
import { Popover } from "antd";

const InfoChip = ({
  icon: Icon,
  label,
  value,
  recurring,
  truncate = false,
  multipleLocations = false,
  eventLocations = [], // Added to directly access eventLocations array for Popover content
}) => {
  return (
    <>
      {/* CSS animation styles - only added when truncate is true */}
      {truncate && (
        <style>{`
          @keyframes scrollTooltip {
            0%, 20% {
              transform: translateX(0%);
            }
            80%, 100% {
              transform: translateX(-50%);
            }
          }
          .tooltip-animated {
            animation: scrollTooltip 6s ease-in-out infinite;
          }
          @media (min-width: 1565px) {
            .truncate-1565 {
              overflow: visible !important;
              text-overflow: unset !important;
              white-space: normal !important;
              max-width: none !important;
            }
            .tooltip-1565 {
              display: none !important;
            }
          }
          .tooltip-500 {
            left: 0 !important;
            right: auto !important;
            max-width: 200px !important;
          }
          @media (min-width: 501px) {
            .tooltip-500 {
              right: 0 !important;
              left: auto !important;
              max-width: min(250px, 80vw) !important;
            }
          }
          .popover-scrollable {
            max-height: 200px;
            overflow-y: auto;
            padding: 8px 12px;
            max-width: min(300px, 80vw);
          }
          .popover-scrollable div:not(:last-child) {
            margin-bottom: 8px;
          }
        `}</style>
      )}

      <div
        className={`flex items-center gap-1 h-7 sm:h-9 rounded-[4px] pt-1.5 pr-2 pb-1.5 pl-2 bg-[#FFF7ED] ${
          truncate ? "relative group" : ""
        } ${multipleLocations ? "cursor-pointer" : ""}`}
      >
        {Icon && (
          <Icon
            className={`md:w-6 md:h-6 md:mb-1 text-light-gray ${
              truncate ? "flex-shrink-0" : ""
            }`}
          />
        )}
        <span
          className={`font-medium text-light-gray font-roboto text-level-7 xs:text-level-6 ${
            truncate ? "flex-shrink-0" : ""
          }`}
        >{`${label}:`}</span>

      {/* Simplified rendering to show single location directly without Popover */}
        {/* Render single location without Popover */}
        {value && !multipleLocations && (
          <span className="font-normal text-deep-gray text-level-7 xs:text-level-6 font-roboto">
            {value}
          </span>
        )}

        {/* Render multiple locations with scrollable Popover */}
        {/* Removed truncate condition from Popover rendering, 
         Here the popover only appears when multipleLocations is set to be true */}
        {value && multipleLocations && (
          <Popover
            content={
              <div className="popover-scrollable">
                {eventLocations.length > 0 ? (
                  eventLocations.map((location, index) => (
                    <div
                      key={index}
                      className="font-normal text-deep-gray text-level-7 xs:text-level-6 font-roboto"
                    >
                      {location?.address || "Unknown address"}
                    </div>
                  ))
                ) : (
                  <div className="font-normal text-deep-gray text-level-7 xs:text-level-6 font-roboto">
                    No locations available
                  </div>
                )}
              </div>
            }
            trigger="hover"
            placement="bottom"
          >
            <div className="relative flex-1 min-w-0">
              <span className="text-deep-gray font-normal text-level-7 xs:text-level-6 font-roboto block truncate max-w-[80px] sm:max-w-[120px] md:max-w-[150px] lg:max-w-[200px] xl:max-w-[280px] truncate-1565">
                {value}
              </span>

              {/* Original tooltip code*/}
              {/* 
              <div
                className="absolute z-10 px-3 py-2 mb-2 text-sm text-white transition-opacity duration-200 bg-gray-800 rounded shadow-lg opacity-0 pointer-events-none bottom-full group-hover:opacity-100 tooltip-1565 tooltip-500"
                style={{
                  maxWidth: "min(250px, 80vw)",
                  overflow: "hidden",
                }}
              >
                <span
                  className="inline-block tooltip-animated whitespace-nowrap"
                  style={{
                    minWidth: "100%",
                  }}
                >
                  {value}
                </span>
              </div>
              */}
            </div>
          </Popover>
        )}

        {recurring && (
          <IoRepeatOutline
            className={`text-primary md:w-6 md:h-6 ml-2 sm:w-5 sm:h-5 ${
              truncate ? "flex-shrink-0" : ""
            }`}
          />
        )}
      </div>
    </>
  );
};

export default InfoChip;


//! Do not delete the comment block below. It contains the original code for InfoChip component.
// import React from "react";
// import { IoRepeatOutline } from "react-icons/io5";

// const InfoChip = ({
//   icon: Icon,
//   label,
//   value,
//   recurring,
//   truncate = false,
// }) => {
//   return (
//     <>
//       {/* CSS animation styles - only added when truncate is true */}
//       {truncate && (
//         <style>{`
//           @keyframes scrollTooltip {
//             0%, 20% {
//               transform: translateX(0%);
//             }
//             80%, 100% {
//               transform: translateX(-50%);
//             }
//           }
//           .tooltip-animated {
//             animation: scrollTooltip 6s ease-in-out infinite;
//           }
//           @media (min-width: 1565px) {
//             .truncate-1565 {
//               overflow: visible !important;
//               text-overflow: unset !important;
//               white-space: normal !important;
//               max-width: none !important;
//             }
//             .tooltip-1565 {
//               display: none !important;
//             }
//           }
//           .tooltip-500 {
//             left: 0 !important;
//             right: auto !important;
//             max-width: 200px !important;
//           }
//           @media (min-width: 501px) {
//             .tooltip-500 {
//               right: 0 !important;
//               left: auto !important;
//               max-width: min(250px, 80vw) !important;
//             }
//           }
//         `}</style>
//       )}

//       <div
//         className={`flex items-center gap-1 h-7 sm:h-9 rounded-[4px] pt-1.5 pr-2 pb-1.5 pl-2 bg-[#FFF7ED] ${
//           truncate ? "relative group" : ""
//         }`}
//       >
//         {Icon && (
//           <Icon
//             className={`md:w-6 md:h-6 md:mb-1 text-light-gray ${
//               truncate ? "flex-shrink-0" : ""
//             }`}
//           />
//         )}
//         <span
//           className={`font-medium text-light-gray font-roboto text-level-7 xs:text-level-6 ${
//             truncate ? "flex-shrink-0" : ""
//           }`}
//         >{`${label}:`}</span>

//         {/* Render differently based on truncate prop */}
//         {value && !truncate && (
//           <span className="font-normal text-deep-gray text-level-7 xs:text-level-6 font-roboto">
//             {value}
//           </span>
//         )}

//         {value && truncate && (
//           <div className="relative flex-1 min-w-0">
//             <span className="text-deep-gray font-normal text-level-7 xs:text-level-6 font-roboto block truncate max-w-[80px] sm:max-w-[120px] md:max-w-[150px] lg:max-w-[200px] xl:max-w-[280px] truncate-1565">
//               {value}
//             </span>

//             <div
//               className="absolute z-10 px-3 py-2 mb-2 text-sm text-white transition-opacity duration-200 bg-gray-800 rounded shadow-lg opacity-0 pointer-events-none bottom-full group-hover:opacity-100 tooltip-1565 tooltip-500"
//               style={{
//                 maxWidth: "min(250px, 80vw)",
//                 overflow: "hidden",
//               }}
//             >
//               <span
//                 className="inline-block tooltip-animated whitespace-nowrap"
//                 style={{
//                   minWidth: "100%",
//                 }}
//               >
//                 {value}
//               </span>
//             </div>
//           </div>
//         )}

//         {recurring && (
//           <IoRepeatOutline
//             className={`text-primary md:w-6 md:h-6 ml-2 sm:w-5 sm:h-5 ${
//               truncate ? "flex-shrink-0" : ""
//             }`}
//           />
//         )}
//       </div>
//     </>
//   );
// };

// export default InfoChip;
