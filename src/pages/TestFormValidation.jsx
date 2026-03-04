import React, { useState } from "react";
import useForm from "../hooks/useForm";
import Dropdown from "../components/Form/Dropdown";
import CustomInput from "../components/Form/Input";
import { COMMON_FIELD_TYPES } from "../constants/fieldTypes";
import CustomeDatePicker from "../components/Form/CustomDatePicker";
import dayjs from "dayjs";
import CustomTimePicker from "../components/Form/CustomTimePicker";

const TestFormValidation = () => {
  const complaintReasonOptions = [
    { _id: "1", reason: "Incomplete cleaning" },
    { _id: "2", reason: "Damaged property" },
    { _id: "3", reason: "Late arrival" },
    { _id: "4", reason: "Unprofessional behavior" },

    { _id: "5", reason: "Plants damaged" },
    { _id: "6", reason: "Incomplete work" },
    { _id: "7", reason: "Tools left behind" },
    { _id: "8", reason: "Overcharged" },

    { _id: "9", reason: "Leaking pipes after service" },
    { _id: "10", reason: "Incomplete repair" },
    { _id: "11", reason: "Wrong part used" },
  ];

  const categoryOptions = [
    { _id: "1", reason: "Incomplete cleaning" },
    { _id: "2", reason: "Damaged property" },
    { _id: "3", reason: "Late arrival" },
    { _id: "4", reason: "Unprofessional behavior" },
  ];

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
      category: null,
      taskTitle: "",
      taskDescription: "",
      complaintReason: null,
      orderDate: null,
      orderTime: "",
    },
    {
      category: true,
      taskTitle: true,
      taskDescription: false,
      complaintReason: false,
      orderDate: true,
      orderTime: true,
    },
    {
      category: {
        type: COMMON_FIELD_TYPES.DROPDOWN,
        displayKey: "reason", // This tells us which key to use to display the option value
      },
      taskTitle: COMMON_FIELD_TYPES.REQUIRED_FIELD,
      taskDescription: COMMON_FIELD_TYPES.TEXT_FIELD,
      complaintReason: COMMON_FIELD_TYPES.TEXT_FIELD,
      orderDate: COMMON_FIELD_TYPES.DATE_PICKER,
      orderTime: COMMON_FIELD_TYPES.TIME_PICKER,
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      category: true,
      taskTitle: true,
      taskDescription: true,
      complaintReason: true,
      orderDate: true,
      orderTime: true,
    });

    if (!validateForm()) {
      console.log("Validation failed");
    } else {
      // Call API or submit form no validation errors
      console.log("Form submitted", formData);
    }
  };

  console.log("formData", formData);

  return (
    <div className=" max-w-[600px] m-auto mt-9 flex flex-col gap-6">
      <Dropdown
        name="category"
        label="Category"
        placeholder="Select a category"
        idKey="_id"
        displayKey="reason"
        options={categoryOptions}
        // defaultOption={formData.category}
        onSelect={(selectedOption) =>
          handleInputChange("category", selectedOption)
        }
        onFocus={() => clearError("category")} // Clear error when user interacts again
        onBlur={handleBlur}
        error={touched.category && errors.category}
        isRequired
        outerContainerStyle="w-full md:w-full"
      />
      <CustomInput
        label="Task Title"
        placeholder="Enter a concise task"
        outerContainerStyle="flex-grow"
        value={formData.taskTitle}
        onChange={(e) => handleInputChange("taskTitle", e.target.value)}
        onBlur={(e) => handleBlur("taskTitle", e.target.value)}
        name="taskTitle"
        error={touched.taskTitle && errors.taskTitle}
        isRequired={true}
      />
      <CustomInput
        label="Task Description"
        placeholder="Enter a concise task"
        outerContainerStyle="flex-grow"
        value={formData.taskDescription}
        onChange={(e) => handleInputChange("taskDescription", e.target.value)}
        onBlur={(e) => handleBlur("taskDescription", e.target.value)}
        name="taskDescription"
        error={touched.taskDescription && errors.taskDescription}
        isRequired={false}
      />
      <Dropdown
        name="complaintReason"
        label="Reason for Complaint"
        placeholder="Select a reason"
        idKey="_id"
        displayKey="reason"
        options={complaintReasonOptions}
        // defaultOption={formData.category}
        onSelect={(selectedOption) =>
          handleInputChange("complaintReason", selectedOption)
        }
        onFocus={() => clearError("complaintReason")} // Clear error when user interacts again
        onBlur={handleBlur}
        error={touched.complaintReason && errors.complaintReason}
        outerContainerStyle="w-full md:w-full"
      />
      <CustomeDatePicker
        id="date-picker"
        label="Date"
        value={formData.orderDate ? dayjs(formData.orderDate) : null}
        onChange={(date) => {
          if (date) {
            const formattedDate = date.format("YYYY/MM/DD");
            setFormData((prev) => ({
              ...prev,
              orderDate: formattedDate, // Store as formatted string instead of dayjs object
            }));
            clearError("orderDate");
          }
        }}
        onFocus={() => clearError("orderDate")}
        onBlur={() => handleBlur("orderDate", formData.orderDate)}
        error={touched.orderDate && errors.orderDate}
        placeholder="Date"
        isRequired={true}
        outerContainerStyle="w-full"
      />

      <CustomTimePicker
        id="time-picker"
        label="Time"
        selectedTime={formData.orderTime || ""}
        onChange={(selectTime) => {
          setFormData((prev) => ({
            ...prev,
            orderTime: selectTime,
          }));
          clearError("orderTime");
        }}
        onFocus={() => clearError("orderTime")}
        onBlur={() => handleBlur("orderTime", formData.orderTime)}
        error={touched.orderTime && errors.orderTime}
        placeholder="Time"
        isRequired={true}
        outerContainerStyle="w-full"
      />

      <button
        onClick={handleSubmit}
        className="bg-primary text-white px-6 py-2 rounded-md"
      >
        Submit
      </button>
    </div>
  );
};

export default TestFormValidation;
