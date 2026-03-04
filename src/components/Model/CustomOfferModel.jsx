import React, { useEffect, useState } from "react";
import Input from "../Form/Input";
import CustomButton from "../Form/CustomButton";
import CustomeDatePicker from "../Form/CustomDatePicker";
import useForm from "../../hooks/useForm";
import dayjs from "dayjs";
import { X } from "lucide-react";
import { COMMON_FIELD_TYPES } from "../../constants/fieldTypes";
import CustomTimePicker from "../Form/CustomTimePicker";
import Dropdown from "../Form/Dropdown";
import { paymentMetrics } from "../../constants/commonConstants";
import { useThunk } from "../../hooks/useThunk";
import { getTaskerProfile } from "../../store/thunks/userThunks";
import showToast from "../../utils/toastNotifications";
import { currencyFormatter } from "../../utils/formatting";
import convertTo24HourFormat from "../../utils/convertTo24HourFormat";

const CustomOfferModel = ({ isOpen, onClose, onSubmit }) => {
  // STATE : user categories
  const [userCategories, setUserCategories] = useState([]);

  // STATE: selected category
  const [selectedCategory, setSelectedCategory] = useState(null);

  // STATE: formdata definations
  const {
    formData,
    errors,
    touched,
    handleInputChange,
    handleBlur,
    clearError,
    validateForm,
    setTouched,
    setErrors,
    setFormData,
  } = useForm(
    {
      taskName: "",
      taskDescription: "",
      amount: "",
      offerDate: "",
      taskTime: "",
      category: "",
    },
    {
      taskName: true,
      taskDescription: true,
      amount: true,
      offerDate: true,
      taskTime: true,
      category: true,
    },
    {
      taskName: COMMON_FIELD_TYPES.REQUIRED_FIELD,
      taskDescription: COMMON_FIELD_TYPES.REQUIRED_FIELD,
      amount: COMMON_FIELD_TYPES.NUMBER_FIELD,
      offerDate: COMMON_FIELD_TYPES.DATE_PICKER,
      taskTime: COMMON_FIELD_TYPES.TIME_PICKER,
      category: {
        type: COMMON_FIELD_TYPES.DROPDOWN,
        displayKey: "name",
      },
    }
  );

  // NOTE: thunks definations ==============================================================================
  const [doGetTaskerProfile, isGetTaskerProfile, errorGetTaskerProfile] =
    useThunk(getTaskerProfile);

  // NOTE: side effects ====================================================================================
  useEffect(() => {
    if (isOpen) {
      // NOTE: Disable scroll on the background content when modal is open
      document.body.style.overflow = "hidden";
      fetchTaskerProfile();
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (userCategories?.length <= 1) {
      setFormData({
        ...formData,
        category: userCategories[0]?.name || formData?.category,
      });
    }
  }, [userCategories]);

  // NOTE: action performing function =====================================================================

  // FUNCTION: reet the errors and input data on the form
  const resetForm = () => {
    setTouched({
      taskName: false,
      taskDescription: false,
      amount: false,
      offerDate: false,
      taskTime: false,
      category: false,
    });

    setFormData({
      taskName: "",
      taskDescription: "",
      amount: "",
      offerDate: "",
      taskTime: "",
      category: "",
    });

    setErrors({
      taskName: "",
      taskDescription: "",
      amount: "",
      offerDate: "",
      taskTime: "",
      category: "",
    });

    setSelectedCategory(null);
  };

  const handleTimeChange = (selectedTime) => {
    // Convert time to 24-hour format if it contains AM/PM
    const formattedTime = convertTo24HourFormat(selectedTime);

    setFormData((prev) => ({
      ...prev,
      taskTime: formattedTime,
    }));

    clearError("taskTime");
  };

  // FUNCTION: close method of popup
  const onModalClose = () => {
    resetForm();
    onClose();
  };

  // FUNCTION: handle the category change of the category dropdowmn
  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    handleInputChange("category", selectedOption);
  };

  // FUNCTION: submit the offer
  const handlePublishOffer = (e) => {
    e.preventDefault();

    setTouched({
      taskName: true,
      taskDescription: true,
      amount: true,
      offerDate: true,
      taskTime: true,
      category: true,
    });

    // Note: Validate amount field
    if (parseInt(formData.amount) <= paymentMetrics.minimumAmount) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        amount: `Amount must be greater than ${currencyFormatter.format(
          paymentMetrics.minimumAmount
        )}`,
      }));
      return;
    }

    // NOTE: Check if date is today and time is in the past
    const now = dayjs();
    const selectedDate = dayjs(formData.offerDate);
    const selectedTime = formData.taskTime;

    // Validate that the time is not empty
    if (!selectedTime) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        taskTime: "Please select a time",
      }));
      return;
    }

    if (selectedDate.isSame(now, "day")) {
      // Make sure time is in 24-hour format for validation
      const timeIn24Format = convertTo24HourFormat(selectedTime);

      // Parse the hours and minutes from the time
      const [hours, minutes] = timeIn24Format.split(":").map(Number);
      const selectedDateTime = selectedDate.hour(hours).minute(minutes);

      if (selectedDateTime.isBefore(now)) {
        showToast("error", languageTranslatorUtil(language,"toastMessages","staticErrors","invalidTimeSelected"));
        return;
      }
    }

    if (!validateForm()) {
      showToast("error", languageTranslatorUtil(language,"toastMessages","staticErrors","errorOccurred"));
      return;
    }

    // NOTE: calling the prop function in order to create an offer
    onSubmit({
      isOffer: true,
      offerObj: {
        title: formData?.taskName,
        description: formData?.taskDescription,
        amount: formData?.amount,
        category: formData?.category,
        time: formData?.taskTime,
        date: formData?.offerDate,
      },
    });

    onModalClose();
  };

  // FUNCTION: fetch tasker details - caegory set
  const fetchTaskerProfile = async () => {
    const res = await doGetTaskerProfile();
    if (res?.success) {
      setUserCategories(
        res?.response?.data?.professionalDetails?.primary?.map((it, index) => {
          return { _id: index, name: it?.categoryName };
        }) || []
      );
    } else {
      showToast("error", res?.error?.message || languageTranslatorUtil(language,"toastMessages","staticErrors","errorOccurred"));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto bg-black bg-opacity-50 md:items-center">
      <div className="my-4 md:my-0 w-[90%] md:w-[681px] p-6 rounded-[20px] bg-white flex flex-col justify-between min-h-fit md:h-[629px]">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="font-nonito_sans font-semibold text-[20px] text-dark leading-[27.28px] tracking-[0.1%]">
              Create a Custom Offer
            </h1>
            <div className="w-[1.5rem] h-[1.5rem]">
              <button
                onClick={onModalClose}
                className="text-gray-500 transition-colors cursor-pointer hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Input
              label="Enter Task Name"
              placeholder="Enter Task Name"
              outerContainerStyle="flex-grow"
              value={formData.taskName}
              onChange={(e) => handleInputChange("taskName", e.target.value)}
              onBlur={(e) => handleBlur("taskName", e.target.value)}
              error={touched.taskName && errors.taskName}
              name="taskName"
              isRequired={true}
              inputStyle="w-full h-[48px] px-4 flex item-center rounded-[4px] text-content font-inter text-sm"
            />
            <Input
              label="Enter Description"
              placeholder="Enter Task Description"
              outerContainerStyle="flex-grow"
              value={formData.taskDescription}
              onChange={(e) =>
                handleInputChange("taskDescription", e.target.value)
              }
              onBlur={(e) => handleBlur("taskDescription", e.target.value)}
              error={touched.taskDescription && errors.taskDescription}
              name="taskDescription"
              isRequired={true}
              inputStyle="w-full h-[48px] px-4 flex item-center rounded-[4px] text-content font-inter text-sm"
            />

            {
              // Show Drop down category more than 1
              userCategories.length > 1 && (
                <Dropdown
                  options={userCategories}
                  defaultOption={selectedCategory}
                  placeholder="Enter a Category"
                  outerContainerStyle="w-full"
                  isSearchable={true}
                  isRequired={true}
                  label={"Category"}
                  displayKey="name"
                  idKey="_id"
                  labelStyle={"text-light-gray font-inter font-medium text-sm"}
                  onSelect={(selectedOption) => {
                    handleCategoryChange(selectedOption);
                  }}
                  onFocus={() => clearError("category")} // Clear error when user interacts again
                  onBlur={handleBlur}
                  error={touched.category && errors.category}
                  allowFillColor={false}
                  buttonClassName="w-full h-[48px] px-4 flex item-center rounded-[4px] text-content font-inter text-sm"
                />
              )
            }

            <Input
              label="Enter Amount"
              placeholder="Enter Amount"
              outerContainerStyle="flex-grow"
              value={formData.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
              onBlur={(e) => handleBlur("amount", e.target.value)}
              error={touched.amount && errors.amount}
              name="amount"
              isRequired={true}
              inputStyle="w-full h-[48px] px-4 flex item-center rounded-[4px] text-content font-inter text-sm"
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <CustomeDatePicker
                id="date-picker"
                label="Offer Date"
                value={formData.offerDate ? dayjs(formData.offerDate) : null}
                onChange={(date) => {
                  if (date) {
                    const formattedDate = date.format("YYYY-MM-DD");
                    setFormData((prev) => ({
                      ...prev,
                      offerDate: formattedDate, // Store as formatted string instead of dayjs object
                    }));
                    clearError("offerDate");
                  }
                }}
                onFocus={() => clearError("offerDate")}
                onBlur={() => handleBlur("offerDate", formData.offerDate)}
                error={touched.offerDate && errors.offerDate}
                placeholder="Select Offer Date"
                isRequired={true}
                outerContainerStyle="w-full"
                borderRadius="4px"
              />
              <CustomTimePicker
                id="time-picker"
                label="Offer Time"
                selectedTime={formData.taskTime || ""}
                onChange={(selectTime) => handleTimeChange(selectTime)}
                onFocus={() => clearError("taskTime")}
                onBlur={() => handleBlur("taskTime", formData.taskTime)}
                error={touched.taskTime && errors.taskTime}
                placeholder="Time"
                isRequired={true}
                outerContainerStyle="w-full"
                allowFillColor={false}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:justify-between lg:mt-6">
          <CustomButton
            buttonText="Back"
            onClick={onModalClose}
            className="bg-white text-[#0F161E] text-[0.875rem] w-full rounded-[0.5rem] border-dark md:w-[214px] h-[2.5rem] md:h-[3.0625rem] flex items-center justify-center font-inter font-semibold"
          />
          <CustomButton
            buttonText="Send Offer"
            onClick={handlePublishOffer}
            className="bg-[#0F161E] text-white text-[0.875rem] w-full md:w-[214px] rounded-[0.5rem] transition-colors h-[2.5rem] md:h-[3.0625rem] flex items-center justify-center font-inter font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomOfferModel;
// Compare this snippet from src/pages/TestFormValidation.jsx:
