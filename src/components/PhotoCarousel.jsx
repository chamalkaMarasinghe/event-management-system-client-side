import React, { useState } from "react";
import LazyLoad from 'react-lazyload';
import { ChevronLeft, ChevronRight } from "lucide-react";

const aspectRatioClasses = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  auto: "aspect-auto",
};

const PhotoCarousel = ({
  images,
  className = "",
  mainImageClassName = "",
  thumbnailClassName = "",
  showThumbnails = true,
  showNavigation = true,
  initialIndex = 0,
  onImageChange,
  aspectRatio = "auto",
  thumbnailsPosition = "bottom",
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isHovered, setIsHovered] = useState(false);
  const [hasLoadedHero, setHasLoadedHero] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(images?.map(it => false));

  const handleImageChange = (index) => {
    setCurrentIndex(index);
    if (onImageChange) {
      onImageChange(images[index], index);
    }
  };

  const navigateImage = (direction) => {
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % images.length
        : (currentIndex - 1 + images.length) % images.length;
    handleImageChange(newIndex);
  };

  const ThumbnailStrip = () => (
    <div className="flex flex-wrap gap-1 sm:gap-2 justify-center items-center">
      {images.map((image, index) => (
        <button
          key={index}
          onClick={() => handleImageChange(index)}
          className={`focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-[4px] ${thumbnailClassName}`}
        >
          <LazyLoad height={200} offset={100} once>
            <div className={`flex w-full h-[100%] ${hasLoaded[index] ? "" : "bg-slate-300 animate-pulse"}`}>
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`w-[80px] h-[60px] sm:w-[100px] sm:h-[80px] md:max-w-[122px] md:max-h-[101px] 
                  object-cover rounded-[4px] transition-opacity duration-200 ${
                    currentIndex === index ? "opacity-100" : "opacity-50 hover:opacity-75"
                  }`}
                onLoad={() => setHasLoaded((prev) => {
                  let newArr = prev;
                  newArr[index] = true;
                  return newArr;
                })}
              />
            </div>
          </LazyLoad>
        </button>
      ))}
    </div>
  );

  const NavigationButtons = () => (
    <>
      {showNavigation && (isHovered || images.length > 1) && (
        <>
          <button
            onClick={() => navigateImage("prev")}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => navigateImage("next")}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
    </>
  );

  return (
    <div className={`flex flex-col space-y-2 sm:space-y-4 md:space-y-[16px] ${className}`}>
      {thumbnailsPosition === "top" && showThumbnails && <ThumbnailStrip />}
      
      <div 
        className="relative w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <LazyLoad height={200} offset={100} once>
          <div className={`flex w-full h-[100%] ${hasLoadedHero ? "" : "bg-slate-300 animate-pulse"}`}>
            <img
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              className={`w-full h-[200px] sm:h-[300px] md:h-full md:max-h-[516px] object-cover rounded-[4px] 
                ${aspectRatioClasses[aspectRatio]} ${mainImageClassName}`}
              onLoad={() => setHasLoadedHero(true)}
            />
          </div>
        </LazyLoad>
        <NavigationButtons />
      </div>

      {thumbnailsPosition === "bottom" && showThumbnails && <ThumbnailStrip />}
    </div>
  );
};

export default PhotoCarousel;
