import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import LazyLoad from 'react-lazyload';
import PhotoCarousel from "./PhotoCarousel";
import { useSelector } from "react-redux";
import { roles } from "../../constants/commonConstants";

// Import placeholder image
const placeholderImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f0f0f0'/%3E%3Cpath d='M100 50 L150 150 L50 150 Z' fill='%23cccccc'/%3E%3Ccircle cx='140' cy='60' r='10' fill='%23cccccc'/%3E%3C/svg%3E";

const EnhancedPhotoCarousel = ({ images = [], ...props }) => {
  const { role } = useSelector((state) => state.auth);

  const [validatedImages, setValidatedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const validateImages = async () => {
      setIsLoading(true);

      if (!images || images.length === 0) {
        // If no images, use the placeholder
        setValidatedImages([placeholderImage]);
        setIsLoading(false);
        return;
      }

      const validationPromises = images.map(async (imageUrl) => {
        // Skip empty or null URLs
        if (!imageUrl) return placeholderImage;

        try {
          // Create a promise to check if image loads
          const checkImage = new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(imageUrl);
            img.onerror = () => reject(new Error("Image failed to load"));
            img.src = imageUrl;
          });

          // Race between image loading and a timeout
          return await Promise.race([
            checkImage,
            new Promise((resolve) =>
              setTimeout(() => resolve(placeholderImage), 2000)
            ),
          ]);
        } catch (error) {
          return placeholderImage;
        }
      });

      // Wait for all validation promises to resolve
      const results = await Promise.all(validationPromises);

      // Filter out duplicate placeholders if needed (optional)
      setValidatedImages(results.length > 0 ? results : [placeholderImage]);
      setIsLoading(false);
    };

    validateImages();
  }, [images]);

  if (isLoading) {
    return (
      <div className="w-full h-[300px] flex justify-center items-center bg-gray-100 rounded-md">
        <ClipLoader
          color={role === roles.USER ? "#00796B" : "#0F161E"}
          size={40}
        />
      </div>
    );
  }

  if (validatedImages.length === 0) {
    return (
      <div className="w-full h-[300px] flex justify-center items-center bg-gray-100 rounded-md">
        <LazyLoad height={200} offset={100} once>
          <div className={`flex w-full h-[100%] ${hasLoaded ? "" : "bg-slate-300 animate-pulse"}`}>
            <img
              src={placeholderImage}
              alt="No images available"
              className="max-h-full object-contain"
              onLoad={() => setHasLoaded(true)}
            />
          </div>
        </LazyLoad>
      </div>
    );
  }

  // Pass all props to the original PhotoCarousel
  return <PhotoCarousel images={validatedImages} {...props} />;
};

export default EnhancedPhotoCarousel;
