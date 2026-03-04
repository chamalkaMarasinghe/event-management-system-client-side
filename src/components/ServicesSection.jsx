import React from "react";
import { Link } from "react-router-dom";
import FeatureCard from "./FeatureCard";

const ServicesSection = ({
  title = "Discover Reliable Services, Anytime, Anywhere",
  description = "Find trusted professionals, explore a wide range of services, and enjoy safe, secure payments—all with verified ratings and reviews to help you choose the best.",
  buttonText = "Find a Job",
  features,
  featureCardImg,
  navigationLink,
}) => {
  return (
    <div className=" flex items-center  pb-[40px]  xl:flex-row flex-col justify-between xl:max-h-[682px] xl:h-[682p lg:py-[88px] px-[20px] md:px-[40px] lg:px-[100px]">
      <div className="flex flex-col gap-6  lg:gap-10 w-full xl:max-w-[509px] py-6 lg:py-0">
        <h1 className="font-nonito_sans  font-bold text-3xl sm:text-4xl lg:text-[42px] leading-[35px] lg:leading-[56px] tracking-[0.042em] text-primary-text">
          {title}
        </h1>

        <p className="font-inter font-normal text-base leading-6 tracking-[0.5px] text-content">
          {description}
        </p>

        <div className="flex">
          <Link
            to={navigationLink}
            className="flex items-center justify-center px-6 py-3 md:w-[214px] bg-primary text-tertiary font-inter font-semibold text-base rounded-xl border border-white hover:bg-primary/90 transition-colors"
          >
            {buttonText}
          </Link>
        </div>
      </div>

      {/* Feature Cards * */}
      <div className="mt-10 xl:mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-12 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              featureCardImg={featureCardImg}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
