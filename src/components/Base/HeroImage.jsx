import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import NoPreviewImage from "../../assets/custom-no-preview.png";

const HeroImage = ({ imageUrl, alt = "Event Flyer", loading = false }) => {
  const [isImageValid, setIsImageValid] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [imageFullyLoaded, setImageFullyLoaded] = useState(false);

  const handleImageError = () => {
    setIsImageValid(false);
  };

  if (loading) {
    return (
      <div className="w-full p-5 md:p-0 overflow-hidden">
        <div className="w-full h-[300px] lg:h-[630px] xl:h-[630px] md:rounded-2xl rounded-2xl bg-slate-300 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-5 md:p-0 overflow-hidden">
      <div
        className={twMerge(
          "relative w-full rounded-2xl",
          imageFullyLoaded ? "bg-transparent" : "bg-slate-300 animate-pulse"
        )}
      >
        {!imageUrl ||
        imageUrl?.trim()?.toString()?.length <= 5 ||
        !isImageValid ? (
          <div className="w-full h-[300px] lg:h-[630px] xl:h-[630px] md:rounded-2xl rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden">
            <img
              src={NoPreviewImage}
              alt={alt}
              className="w-full h-full object-cover md:rounded-2xl rounded-2xl"
              onLoad={() => {
                setHasLoaded(true);
                setImageFullyLoaded(true);
              }}
            />
          </div>
        ) : (
          <div className="w-full h-[300px] lg:h-[630px] xl:h-[630px] md:rounded-2xl rounded-2xl overflow-hidden">
            <LazyLoadImage
              src={imageUrl}
              placeholderSrc={NoPreviewImage}
              alt={alt}
              className="w-full h-full object-cover"
              effect="blur"
              onError={handleImageError}
              onLoad={() => {
                setHasLoaded(true);
                setImageFullyLoaded(true);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroImage;
