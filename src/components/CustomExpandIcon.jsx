const CustomExpandIcon = ({ expanded, onExpand, record }) => {
  return (
    <button
      onClick={(e) => {
        onExpand(record, e);
        e.stopPropagation();
      }}
      className="relative flex items-center justify-center w-6 h-6 transition-colors duration-200"
    >
      <div className="w-5 h-5 border border-primary rounded-sm flex items-center justify-center">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          className="text-primary"
        >
          {expanded ? (
            // Minus icon
            <line
              x1="2"
              y1="7"
              x2="12"
              y2="7"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          ) : (
            // Plus icon
            <>
              <line
                x1="2"
                y1="7"
                x2="12"
                y2="7"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="7"
                y1="2"
                x2="7"
                y2="12"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </>
          )}
        </svg>
      </div>
    </button>
  );
};

export default CustomExpandIcon;

// Custom expand icon component
//  const CustomExpandIcon = ({ expanded, onExpand, record }) => (
//   <button
//     onClick={(e) => {
//       onExpand(record, e);
//       e.stopPropagation();
//     }}
//     className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-100 transition-colors duration-200"
//   >
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       className={`transform transition-transform duration-200 ${
//         expanded ? 'rotate-180' : 'rotate-0'
//       }`}
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d={expanded ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}
//       />
//     </svg>
//   </button>
// );
