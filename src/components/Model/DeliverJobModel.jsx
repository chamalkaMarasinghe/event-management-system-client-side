import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import FeaturedIcon from "../../assets/icons/featured-ico.svg";
import useForm from "../../hooks/useForm";
import { COMMON_FIELD_TYPES } from "../../constants/fieldTypes";
import {
  firebaseUplaodFolders,
  referencesFormats,
} from "../../constants/commonConstants";
import CustomInput from "../Form/Input";
import ImageUpload from "../Form/ImageUpload";
import CustomButton from "../Form/CustomButton";
import { useThunk } from "../../hooks/useThunk";
import { createDeliverJob } from "../../store";
import showToast from "../../utils/toastNotifications";
import useFirebaseFileUpload from "../../hooks/useFirebaseFileUpload";
import { languageTranslatorUtil } from "../../utils/languageTranslatorUtil";
import { useLanguage } from "../../context/language/language";

const DeliverJobModel = ({ isOpen, order, setIsOpen, fetchOrder }) => {

  const {language} = useLanguage();
  const [uploadFiles, setUploadFiles] = useState([]);
  const [fileUploadError, setFileUploadError] = useState({error: "", touched: false})
  const [doDeliverJob, isDeliverJob, deliverError] = useThunk(createDeliverJob);
  const [
    doUploadRefrencesToFirebase,
    isUploadRefrencesToFirebaseLoading,
    uploadRefrencesToFirebaseError,
  ] = useFirebaseFileUpload();

  useEffect(() => {
    setFileUploadError({error: "", touched: false});
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

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
      deliveryNote: "",
    },
    {
      deliveryNote: true,
    },
    {
      deliveryNote: COMMON_FIELD_TYPES.REQUIRED_FIELD,
    }
  );

  useEffect(() => {
    if(uploadFiles?.length < 1){
      setFileUploadError({...fileUploadError, error: "Please Provide Delivery Attachments"});
    }else{
      setFileUploadError({...fileUploadError, error: ""});
    }
  }, [uploadFiles])

  const onFileUpload = (files) => {
    setFileUploadError({...fileUploadError, touched: true});
    setUploadFiles([...files]);
  };

  const handleSubmit = async () => {
    setTouched({
      deliveryNote: true,
    });
    setFileUploadError({...fileUploadError, touched: true});

    if(uploadFiles?.length < 1){
      setFileUploadError({...fileUploadError, error: "Please Provide Delivery Attachments", touched: true});
    }else{
      setFileUploadError({...fileUploadError, error: "", touched: true});
    }

    if (!validateForm()) {
      return;
    }

    let additionalRequirements = [];
    // Upload files to firebase
    if (uploadFiles.length > 0) {
      const result = await doUploadRefrencesToFirebase(
        uploadFiles,
        firebaseUplaodFolders.F_ORDERS
      );
      if (result?.success) {
        additionalRequirements = result.uploadedUrls;
      } else {
        showToast("error", languageTranslatorUtil(language,"toastMessages","staticErrors","uploadFileErrors"));
        return;
      }
    }

    if (uploadFiles.length > 0) {
      const result = await doDeliverJob({
        orderId: order?._id,
        deliveryNotes: formData.deliveryNote,
        additionalRequirements:
          additionalRequirements.length > 0 ? additionalRequirements : null,
      });
  
      if (result?.success) {
        showToast("success", languageTranslatorUtil(language,"toastMessages","staticSuccessMsgs","jobDeliveredSuccess"));
        setFormData({
          deliveryNote: "",
        });
        setUploadFiles([]);
        setTimeout(() => {
          setIsOpen(false);
          fetchOrder();
        }, 1000);
      } else {
        showToast("error", result?.error?.message || languageTranslatorUtil(language,"toastMessages","staticErrors","jobDeliverFailure"));
        setFormData({
          deliveryNote: "",
        });
        setUploadFiles([]);
        setIsOpen(false);
      }
    }
  };

  const handleClose = () => {
    setFormData({
      deliveryNote: "",
    });
    setUploadFiles([]);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center z-40 justify-center">
      <div className="bg-white rounded-[1.25rem] w-[90%] p-[1.5rem] md:w-full md:max-w-[44.5625rem] h-auto md:h-[594px] relative z-50 animate-fade-in flex flex-col">
        {/* Keep original header positioning */}
        <div className="absolute w-[1.5rem] h-[1.5rem] right-6 top-6">
          <button
            type="button"
            onClick={handleClose}
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

        <div className="h-full flex flex-col">
          {/* Header content */}
          <div className="flex flex-col gap-[0.75rem] mb-6">
            <div>
              <h2 className="text-center font-inter text-level-3 leading-6 mb-1 font-bold text-dark">
                Deliver Job
              </h2>
              <p className="text-center text-[#535862] lg:max-w-[25rem] leading-[1.25rem] mx-auto font-inter text-level-7">
                Deliver your Job
              </p>
            </div>
          </div>

          {/* Form content with conditional scroll */}
          <div className="flex-1 overflow-y-auto scrollbar-none">
            <div className="flex flex-col gap-6 mb-4">
              <CustomInput
                label="Enter Delivery Note"
                placeholder="Enter the Delivery Note"
                outerContainerStyle="flex-grow"
                value={formData.deliveryNote}
                onChange={(e) =>
                  handleInputChange("deliveryNote", e.target.value)
                }
                onBlur={(e) => handleBlur("deliveryNote", e.target.value)}
                name="deliveryNote"
                error={touched.deliveryNote && errors.deliveryNote}
                isRequired={true}
              />
              <ImageUpload
                label="Delivery Attachments"
                accept={[referencesFormats.JPEG_JPG, referencesFormats.PNG]}
                onFileUpload={onFileUpload}
                uploadFiles={uploadFiles}
                isModel={true}
                isDisabled={isUploadRefrencesToFirebaseLoading}
                isLoading={isUploadRefrencesToFirebaseLoading}
                uploadText="Jpeg, Jpg, png, files are allowed"
                numberOfFiles={5}
                isRequired={true}
                error={fileUploadError.touched && fileUploadError.error}
              />
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex lg:justify-between items-center flex-wrap gap-3 mt-auto">
            <CustomButton
              buttonText="Cancel"
              type="button"
              onClick={handleClose}
              className="bg-white text-dark text-level-6 w-full rounded-[0.5rem] border-dark md:w-[214px] h-[2.3rem] md:h-[3.0625rem] flex items-center justify-center font-inter font-semibold"
            />
            <CustomButton
              buttonText="Submit"
              onClick={handleSubmit}
              className="bg-primary text-dark text-level-6 w-full md:w-[214px] rounded-[0.5rem] transition-colors h-[2.3rem] md:h-[3.0625rem] flex items-center justify-center font-inter font-semibold"
              loading={isDeliverJob || isUploadRefrencesToFirebaseLoading}
              isDisabled={isDeliverJob || isUploadRefrencesToFirebaseLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliverJobModel;
