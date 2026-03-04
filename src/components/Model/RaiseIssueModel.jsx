import React, { useEffect } from "react";
import { X } from "lucide-react";
import useForm from "../../hooks/useForm";
import CustomButton from "../Form/CustomButton";
import FeaturedIcon from "../../assets/icons/featured-ico.svg";
import Input from "../Form/Input";
import { COMMON_FIELD_TYPES } from "../../constants/fieldTypes";
import { createRaiseIssue } from "../../store";
import { useThunk } from "../../hooks/useThunk";
import showToast from "../../utils/toastNotifications";

const RaiseIssueModel = ({ isOpen, setIsOpen, order, fetchOrder }) => {
  // NOTE: useForm is a custom hook that handles form state and validation
  const {
    formData,
    errors,
    touched,
    handleInputChange,
    handleBlur,
    clearError,
    validateForm,
    setTouched,
    setFormData,
  } = useForm(
    {
      issueText: "",
    },
    {
      issueText: true,
    },
    {
      issueText: COMMON_FIELD_TYPES.REQUIRED_FIELD,
    }
  );

  //Thunk
  const [doRaiseIssue, isRaiseIssue, raiseIssueError] =
    useThunk(createRaiseIssue);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      issueText: true,
    });

    if (!validateForm()) {
      console.log("Validation Failed");
      return;
    } else {
      // console.log("Success");
    }

    const result = await doRaiseIssue({
      orderId: order?._id,
      complaintReason: formData?.issueText,
    });

    if (result?.success) {
      showToast("success", languageTranslatorUtil(language,"toastMessages","staticSuccessMsgs","issueRaisedSuccess"));
      setFormData({
        issueText: "",
      });
      setIsOpen(false);
      fetchOrder();
    } else {
      showToast("error", result?.error?.message);
      setFormData({
        issueText: "",
      });
      setIsOpen(false);
    }

    setIsOpen(false);
  };

  const handleClose = () => {
    setFormData({
      issueText: "",
    });
    setTouched({
      issueText: false,
    });
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-[1.25rem] w-[90%] p-[1.5rem] md:w-full md:max-w-[681px] h-auto md:h-full md:max-h-[439px] relative z-50 animate-fade-in">
        <div className="absolute w-[1.5rem] h-[1.5rem] right-6 top-6 ">
          <button
            onClick={handleClose}
            className="text-[#717680] hover:text-gray-700 transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <img
          className="absolute top-6 left-6 right-0 md:w-[3rem] md:h-[3rem] w-[2.3rem] h-[2.3rem]"
          src={FeaturedIcon}
          alt="Featured Icon"
        />

        <div className="flex flex-col h-full gap-6 ">
          <div className=" flex flex-col gap-[0.75rem]">
            <div>
              <h2 className="text-center font-inter text-[1.5rem] mb-1 font-bold text-primary-text">
                Raise Issue
              </h2>

              <p className="text-center text-[#535862] lg:max-w-[25rem] leading-[1.25rem] mx-auto font-inter text-[0.75rem]">
                Share your issue
              </p>
            </div>
          </div>

          <Input
            type="textarea"
            label="Share Your Issue"
            placeholder="You can write up to 500 characters"
            outerContainerStyle="flex-grow"
            value={formData.issueText}
            onChange={(e) => handleInputChange("issueText", e.target.value)}
            error={touched.issueText && errors.issueText}
            name="issueText"
            isRequired={false}
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
            inputStyle="w-full px-4 min-h-[156px] max-h-[156px] flex item-start text-start rounded-[4px] border border-light-blue text-content font-inter text-[12px] leading-[20px]"
          />

          <div className="flex flex-wrap items-center gap-3 lg:justify-between">
            <CustomButton
              buttonText="Cancel"
              type='button'
              onClick={handleClose}
              className="bg-white text-primary-text text-[0.875rem] w-full rounded-[0.5rem] border-primary-text md:w-[214px] h-[2.3rem] md:h-[3.0625rem] flex items-center justify-center font-inter font-semibold"
            />
            <CustomButton
              buttonText="Submit"
              onClick={handleSubmit}
              loading={isRaiseIssue}
              disabled={isRaiseIssue}
              className="bg-primary text-tertiary text-[0.875rem] w-full md:w-[214px] rounded-[0.5rem] transition-colors h-[2.3rem] md:h-[3.0625rem] flex items-center justify-center font-inter font-semibold"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaiseIssueModel;
