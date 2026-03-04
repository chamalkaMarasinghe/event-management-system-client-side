import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ProfileImageUploader from "../../components/Form/KidsPlanForm/ProfileImageUploader";
import Button from "../../components/Form/CustomButton";
import CustomInput from "../../components/Base/Input";

import useForm from "../../hooks/useForm";
import { useThunk } from "../../hooks/useThunk";
import useFirebaseFileUpload from "../../hooks/useFirebaseFileUpload";
import { useLanguage } from "../../context/language/language";
import { languageTranslatorUtil } from "../../utils/languageTranslatorUtil";
import showToast from "../../utils/toastNotifications";

import { COMMON_FIELD_TYPES } from "../../constants/fieldTypes";
import { getClientProfile, editClientProfile } from "../../store";
import { firebaseUplaodFolders } from "../../constants/commonConstants";

const UserProfile = () => {
  // NOTE: useSelector to get client profile from Redux store
  const { user } = useSelector((state) => state.auth);
  const { clientProfile } = useSelector((state) => state.user);

  // Use clientProfile.profile if available, fallback to auth user
  const profileData = clientProfile?.profile || user;

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const {language} = useLanguage();

  // NOTE: useThunk hooks for API calls
  const [doGetClientProfile, isGetClientProfileLoading, getClientProfileError] =
    useThunk(getClientProfile);
  const [
    doEditClientProfile,
    isEditClientProfileLoading,
    editClientProfileError,
  ] = useThunk(editClientProfile);
  const [
    doUploadReferencesToFirebase,
    isUploadReferencesToFirebaseLoading,
    uploadReferencesToFirebaseError,
  ] = useFirebaseFileUpload();

  const handleEditing = () => setIsEditing(!isEditing);

  const {
    formData,
    errors,
    touched,
    handleInputChange,
    handleBlur,
    validateForm,
    setTouched,
    setFormData,
  } = useForm(
    {
      firstName: profileData?.firstName || "",
      lastName: profileData?.lastName || "",
      email: profileData?.email || "",
      phoneNumber: profileData?.phoneNumber || "",
      city: profileData?.city || "",
    },
    {
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
      city: false,
    },
    {
      firstName:
        COMMON_FIELD_TYPES.REQUIRED_FIELD && COMMON_FIELD_TYPES.REQUIRED_FIELD,
      lastName:
        COMMON_FIELD_TYPES.REQUIRED_FIELD && COMMON_FIELD_TYPES.REQUIRED_FIELD,
      email:
        COMMON_FIELD_TYPES.REQUIRED_FIELD && COMMON_FIELD_TYPES.EMAIL_FIELD,
      phoneNumber:
        COMMON_FIELD_TYPES.REQUIRED_FIELD && COMMON_FIELD_TYPES.PHONE,
      city: COMMON_FIELD_TYPES.TEXT_FIELD,
    }
  );

  const [profilePicture, setProfilePicture] = useState(
    profileData?.profilePicture ?? null
  );

  // NOTE: Error handling useEffect for getClientProfile
  useEffect(() => {
    if (getClientProfileError) {
      console.error("Get client profile error:", getClientProfileError);
      showToast(
        "error",
        getClientProfileError?.message || languageTranslatorUtil(language,"toastMessages","staticErrors","laodingProfileDataFailure")
      );
    }
  }, [getClientProfileError]);

  // NOTE: Error handling useEffect for editClientProfile
  useEffect(() => {
    if (editClientProfileError) {
      console.error("Edit client profile error:", editClientProfileError);
      showToast(
        "error",
        editClientProfileError?.message || languageTranslatorUtil(language,"toastMessages","staticErrors","updateProfileFailure")
      );
    }
  }, [editClientProfileError]);

  // NOTE: Error handling useEffect for Firebase upload
  useEffect(() => {
    if (uploadReferencesToFirebaseError) {
      console.error("Firebase upload error:", uploadReferencesToFirebaseError);
      showToast(
        "error",
        uploadReferencesToFirebaseError?.message ||
        languageTranslatorUtil(language,"toastMessages","staticErrors","updateProfilePictureFailure")
      );
    }
  }, [uploadReferencesToFirebaseError]);

  // NOTE: Fetch client profile on component mount
  useEffect(() => {
    const fetchClientProfile = async () => {
      setIsLoading(true);
      try {
        const result = await doGetClientProfile();
        if (result?.success) {
          console.log("Client profile fetched successfully");
        } else {
          console.error("Failed to fetch client profile:", result?.error);
        }
      } catch (error) {
        console.error("Error fetching client profile:", error);
        showToast("error", languageTranslatorUtil(language,"toastMessages","staticErrors","laodingProfileDataFailure"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchClientProfile();
  }, []);

  // NOTE: Update form data when profile data changes
  useEffect(() => {
    if (profileData) {
      setFormData({
        firstName: profileData?.firstName || "",
        lastName: profileData?.lastName || "",
        email: profileData?.email || "",
        phoneNumber: profileData?.phoneNumber || "",
        city: profileData?.city || "",
      });
      setProfilePicture(profileData?.profilePicture || null);
      setHasChanges(false); // Reset changes when profile data loads
    }
  }, [profileData, setFormData]);

  // NOTE: Check for changes whenever form data or profile picture changes
  useEffect(() => {
    if (profileData && isEditing) {
      const hasFormChanges =
        formData.firstName !== (profileData?.firstName || "") ||
        formData.lastName !== (profileData?.lastName || "") ||
        formData.phoneNumber !== (profileData?.phoneNumber || "") ||
        formData.city !== (profileData?.city || "");

      const hasProfilePictureChange =
        profilePicture !== (profileData?.profilePicture || null);

      setHasChanges(hasFormChanges || hasProfilePictureChange);
    } else if (!isEditing) {
      setHasChanges(false);
    }
  }, [formData, profilePicture, profileData, isEditing]);

  // FUNCTION: Handle Profile Image Upload
  const handleProfileImageUpload = (file) => {
    setProfilePicture(file);
  };

  // NOTE: Helper function to get initial form data
  const getUserFormData = (user) => ({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    city: user?.city || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
      city: true,
    });

    if (validateForm()) {
      let uploadedProfilePictureUrl = profilePicture || null;

      // first check if profile picture is null or not
      if (profilePicture === null) {
        // if profile picture is null it means user remove the profile picture or not uploaded
        // so we will set the profile picture to null
        setProfilePicture(null);
        uploadedProfilePictureUrl = null;
      } else {
        // Check if profile picture is a new file
        const isNewProfilePicture =
          (profilePicture && profilePicture instanceof File) ||
          (typeof profilePicture === "object" &&
            profilePicture.name &&
            profilePicture.type.startsWith("image/"));

        // Upload profile picture only if it's a new file
        if (isNewProfilePicture) {
          const uploadProfilePictureResult = await doUploadReferencesToFirebase(
            [profilePicture],
            firebaseUplaodFolders.F_PROFILE_PICTURES
          );

          if (!uploadProfilePictureResult.success) {
            console.error("Upload Error:", uploadProfilePictureResult.error);
            return;
          }

          uploadedProfilePictureUrl =
            uploadProfilePictureResult.uploadedUrls[0];
          setProfilePicture(uploadedProfilePictureUrl);
        }
      }

      const newFormData = {
        ...formData,
        profilePicture: uploadedProfilePictureUrl,
      };

      // NOTE: update client user profile details
      const result = await doEditClientProfile(newFormData);
      if (result?.success) {
        showToast("success", languageTranslatorUtil(language,"toastMessages","staticSuccessMsgs","profileUpdatedSuccess"));
        setIsEditing(false);
        setHasChanges(false); // Reset changes after successful save
      } else {
        console.error("Failed to update profile:", result?.error);
      }
    } else {
      showToast("error", languageTranslatorUtil(language,"toastMessages","staticErrors","infoValidationNeeded"));
    }
  };

  const handleCancel = () => {
    setFormData(getUserFormData(profileData));
    setProfilePicture(profileData?.profilePicture || null);
    setIsEditing(false);
    setHasChanges(false); // Reset changes when canceling
  };
  // NOTE: Show loading state while fetching profile or updating
  const isComponentLoading = isLoading || isGetClientProfileLoading;
  const isFormLoading =
    isUploadReferencesToFirebaseLoading || isEditClientProfileLoading;

  const hasValidationErrors = () => {
    // At least one field has a non-empty error string
    return Object.values(errors).some((err) => !!err);
  };

  return (
    <>
      <title>My Profile</title>
      <div className="flex flex-col flex-grow mx-4 sm:mx-8 lg:mx-20 my-10 p-6 md:p-10 border-none rounded-[10px] bg-[#FFFFFF] shadow-[4px_4px_32px_0px_rgba(255,247,237,0.2)]">
        <div className="h-full flex flex-col justify-between flex-grow">
          <div className="">
            <div className="flex flex-col h-full md:flex-row mb-10 text-center md:text-justify lg:mb-10 items-center gap-[43px] sm:items-center">
              <div className="flex-shrink-0">
                <div
                    className={!isEditing ? "cursor-default" : ""}
                    style={!isEditing ? { cursor: "default !important" } : {}}
                >
                  <ProfileImageUploader
                      isRequired={false}
                      avatarContainerStyle="w-[152px]"
                      imageStyle="w-[152px] h-[152px]"
                      labelStyle="font-inter font-medium text-content"
                      outerContainerStyle={
                        !isEditing
                            ? "[&_*]:!cursor-default [&]:!cursor-default pointer-events-none"
                            : ""
                      }
                      isDisabled={!isEditing}
                      loading={isComponentLoading}
                      image={profilePicture}
                      onImageUpload={handleProfileImageUpload}
                      selectedImage={profilePicture}
                      firstName={profileData.firstName || ""}
                      lastName={profileData.lastName || ""}
                  />
                </div>
              </div>
              {/* Text content on the right */}
              <div className="flex flex-col gap-1">
                {isComponentLoading ? (
                    <h1 className="rounded-[50px] max-w-[290px] mb-2 text-[40px] font-bold font-roboto text-transparent bg-slate-200 animate-pulse">
                      {languageTranslatorUtil(
                        language,
                        "Myprofile_Page",
                        "screenTitle"
                      )}
                    </h1>
                ) : (
                    <h1 className="text-[40px] max-w-[290px] font-bold font-roboto text-dark-gray ">
                      {languageTranslatorUtil(
                        language,
                        "Myprofile_Page",
                        "screenTitle"
                      )}
                    </h1>
                )}
                {isComponentLoading ? (
                    <p className="rounded-[50px] text-[20px] max-w-[311px] font-bold font-roboto text-transparent bg-slate-200 animate-pulse">
                      {languageTranslatorUtil(
                        language,
                        "Myprofile_Page",
                        "screenSubtitle"
                      )}
                    </p>
                ) : (
                    <p className="text-[20px] font-bold max-w-[311px] font-roboto text-light-gray">
                      {languageTranslatorUtil(
                        language,
                        "Myprofile_Page",
                        "screenSubtitle"
                      )}
                    </p>
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-6 sm:space-y-6">
              {/* First row */}
              <div className="grid grid-cols-1 gap-6 sm:gap-4 sm:grid-cols-2">
                <div>
                  <CustomInput
                      label={languageTranslatorUtil(language,"Myprofile_Page","labels","firstName")}
                      labelStyle="font-roboto text-user-black text-[14px] tracking-[0.06em]"
                      isRequired={true}
                      placeholder={languageTranslatorUtil(language,"sign_up_page","firstNameLabel")}
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      error={touched.firstName && errors.firstName}
                      onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                      }
                      onBlur={() => handleBlur("firstName", formData.firstName)}
                      className="font-normal h-[52px] font-roboto text-user-gray text-[16px] tracking-[.011em] leading-6 rounded-[8px] placeholder:font-roboto placeholder:text-user-gray placeholder:text-[16px]"
                      disabled={!isEditing}
                      isFloatingLabel={false}
                      allowFillColor={false}
                      isForm={true}
                      loading={isComponentLoading}
                  />
                </div>
                <div>
                  <CustomInput
                      label={languageTranslatorUtil(language,"Myprofile_Page","labels","lastName")}
                      labelStyle="font-roboto text-user-black text-[14px] tracking-[0.06em]"
                      isRequired={true}
                      placeholder={languageTranslatorUtil(language,"sign_up_page","lastNameLabel")}
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      error={touched.lastName && errors.lastName}
                      onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                      }
                      onBlur={() => handleBlur("lastName", formData.lastName)}
                      className="font-normal h-[52px] font-roboto text-user-gray text-[16px] tracking-[.011em] leading-6 rounded-[8px] placeholder:font-roboto placeholder:text-user-gray placeholder:text-[16px]"
                      disabled={!isEditing}
                      allowFillColor={false}
                      isForm={true}
                      loading={isComponentLoading}
                  />
                </div>
              </div>

              {/* Second row */}
              <div className="grid grid-cols-1 gap-6 sm:gap-4 sm:grid-cols-2">
                <div>
                  <CustomInput
                      label={languageTranslatorUtil(language,"Myprofile_Page","labels","email")}
                      labelStyle="font-roboto text-user-black text-[14px] tracking-[0.06em]"
                      isRequired={true}
                      placeholder={languageTranslatorUtil(language,"sign_up_page","emailLabel")}
                      type="email"
                      name="email"
                      value={formData.email}
                      error={touched.email && errors.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      onBlur={() => handleBlur("email", formData.email)}
                      className="font-normal h-[52px] font-roboto text-user-gray text-[16px] tracking-[.011em] leading-6 rounded-[8px] placeholder:font-roboto placeholder:text-user-gray placeholder:text-[16px]"
                      disabled={true}
                      allowFillColor={false}
                      isForm={true}
                      loading={isComponentLoading}
                  />
                </div>
                <div>
                  <CustomInput
                      label={languageTranslatorUtil(language,"Myprofile_Page","labels","phoneNumber")}
                      labelStyle="font-roboto text-user-black text-[14px] tracking-[0.06em]"
                      isRequired={true}
                      placeholder={languageTranslatorUtil(language,"sign_up_page","phoneLabel")}
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      error={touched.phoneNumber && errors.phoneNumber}
                      onChange={(e) =>
                          handleInputChange("phoneNumber", e.target.value)
                      }
                      onBlur={() => handleBlur("phoneNumber", formData.phoneNumber)}
                      className="font-normal h-[52px] font-roboto text-user-gray text-[16px] tracking-[.011em] leading-6 rounded-[8px] placeholder:font-roboto placeholder:text-user-gray placeholder:text-[16px]"
                      disabled={!isEditing}
                      isFloatingLabel={false}
                      allowFillColor={false}
                      isForm={true}
                      loading={isComponentLoading}
                  />
                </div>
              </div>

              {/* Third row */}
              <div className="grid grid-cols-1 gap-6 sm:gap-4 sm:grid-cols-2">
                <div>
                  <CustomInput
                      label={languageTranslatorUtil(language,"Myprofile_Page","labels","city")}
                      labelStyle="font-roboto text-user-black text-[14px] tracking-[0.06em]"
                      placeholder={languageTranslatorUtil(language,"ms_values","enterCity")}
                      type="text"
                      name="city"
                      value={formData.city}
                      error={touched.city && errors.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      onBlur={() => handleBlur("city", formData.city)}
                      className="font-normal h-[52px] font-roboto text-user-gray text-[16px] tracking-[.011em] leading-6 rounded-[8px] placeholder:font-roboto placeholder:text-user-gray placeholder:text-[16px]"
                      disabled={!isEditing}
                      allowFillColor={false}
                      isForm={true}
                      loading={isComponentLoading}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {/* Buttons */}
          <div className="flex flex-row justify-end gap-4">
            {isEditing && (
                <Button
                    buttonText={languageTranslatorUtil(language,"common_stringTemplates","cancelButton")}
                    bgColor="bg-none"
                    textColor="text-primary"
                    borderColor="border-user-orange"
                    hoverEffect="none"
                    width=""
                    height=""
                    className="font-roboto px-6 w-[140px] h-[48px] rounded-[6px] text-[14px] sm:text-[16px]"
                    onClick={handleCancel}
                    disabled={isFormLoading}
                />
            )}
            <Button
                buttonText={!isEditing ?  languageTranslatorUtil(language,"Myprofile_Page","buttons","edit") :  languageTranslatorUtil(language,"Myprofile_Page","buttons","saveChanges")}
                bgColor="bg-primary"
                textColor="text-white"
                width=""
                height=""
                className={`h-[48px] justify-center font-roboto font-medium text-[14px] sm:text-[16px] flex items-center rounded-[6px] ${
                    !isEditing ? "w-[122px]" : "w-[140px]"
                } ${
                    isEditing && (!hasChanges || hasValidationErrors()) ? "opacity-50 cursor-not-allowed" : ""
                }`}
                loaderColor="white"
                onClick={isEditing ? handleSubmit : handleEditing}
                loading={isFormLoading}
                disabled={
                    isFormLoading ||
                    isComponentLoading ||
                    (isEditing && (!hasChanges || hasValidationErrors()))
                }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
