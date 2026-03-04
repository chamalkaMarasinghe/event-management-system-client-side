import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import CustomButton from "./CustomButton";
import FeaturedIcon from "../../assets/icons/featured-ico.svg";
import { Rate } from "antd";
import Input from "./Input";
import useForm from "../../hooks/useForm";
import { COMMON_FIELD_TYPES } from "../../constants/fieldTypes";

const AddOrderReviewModal = ({ isOpen, onSubmit, onClose, setIsOpen, title }) => {
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
            <div className="bg-white shadow-[0px_4px_10px_2px_#D3DCDB80] rounded-[1.25rem] w-[90%] p-[1.5rem] md:w-full md:max-w-[44.5625rem] h-auto md:h-full md:max-h-[24.6875rem] relative z-50 animate-fade-in">
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
                        <div className="mb-6">
                            <h2 className="font-roboto font-bold text-[24px] text-user-orange leading-[100%] tracking-[0.001em] text-center align-middle mb-1">
                                {title}
                            </h2>

                            <p className="font-roboto font-normal text-[12px] text-light-gray leading-[20px] tracking-[0em] text-center lg:max-w-[25rem] mx-auto">
                                Rate and Review Your Experience
                            </p>
                        </div>
                        <div className=" flex md:flex-row flex-col gap-2 items-center justify-center md:gap-[1.5rem]">
                            {/* Handle Rating Selection */}
                            <Rate
                                className="text-center text-[2.2rem]"
                                value={rating}
                                onChange={(value) => setRating(value)}
                            />
                            <span className="font-roboto font-semibold text-dark-gray text-[14px] tracking-[0em] text-center">
                                {rating}/5 Rating
                            </span>
                        </div>
                    </div>

                    <div className="relative flex-grow">
                        {/* Wrapper div to position the label on the border */}
                        <div className="absolute -top-3 left-3 px-1 bg-white z-10">
                            <span className="font-roboto font-medium text-[14px] leading-[22px] tracking-[-0.006em] text-user-black">
                                Write Your Review
                            </span>
                        </div>
                        <Input
                            placeholder="Share your experience with this service..."
                            outerContainerStyle="flex-grow"
                            name="feedback"
                            value={formData.feedBack}
                            onChange={(e) => {
                                handleInputChange("feedBack", e.target.value);
                            }}
                            onBlur={() => handleBlur("feedBack", formData.feedBack)}
                            onFocus={() => clearError("feedBack")}
                            error={touched.feedBack && errors.feedBack ? errors.feedBack : ""}
                            inputStyle="w-full h-[52px] max-h-[80px] px-4 flex item-center rounded-[6px] border border-[#CBD5E0] font-roboto font-normal text-[12px] leading-[22px] tracking-[0em] align-middle text-dark-gray/50"
                        />
                    </div>

                    <div className="flex lg:justify-between items-center flex-wrap gap-3">
                        <CustomButton
                            buttonText="Cancel"
                            textColor="text-dark-orange"
                            bgColor="bg-white"
                            borderColor="border-dark-orange"
                            onClick={onClose}
                            textWeight="font-semibold"
                            type="button"
                            className="hover:bg-orange-50 text-[0.875rem] w-full rounded-[5px] md:w-[325px] h-[2.3rem] md:h-[3.0625rem] flex items-center justify-center font-roboto"
                            hoverTextColor = "hover:text-primary"
                            hoverBorderColor = "hover:border-dark-orange"
                        />
                        <CustomButton
                            buttonText="Submit"
                            textColor="text-white"
                            bgColor="bg-dark-orange"
                            borderColor="border-dark-orange"
                            onClick={() => {
                                setTouched({ feedBack: true });

                                // Check if the feedback is provided; if empty, allow submission without validation
                                if (formData.feedBack.trim() === "" || validateForm()) {
                                    onSubmit({ rating, feedBack: formData.feedBack || "" })
                                }
                                setIsOpen(false);
                            }}
                            textWeight="font-semibold"
                            className="hover:bg-orange-600 text-[0.875rem] w-full rounded-[5px] md:w-[325px] h-[2.3rem] md:h-[3.0625rem] flex items-center justify-center font-roboto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddOrderReviewModal;
