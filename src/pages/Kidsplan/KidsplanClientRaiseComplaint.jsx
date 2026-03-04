import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DropDownNew from "../../components/Base/DropDownNew";
import ImageUpload from "../../components/Form/KidsPlanForm/ImageUpload";
import CustomButton from "../../components/Base/CustomButton";
import Input from "../../components/Base/Input";
import { useThunk } from "../../hooks/useThunk";
import { useLanguage } from "../../context/language/language";
import useForm from "../../hooks/useForm";
import useFirebaseFileUpload from "../../hooks/useFirebaseFileUpload";
import { createRaiseComplaint } from "../../store/thunks/eventThunks";
import showToast from "../../utils/toastNotifications";
import { languageTranslatorUtil } from "../../utils/languageTranslatorUtil";
import { complaintTypes, firebaseUplaodFolders } from "../../constants/commonConstants";
import { COMMON_FIELD_TYPES } from "../../constants/fieldTypes";
import { errorMessages } from "../../constants/frontendErrorMessages";

const isAttachmentRequired = true;

const KidsplanClientRaiseComplaint = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { user } = useSelector((state) => state.auth);
    const {language} = useLanguage()

    // NOTE:  Contact information from authenticated user
    const contactInfo = {
        name: `${user?.firstName} ${user?.lastName}`,
        email: user?.email,
    };

    // STATE: states >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // STATE: form data : use form hook

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
        clearAllErrors,
        setErrors
    } = useForm(
        {
            ename: null,
            price: null,
            location: null,
            attachment: null,
        },
        {
            ename: true,
            price: true,
            location: true,
            attachment: isAttachmentRequired,
        },
        {
            ename: COMMON_FIELD_TYPES.REQUIRED_FIELD,
            price: COMMON_FIELD_TYPES.REQUIRED_FIELD,
            location: COMMON_FIELD_TYPES.REQUIRED_FIELD,
            attachment: COMMON_FIELD_TYPES.REQUIRED_FIELD,
        }
    );

    // STATE: thunks >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    const [doCreateRaiseComplaint, isRaisingComplaint, raiseComplaintError] = useThunk(createRaiseComplaint);
    const [doUploadFilesToFirebase, isUploadingFiles, uploadFilesError] = useFirebaseFileUpload();

    // STATE: side effects >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // NOTE: Validate eventId on component mount
    useEffect(() => {
        const eventId = searchParams.get("orderId");
        // if (!eventId) {
        //     showToast("error", languageTranslatorUtil(language,"toastMessages","staticErrors","missingEventIdForOrder"));
        //     navigate("/all-orders");
        //     return;
        // }
    }, [searchParams, navigate]);

    // FUNCTIONS: function definantion >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    const clearFormData = () => {
        setFormData({
            ename: null,
            price: null,
            location: null,
            attachment: null
        })
    }

    // FUNCTION: Handle form submission
    const handleSubmit = async (e) => {
        console.log(formData);
        
        e.preventDefault();
        
        const eventId = searchParams.get("orderId");

        // if (!eventId) {
        //     showToast("error",languageTranslatorUtil(language,"toastMessages","staticErrors","missingEventIdForComplaint"));
        //     return;
        // }

        const touchedFields = {};
        Object.keys(formData).forEach(field => {
            touchedFields[field] = true;
        });
        setTouched(touchedFields);

        if(validateForm()){

            let attachment = [];

            // NOTE: Upload attachments if they exist and are File objects
            if (formData?.attachment && formData?.attachment?.length > 0) {

                const filesToUpload = formData?.attachment.filter(item =>
                    item instanceof File ||
                    (typeof item === "object" && item?.name && (item.type?.startsWith("image/") || item.type?.startsWith("application/")))
                );

                if (filesToUpload?.length > 0) {
                    const uploadResult = await doUploadFilesToFirebase(
                        filesToUpload,
                        firebaseUplaodFolders.F_COMPLAINTS
                    );

                    if (!uploadResult?.success) {
                        showToast("error", uploadResult?.error?.message || languageTranslatorUtil(language,"toastMessages","staticErrors","uploadFileErrors"));
                    }

                    attachment = (uploadResult?.uploadedUrls || []).map(url => url);
                } else {
                    attachment = [];
                }
            }

            // NOTE: Prepare complaint data for API
            const complaint = {
                name: formData?.ename,
                price: formData?.price,
                location: formData?.location,
                attachment: attachment[0] || "",
            };            

            try {
                const result = await doCreateRaiseComplaint(complaint);
                if (result?.success) {
                    showToast("success", "Event Created Successfully");
                    clearAllErrors();
                    clearFormData();
                    navigate("/all-orders");
                } else {
                    showToast("error", result?.error?.message || "Error Occurred");
                }
            } catch (error) {
                showToast("error", "Error Occurred");
            }
        }else{
            showToast('error', languageTranslatorUtil(language,"toastMessages","staticErrors","infoValidationNeeded"));
        }        
    };

    // FUNCTION: Handle dropdown selection
    const handleSelectComplaintType = (selected) => {
        handleInputChange("category", selected);
    };

    // FUNCTION: Handle cancel button
    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <>
            <title>Create Event</title>
            <div className="flex flex-col flex-grow">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-row gap-2 font-roboto font-medium text-level-2 custom-w-br-360:text-level-1 leading-[100%] tracking-normal">
                        <p className="text-primary-text">Create</p>
                        <p className="text-primary">Event</p>
                    </div>
                </div>
                <div className="flex flex-col flex-grow gap-9 px-[4.6%] mt-5 mb-10 py-8 w-[88.88%] mx-auto rounded-xl bg-white">
                    <div className="flex flex-col flex-grow">
                        {/* Section 1: Complaint Details */}
                        {/* <div className="mb-6 md:mb-8">
                            <div className="flex items-center mb-4 md:mb-6">
                                <div className="flex items-center justify-center w-6 h-6 mr-3 font-bold text-white rounded-full bg-user-orange">
                                    1
                                </div>
                                <h2 className="font-inter text-dark-gray font-medium text-lg md:text-[20px] leading-[30px] tracking-[0%] align-middle">Event Details</h2>
                            </div>
                            <div className="mb-6">
                                <DropDownNew
                                    options={complaintTypes}
                                    placeholder={languageTranslatorUtil(language,"raise_complaint_form","steps","step1","complaintTypePlaceholder")}
                                    name="category"
                                    displayKey="value"
                                    idKey="id"
                                    label={languageTranslatorUtil(language,"raise_complaint_form","steps","step1","complaintTypeLabel")}
                                    defaultOption={formData.category}
                                    onSelect={handleSelectComplaintType}
                                    onFocus={() => clearError("category")}
                                    onBlur={handleBlur}
                                    error={touched.category && errors.category}
                                    labelStyle="font-roboto font-medium text-sm leading-[22px] tracking-[-0.006em] text-user-black"
                                    wrapperClassName="rounded-md"
                                    buttonClassName="h-[50px] w-full max-w-[519px] [&>div>span]:font-roboto [&>div>span]:font-normal [&>div>span]:text-sm [&>div>span]:leading-5 [&>div>span:not(.opacity-100)]:text-gray-900"
                                    isRequired={true}
                                    isForm={true}
                                />
                            </div>
                            <Input
                                id="description"
                                name="description"
                                placeholder={languageTranslatorUtil(language,"raise_complaint_form","steps","step1","descriptionPlaceholder")}
                                type="textarea"
                                label={languageTranslatorUtil(language,"raise_complaint_form","steps","step1","descriptionLabel")}
                                value={formData.description}
                                error={touched.description && errors.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                onBlur={() => handleBlur("description", formData.description)}
                                onFocus={() => clearError("description")}
                                isRequired={true}
                                isForm={true}
                                labelStyle="font-roboto font-medium text-sm leading-[22px] tracking-[-0.006em] text-user-black"
                                inputStyle="min-h-[100px] resize-none font-normal text-[14px] leading-[22px] align-middle font-inter text-dark-gray focus:border-light-blue-2"
                                className="border-[#CBD5E0]"
                            />
                        </div> */}

                        {/* Section 1: event details */}
                        <div className="mb-6 md:mb-8">
                            <div className="flex items-center mb-4 md:mb-6">
                                <div className="flex items-center justify-center w-6 h-6 mr-3 font-bold text-white rounded-full bg-user-orange">
                                    1
                                </div>
                                <h2 className="font-inter text-dark-gray font-medium text-lg md:text-[20px] leading-[30px] tracking-[0%] align-middle mb-0">Event Details</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-[126px]">
                                <Input
                                    id="ename"
                                    name="ename"
                                    label="Name"
                                    value={formData.ename}
                                    error={touched.ename && errors.ename}
                                    onChange={(e) => handleInputChange("ename", e.target.value)}
                                    onBlur={() => handleBlur("ename", formData.ename)}
                                    onFocus={() => clearError("ename")}
                                    isForm={true}
                                    labelStyle="font-roboto font-medium text-sm leading-[22px] tracking-[-0.006em] text-user-black"
                                    inputStyle="font-normal text-[16px] text-light-gray"
                                    className="border-[#CBDソー5E0] bg-white"
                                />
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    label="Price"
                                    value={formData.price}
                                    error={touched.price && errors.price}
                                    onChange={(e) => handleInputChange("price", e.target.value)}
                                    onBlur={() => handleBlur("price", formData.price)}
                                    onFocus={() => clearError("price")}
                                    isForm={true}
                                    labelStyle="font-roboto font-medium text-sm leading-[22px] tracking-[-0.006em] text-user-black"
                                    inputStyle="font-normal text-[16px] text-light-gray"
                                    className="border-[#CBD5E0] bg-white"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-[126px] mt-5">
                                <Input
                                    id="location"
                                    name="location"
                                    label="Location"
                                    value={formData.location}
                                    error={touched.location && errors.location}
                                    onChange={(e) => handleInputChange("location", e.target.value)}
                                    onBlur={() => handleBlur("location", formData.location)}
                                    onFocus={() => clearError("location")}
                                    isForm={true}
                                    labelStyle="font-roboto font-medium text-sm leading-[22px] tracking-[-0.006em] text-user-black"
                                    inputStyle="font-normal text-[16px] text-light-gray"
                                    className="border-[#CBDソー5E0] bg-white"
                                />
                            </div>
                        </div>

                        {/* Section 2: flyer */}
                        <div className="mb-6 md:mb-8">
                            <div className="flex items-center mb-4 md:mb-6">
                                <div className="flex items-center justify-center w-6 h-6 mr-3 font-bold text-white rounded-full bg-user-orange">
                                    2
                                </div>
                                <h2 className="font-inter text-dark-gray font-medium text-lg md:text-[20px] leading-[30px] tracking-[0%] align-middle mb-0">Flyer</h2>
                            </div>
                            <ImageUpload
                            //    Todo: Polish Translation missing
                                label= {languageTranslatorUtil(language,"ms_values","uploadFile")}
                                labelStyle="font-roboto font-medium text-sm leading-[22px] tracking-[-0.006em] text-user-black"
                                onFileUpload={(files) => handleInputChange("attachment", files)}
                                uploadFiles={formData.attachment || []}
                                onClick={() => {
                                    setTouched({...touched, attachment: true});
                                    setErrors({...errors, attachment: ''})
                                }}
                                onBlur={() => {
                                    let localTouched;
                                    setTouched(prev => {
                                        localTouched = prev;
                                        return prev
                                    })
                                    if(localTouched?.attachment && isAttachmentRequired && (!formData?.attachment || formData?.attachment?.length < 1 || Object?.keys(formData?.attachment)?.length < 1)){
                                        setErrors(prev => {
                                            const obj = {...prev, attachment: errorMessages.REQUIRED_FIELD};
                                            return obj;
                                        });
                                    }
                                }}
                                error={touched.attachment && errors.attachment}
                                uploadText= {languageTranslatorUtil(language,"ms_values","supportedFormats")}
                                dragText= {languageTranslatorUtil(language,"ms_values","dragDrop")}
                                numberOfFiles={1}
                                allowImageArrange={false}
                                maximumSize={10}
                                isForm={true}
                                accept={[
                                    { mime: "application/pdf", extensions: [".pdf"] },
                                    { mime: "image/jpeg", extensions: [".jpg", ".jpeg"] },
                                    { mime: "image/png", extensions: [".png"] },
                                ]}
                            />
                        </div>

                        {/* Section 3: Organizer details */}
                        <div className="mb-6 md:mb-8">
                            <div className="flex items-center mb-4 md:mb-6">
                                <div className="flex items-center justify-center w-6 h-6 mr-3 font-bold text-white rounded-full bg-user-orange">
                                    3
                                </div>
                                <h2 className="font-inter text-dark-gray font-medium text-lg md:text-[20px] leading-[30px] tracking-[0%] align-middle mb-0">Event Organizer</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-[126px]">
                                <Input
                                    id="clientName"
                                    name="clientName"
                                    label="Service Provider Name"
                                    value={contactInfo.name}
                                    disabled={true}
                                    isForm={true}
                                    labelStyle="font-roboto font-medium text-sm leading-[22px] tracking-[-0.006em] text-user-black"
                                    inputStyle="font-normal text-[16px] text-light-gray"
                                    className="border-[#CBDソー5E0] bg-white"
                                />
                                <Input
                                    id="clientEmail"
                                    name="clientEmail"
                                    type="email"
                                    label={languageTranslatorUtil(language,"raise_complaint_form","steps","step3","emailLabel")}
                                    value={contactInfo.email}
                                    disabled={true}
                                    isForm={true}
                                    labelStyle="font-roboto font-medium text-sm leading-[22px] tracking-[-0.006em] text-user-black"
                                    inputStyle="font-normal text-[16px] text-light-gray"
                                    className="border-[#CBD5E0] bg-white"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col flex-grow"></div>

                        {/* Form Actions */}
                        <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-2 mt-8 md:mt-[88px]">
                            <CustomButton
                                buttonText={languageTranslatorUtil(language,"raise_complaint_form","cancelButton")}
                                bgColor="bg-transparent"
                                textColor="text-user-orange"
                                borderColor="border-user-orange"
                                width="w-full sm:w-[118px]"
                                height="h-[40px]"
                                className="px-[26px] py-[5px] font-roboto font-semibold rounded-[5px] hover:bg-orange-50 mb-2 sm:mb-0"
                                hoverTextColor = "hover:text-primary"
                                hoverBorderColor = "hover:border-dark-orange"
                                textWeight="font-semibold"
                                onClick={handleCancel}
                                type="button"
                            />
                            <CustomButton
                                buttonText={languageTranslatorUtil(language,"raise_complaint_form","submitButton")}
                                bgColor="bg-user-orange"
                                textColor="text-white"
                                borderColor="border-user-orange"
                                width="w-full sm:w-[118px]"
                                height="h-[40px]"
                                className="px-[26px] py-[5px] font-roboto font-semibold rounded-[5px] hover:bg-orange-600"
                                textWeight="font-semibold"
                                loaderColor="#ffffff"
                                onClick={handleSubmit}
                                loading={isRaisingComplaint || isUploadingFiles}
                                disabled={isRaisingComplaint || isUploadingFiles}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default KidsplanClientRaiseComplaint;