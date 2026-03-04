import React, { useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import WorkStepCard from "./WorkStepCard";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { twMerge } from "tailwind-merge";

const HowItWorksSection = ({ workSteps, rightImage, rightImage_LQ }) => {

  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-full bg-white  py-8 sm:py-12 lg:py-[88px] px-[20px] md:px-[40px] lg:px-[100px] ">
      <div className="w-full">
        {/* Heading */}
        <h1 className="font-nonito_sans text-primary text-3xl sm:text-4xl lg:text-[42px] leading-tight lg:leading-[56px] font-bold lg:mb-0 mb-6 sm:mb-8">
          How It Works ?
        </h1>

        {/* Main Content Container */}
        <div className="relative flex flex-col items-center lg:flex-row min-h-[506px]">
          {/* Left Side - Steps */}
          <div className="relative lg:absolute z-30 w-full lg:w-[640px] flex flex-col gap-4 mb-6 lg:mb-0">
            {workSteps.map((step, index) => (
              <WorkStepCard
                key={index}
                stepNumber={step.stepNumber}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>

          {/* Right Side - Image */}
          <div className="relative lg:absolute right-0 w-full lg:w-[791px] h-[300px] sm:h-[400px] lg:h-[506px]">
            <div className={twMerge("flex w-full h-[100%] rounded-[20px]", loaded ? "bg-transparent" : "bg-gray-300 animate-pulse")}>              
              <LazyLoadImage
                src={rightImage}
                placeholderSrc={rightImage_LQ}
                alt="Service illustration"
                className="w-full h-full object-cover rounded-[20px]"
                effect="blur"
                onLoad={() => {
                  setLoaded(true);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
