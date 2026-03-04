import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { twMerge } from "tailwind-merge";
import editIcon from "../../../assets/icons/img-upload-ico.svg";
import { ClipLoader } from "react-spinners";
import { IoClose } from "react-icons/io5";
import ProfileImage from "../../ProfileImage";

const ProfileImageUploader = ({
  selectedImage,
    firstName,
    lastName,
  defaultImage,
  isRequired = false,
  label = "",
  labelStyle,
  isDisabled = false,
  outerContainerStyle = "",
  loading = false,
  error,
  onImageUpload,
  avatarContainerStyle = "",
  imageStyle = "",
}) => {
  const [image, setImage] = useState(selectedImage || defaultImage);
  const [hasImageError, setHasImageError] = useState(false);

  // Update image state when selectedImage changes
  useEffect(() => {
    if (selectedImage) {
      // Reset image error state
      setHasImageError(false);

      // If it's a File object
      if (
        selectedImage instanceof File ||
        (typeof selectedImage === "object" &&
          selectedImage.name &&
          selectedImage.type.startsWith("image/"))
      ) {
        try {
          // Create a URL from the file
          const fileUrl = URL.createObjectURL(selectedImage);
          setImage(fileUrl);

          // Optional: Revoke the URL when component unmounts to prevent memory leaks
          return () => URL.revokeObjectURL(fileUrl);
        } catch (err) {
          console.error("Error creating object URL:", err);
          setHasImageError(true);
          setImage(defaultImage);
        }
      } else {
        // If it's already a URL or base64 string
        setImage(selectedImage);
      }
    } else {
      setImage(defaultImage);
    }
  }, [selectedImage, defaultImage]);

  // Handle image file changes
  const handleImageChange = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setHasImageError(false);
        onImageUpload(file);
      };
      reader.onerror = () => {
        console.error("Error reading file");
        setHasImageError(true);
        setImage(defaultImage);
        onImageUpload(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop: handleImageChange,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    disabled: isDisabled || loading,
    maxFiles: 1,
  });

  // Handle file rejection errors
  useEffect(() => {
    if (fileRejections.length > 0) {
      const rejection = fileRejections[0];
      const errorMessage = rejection.errors[0]?.message || "Invalid file type";
      console.error(errorMessage);
      setHasImageError(true);
    }
  }, [fileRejections]);

  // Handle image loading error
  const handleImageError = () => {
    console.error("Error loading image");
    setHasImageError(true);
    setImage(defaultImage);
  };

  // Determine which image to display
  const displayImage = loading
    ? defaultImage
    : hasImageError || error
    ? defaultImage
    : image;

  const errorMessage = error || (hasImageError ? "Unable to load image" : "");

  return (
    <div className={twMerge("flex flex-col gap-4", outerContainerStyle)}>
      {label && (
        <label
          className={twMerge(
            "text-light-gray font-inter font-medium text-sm",
            labelStyle
          )}
        >
          {label} {isRequired && <span className="text-light-red">*</span>}
        </label>
      )}
      <div className={twMerge("relative w-[119px]", avatarContainerStyle)}>
        {errorMessage && (
          <div className="absolute -top-1 left-0 right-0 z-30 flex justify-center">
            <div className="bg-red-500 text-white text-xs py-1 px-2 rounded-full shadow-md max-w-[110px] truncate">
              {errorMessage}
            </div>
          </div>
        )}

        {/* if user already has an image, show a remove button to remove the image if user needs */}
        {selectedImage && !loading && !isDisabled && !hasImageError && (
          <div
            className="absolute top-2 right-1 p-1 z-20 bg-black rounded-full cursor-pointer"
            onClick={() => {
              setImage(defaultImage);
              setHasImageError(false);
              onImageUpload(null);
            }}
          >
            <IoClose className="text-white" />
          </div>
        )}
        <div
            {...getRootProps()}
            className={twMerge(
                "cursor-pointer relative group",
                isDisabled || loading ? "" : "" // No opacity change
            )}
        >
          <input
            {...getInputProps()}
            className="hidden"
            id="profile-image-input"
            disabled={isDisabled || loading}
          />
          <div className={twMerge(
              "relative group w-[119px] h-[115px] object-cover rounded-full",
              imageStyle
          )}>
            {/*<img*/}
            {/*  src={displayImage}*/}
            {/*  alt="Profile"*/}
            {/*  className={twMerge(*/}
            {/*    "w-[119px] h-[115px] object-cover rounded-full",*/}
            {/*    imageStyle*/}
            {/*  )}*/}
            {/*  onError={handleImageError}*/}
            {/*/>*/}
            {loading ? (
                <div className="absolute w-[11px] h-[11px] bg-transparent rounded-full flex items-center justify-center top-2 left-0">
                  {!loading && <span className="bg-transparent w-[7px] h-[7px] rounded-full"></span>}
                </div>
            ) : null}
            <ProfileImage
                profilePicture={displayImage}
                firstName={firstName || ""}
                lastName={lastName || ""}
                loading={loading}
                backgroundColor={"#F65F18"}
                fontSize={50}
            />
            {/*{loading && (*/}
            {/*  <div className="absolute inset-0 bg-light-gray rounded-full bg-opacity-40 opacity-100 flex items-center justify-center">*/}
            {/*    <ClipLoader*/}
            {/*      loading={loading}*/}
            {/*      speedMultiplier={1}*/}
            {/*      size={24}*/}
            {/*      color="var(--primary-color)"*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*)}*/}
            {!loading && !isDisabled && (
              <div className="absolute bottom-0 right-0 flex items-center justify-center">
                <img src={editIcon} alt="Edit" className="w-[50px] h-[50px]" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUploader;
