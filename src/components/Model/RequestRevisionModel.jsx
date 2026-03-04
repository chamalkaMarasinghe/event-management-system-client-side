import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { COMMON_FIELD_TYPES } from "../../constants/fieldTypes";
import useForm from "../../hooks/useForm";
import FeaturedIcon from "../../assets/icons/featured-ico.svg";
import CustomInput from "../Form/Input";
import ImageUpload from "../Form/ImageUpload";
import { referencesFormats } from "../../constants/commonConstants";
import CustomButton from "../Form/CustomButton";

const RequestRevisionModel = ({ isOpen, onSubmit, onClose }) => {
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
      revisionNote: "",
    },
    {
      revisionNote: true,
    },
    {
      revisionNote: COMMON_FIELD_TYPES.REQUIRED_FIELD,
    }
  );

  const [uploadFiles, setUploadFiles] = useState([]);

  const onFileUpload = (files) => {
    setUploadFiles([...files]);
  };

  const handleSubmit = () => {
    setTouched({
      revisionNote: true,
    });
    if (!validateForm()) {
      console.log("Validation Failed");
      return;
    } else {
      console.log("Success");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center z-40 justify-center">
      <div className="bg-white rounded-[1.25rem] w-[90%] p-[1.5rem] md:w-full md:max-w-[44.5625rem] h-auto md:h-full md:max-h-[594px] relative z-50 animate-fade-in">
        <div className=" scrollbar-none overflow-y-auto h-full">
          <div className="absolute w-[1.5rem] h-[1.5rem] right-6 top-6 ">
            <button
              onClick={onClose}
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

          <div className=" flex flex-col justify-between h-full">
            <div className=" flex flex-col gap-6">
              <div className=" flex flex-col gap-[0.75rem]">
                <div>
                  <h2 className="text-center font-inter text-[1.5rem] mb-1 font-bold text-primary">
                    Request Revision
                  </h2>

                  <p className="text-center text-[#535862] lg:max-w-[25rem] leading-[1.25rem] mx-auto font-inter text-[0.75rem]">
                    Request Revision for Delivered Task
                  </p>
                </div>
              </div>

              <div className=" flex flex-col gap-6 mb-4">
                <CustomInput
                  label="Revision Note"
                  placeholder="Describe Your Revision Request"
                  outerContainerStyle="flex-grow"
                  value={formData.revisionNote}
                  onChange={(e) =>
                    handleInputChange("revisionNote", e.target.value)
                  }
                  onBlur={(e) => handleBlur("revisionNote", e.target.value)}
                  name="revisionNote"
                  error={touched.revisionNote && errors.revisionNote}
                  isRequired={true}
                />
                <ImageUpload
                  label="Additional Requirements"
                  onFileUpload={onFileUpload}
                  uploadFiles={uploadFiles}
                />
              </div>
            </div>
            <div className=" flex lg:justify-between items-center flex-wrap  gap-3">
              <CustomButton
                buttonText="Cancel"
                onClick={onClose}
                className="bg-white text-primary text-[0.875rem] w-full rounded-[0.5rem] border-primary md:w-[214px] h-[2.3rem] md:h-[3.0625rem] flex items-center justify-center font-inter font-semibold"
              />
              <CustomButton
                buttonText="Submit"
                onClick={handleSubmit}
                className="bg-primary text-white text-[0.875rem] w-full md:w-[214px] rounded-[0.5rem] transition-colors h-[2.3rem] md:h-[3.0625rem] flex items-center justify-center font-inter font-semibold"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestRevisionModel;
