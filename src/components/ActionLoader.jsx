import React from "react";
import Loader from "./Loader";

const ActionLoader = ({ message = "Deleting item...", loaderColor }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white px-4 py-6 rounded-lg shadow-lg">
        <Loader color={loaderColor}/>
        <div className="text-center md:text-left max-w-[220px] font-inter break-words">
          <p className="text-center mt-3 font-inter">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ActionLoader;
