import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import CustomButton from "../Form/CustomButton";
import FeaturedIcon from "../../assets/icons/featured-ico.svg";
import { Rate } from "antd";
import Input from "../Form/Input";
import useForm from "../../hooks/useForm";
import { COMMON_FIELD_TYPES } from "../../constants/fieldTypes";

const ReviewOrderModel = ({ isOpen, onSubmit, onClose, setIsOpen, title }) => {
  // Disable scroll when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function to reset overflow on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const [rating, setRating] = useState(5);

  const {
    formData,
    errors,
    touched,
    handleInputChange,
    handleBlur,
    validateForm,
    setTouched,
    setFormData,
    clearError,
  } = useForm (
    {
      feedBack: "",
    },
    {
      feedBack: false,
    },
    {
      feedBack: COMMON_FIELD_TYPES.REQUIRED_FIELD,
    }
  );

  // if close then clear the form
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        feedBack: "",
      });
      setRating(5);
      setTouched({
        feedBack: false,
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center z-40 justify-center">
      <div className="bg-white rounded-[1.25rem] w-[90%] p-[1.5rem] md:w-full md:max-w-[44.5625rem] h-auto md:h-full md:max-h-[24.6875rem] relative z-50 animate-fade-in">
        <div className="absolute w-[1.5rem] h-[1.5rem] right-6 top-6 ">
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <img
          className="absolute top-6 left-6 right-0 md:w-[3rem] md:h-[3rem] w-[2.3rem] h-[2.3rem]"
          src={FeaturedIcon}
          alt="Featured Icon"
        />

        <div className=" flex flex-col gap-6 h-full">
          <div className=" flex flex-col gap-[0.75rem]">
            <div>
              <h2 className="text-center font-inter text-[1.5rem] mb-1 font-bold text-primary-text">
                {title}
              </h2>

              <p className="text-center text-[#535862] lg:max-w-[25rem] leading-[1.25rem] mx-auto font-inter text-[0.75rem]">
                Rate And Review Your Experience
              </p>
            </div>
            <div className=" flex md:flex-row flex-col gap-2 items-center justify-center md:gap-[1.5rem]">
              {/* Handle Rating Selection */}
              <Rate
                className="text-center text-[2.2rem]"
                value={rating}
                onChange={(value) => setRating(value)}
              />
              <span className=" text-[0.875rem] font-semibold leading-[1.25rem] text-[#0F161E] font-inter">
                {rating}/5 Rating
              </span>
            </div>
          </div>

          <Input
            type="textarea"
            label="Share Your Feedback"
            placeholder="You can write up to 500 characters"
            outerContainerStyle="flex-grow"
            // value={feedBack}
            // onChange={(e) => setFeedBack(e.target.value)}
            name="feedback"
            // isRequired={false}
            value={formData.feedBack}
            onChange={(e) => {
              console.log("Typing:", e.target.value); 
              handleInputChange("feedBack", e.target.value);
            }}
            onBlur={() => handleBlur("feedBack", formData.feedBack)}
            onFocus={() => clearError("feedBack")}
            error={touched.feedBack && errors.feedBack ? errors.feedBack : ""}
            inputStyle=" w-full h-[48px] max-h-[80px] px-4 flex item-center rounded-[4px] border border-light-blue text-content font-inter text-[12px] leading-[20px]"
          />

          <div className=" flex lg:justify-between items-center flex-wrap gap-3">
            <CustomButton
              buttonText="Later"
              onClick={onClose}
              type="button"
              className="bg-white text-primary-text text-[0.875rem] w-full rounded-[0.5rem] border-primary-text md:w-[214px] h-[2.3rem] md:h-[3.0625rem] flex items-center justify-center font-inter font-semibold"
            />
            <CustomButton
              buttonText="Submit"
              onClick={() => {
                setTouched({ feedBack: true });

                // Check if the feedback is provided; if empty, allow submission without validation
                if (formData.feedBack.trim() === "" || validateForm()) {
                  onSubmit({ rating, feedBack: formData.feedBack || "" })
                }
                setIsOpen(false);
              }}
              className="bg-primary text-tertiary text-[0.875rem] w-full md:w-[214px] rounded-[0.5rem] transition-colors h-[2.3rem] md:h-[3.0625rem] flex items-center justify-center font-inter font-semibold"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewOrderModel;
