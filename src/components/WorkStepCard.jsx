import React from "react";

const WorkStepCard = ({ stepNumber, title, description }) => {
  return (
    <div className="bg-light rounded-[20px] border-b-[1px]  min-h-[92px] py-4 lg:py-0 lg:h-[92px] flex items-center px-4 sm:px-6 lg:pl-10">
      <div className="flex items-start gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-white font-inter text-sm font-medium">
                {stepNumber}
              </span>
            </div>
            <h3 className="font-inter text-base sm:text-lg font-medium mb-0 text-dark">
              {title}
            </h3>
          </div>
          <p className="font-inter text-xs sm:text-sm text-content leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

WorkStepCard.defaultProps = {
  stepNumber: 1,
  title: "Browse Services",
  description:
    "Explore a wide range of categories to find exactly what you need.",
};

export default WorkStepCard;
