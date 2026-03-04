import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import CustomButton from './CustomButton';
import CustomInput from '../Base/Input';

import useForm from "../../hooks/useForm";
import { useThunk } from "../../hooks/useThunk";
import { useLanguage } from "../../context/language/language.js";
import { languageTranslatorUtil } from "../../utils/languageTranslatorUtil.js";
import showToast from "../../utils/toastNotifications";
import { COMMON_FIELD_TYPES } from "../../constants/fieldTypes";
import { submitContactForm } from "../../store";


const ContactForm = () => {
    // NOTE: useSelector to get authentication state from Redux store
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const {language} =useLanguage();

    // NOTE: useThunk hook for contact form submission
    const [doSubmitContactForm, isSubmittingContactForm, submitContactFormError] = useThunk(submitContactForm);

    // Extract user email from Redux state
    const userEmail = user?.email || '';

    // Define form configuration
    const {
        formData,
        errors,
        touched,
        handleInputChange,
        handleBlur,
        clearError,
        validateForm,
        setTouched,
        setFormData
    } = useForm(
        {
            firstName: '',
            lastName: '',
            email: '',
            subject: '',
            message: ''
        },
        {
            firstName: true,
            lastName: true,
            email: true,
            subject: false, // Subject is not required
            message: true
        },
        {
            firstName: COMMON_FIELD_TYPES.REQUIRED_FIELD,
            lastName: COMMON_FIELD_TYPES.REQUIRED_FIELD,
            email: COMMON_FIELD_TYPES.EMAIL_FIELD,
            subject: COMMON_FIELD_TYPES.TEXT_FIELD, // Optional field
            message: COMMON_FIELD_TYPES.REQUIRED_FIELD
        }
    );

    // NOTE: Set email when user authentication state changes
    useEffect(() => {
        if (isAuthenticated && userEmail) {
            setFormData(prev => ({
                ...prev,
                email: userEmail
            }));
        }
    }, [isAuthenticated, userEmail, setFormData]);

    // NOTE: Error handling useEffect for contact form submission
    useEffect(() => {
        if (submitContactFormError) {
            console.error("Contact form submission error:", submitContactFormError);
            showToast("error", submitContactFormError?.message);
        }
    }, [submitContactFormError]);

    // Form submission
    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        // Mark all fields as touched to show validation errors
        setTouched({
            firstName: true,
            lastName: true,
            email: true,
            subject: true, // Include subject in touched even though it's optional
            message: true
        });

        const isValid = validateForm();

        if (isValid) {
            try {
                const result = await doSubmitContactForm(formData);

                if (result?.success) {
                    // NOTE: Reset form after successful submission
                    setFormData({
                        firstName: '',
                        lastName: '',
                        email: isAuthenticated ? userEmail : '',
                        subject: '',
                        message: ''
                    });

                    // Reset touched state
                    setTouched({
                        firstName: false,
                        lastName: false,
                        email: false,
                        subject: false,
                        message: false
                    });

                    showToast("success", result?.response?.message);
                } else {
                    showToast("error", result?.response?.message);
                }
            } catch (error) {
                console.error('Error submitting contact form:', error);
                showToast("error", languageTranslatorUtil(language,"toastMessages","staticErrors","failedSendMsg"));
            }
        }
    };

    // // Input field class based on error state
    // const getInputClass = (fieldName) => {
    //     return `w-full p-3 border rounded outline-none placeholder:font-roboto placeholder:font-normal placeholder:text-[15px] placeholder:leading-[100%] placeholder:tracking-[0px] placeholder-align-middle placeholder:text-dark-gray/50 ${
    //         touched[fieldName] && errors[fieldName]
    //             ? 'border-red-500 focus:border-red-500'
    //             : 'border-gray-300 focus:border-user-orange'
    //     }`;
    // };

    // // Consistent styling for form elements
    // const labelClass = "block mb-2 font-medium text-[15px] leading-[20px] tracking-[-0.15px] font-roboto text-dark-gray";
    // const formGroupClass = "mb-1";
    // const errorClass = "text-sm text-red-600 h-5"; // Fixed height for error messages

    return (
        <div className="w-full  gap-[10px] rounded-[16px] p-8 sm:p-10 md:p-[48px] bg-white shadow-[0.9px_4.5px_45px_0px_#54637A1A]">
            <div className="mb-6 md:mb-8">
                <h2 className="font-medium font-roboto text-2xl sm:text-[28px] md:text-[32px] leading-[100%] tracking-[0%] capitalize text-black">
                 
                    {languageTranslatorUtil(language,"ms_values","leaveYour")} <span className="text-user-orange">{languageTranslatorUtil(language,"ms_values","message")}</span>
                </h2>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                    {/* First Name */}
                    <div className="mb-1">
                        <CustomInput
                            id="firstName"
                            name="firstName"
                            label={languageTranslatorUtil(language,"contact_us_page","formLabels","firstName")}
                            placeholder={languageTranslatorUtil(language,"contact_us_page","formPlaceholders","enterFirstName")}
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            onBlur={() => handleBlur("firstName", formData.firstName)}
                            onFocus={() => clearError("firstName")}
                            error={touched.firstName && errors.firstName}
                            disabled={isSubmittingContactForm}
                            labelStyle="font-medium text-[15px] leading-[20px] tracking-[-0.15px] font-roboto text-dark-gray"
                            inputStyle="w-full p-3 border rounded outline-none placeholder:font-roboto placeholder:font-normal placeholder:text-[15px] placeholder:leading-[100%] placeholder:tracking-[0px] placeholder-align-middle placeholder:text-dark-gray/50"
                            className="focus:border-user-orange"
                            outerContainerStyle=""
                            isForm={false}
                        />
                    </div>

                    {/* Last Name */}
                    <div className="mb-1">
                        <CustomInput
                            id="lastName"
                            name="lastName"
                            label={languageTranslatorUtil(language,"contact_us_page","formLabels","lastName")}
                            placeholder={languageTranslatorUtil(language,"contact_us_page","formPlaceholders","enterLastName")}
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            onBlur={() => handleBlur("lastName", formData.lastName)}
                            onFocus={() => clearError("lastName")}
                            error={touched.lastName && errors.lastName}
                            disabled={isSubmittingContactForm}
                            labelStyle="font-medium text-[15px] leading-[20px] tracking-[-0.15px] font-roboto text-dark-gray"
                            inputStyle="w-full p-3 border rounded outline-none placeholder:font-roboto placeholder:font-normal placeholder:text-[15px] placeholder:leading-[100%] placeholder:tracking-[0px] placeholder-align-middle placeholder:text-dark-gray/50"
                            className="focus:border-user-orange"
                            outerContainerStyle=""
                            isForm={false}
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="mb-1">
                    <CustomInput
                        id="email"
                        name="email"
                        label={languageTranslatorUtil(language,"contact_us_page","formLabels","email")}
                        placeholder={isAuthenticated ? userEmail : languageTranslatorUtil(language,"contact_us_page","formPlaceholders","enterEmail")}
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        onBlur={() => handleBlur("email", formData.email)}
                        onFocus={() => clearError("email")}
                        error={touched.email && errors.email}
                        disabled={isAuthenticated || isSubmittingContactForm}
                        labelStyle="font-medium text-[15px] leading-[20px] tracking-[-0.15px] font-roboto text-dark-gray"
                        inputStyle="w-full p-3 border rounded outline-none placeholder:font-roboto placeholder:font-normal placeholder:text-[15px] placeholder:leading-[100%] placeholder:tracking-[0px] placeholder-align-middle placeholder:text-dark-gray/50"
                        className="focus:border-user-orange"
                        outerContainerStyle=""
                        isForm={false}
                    />
                </div>

                {/* Subject */}
                <div className="mb-1">
                    <CustomInput
                        id="subject"
                        name="subject"
                        label={languageTranslatorUtil(language,"contact_us_page","formLabels","subject")}
                        placeholder={languageTranslatorUtil(language,"contact_us_page","formPlaceholders","enterSubject")}
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        onBlur={() => handleBlur("subject", formData.subject)}
                        onFocus={() => clearError("subject")}
                        error={touched.subject && errors.subject}
                        disabled={isSubmittingContactForm}
                        labelStyle="font-medium text-[15px] leading-[20px] tracking-[-0.15px] font-roboto text-dark-gray"
                        inputStyle="w-full p-3 border rounded outline-none placeholder:font-roboto placeholder:font-normal placeholder:text-[15px] placeholder:leading-[100%] placeholder:tracking-[0px] placeholder-align-middle placeholder:text-dark-gray/50"
                        className="focus:border-user-orange"
                        outerContainerStyle=""
                        isForm={false}
                    />
                </div>

                {/* Message */}
                <div className="mb-1">
                    <CustomInput
                        id="message"
                        name="message"
                        label={languageTranslatorUtil(language,"contact_us_page","formLabels","message")}
                        placeholder={languageTranslatorUtil(language,"contact_us_page","formPlaceholders","enterMessage")}
                        type="textarea"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        onBlur={() => handleBlur("message", formData.message)}
                        onFocus={() => clearError("message")}
                        error={touched.message && errors.message}
                        disabled={isSubmittingContactForm}
                        labelStyle="font-medium text-[15px] leading-[20px] tracking-[-0.15px] font-roboto text-dark-gray"
                        inputStyle="w-full min-h-[150px] p-3 border rounded outline-none placeholder:font-roboto placeholder:font-normal placeholder:text-[15px] placeholder:leading-[100%] placeholder:tracking-[0px] placeholder-align-middle placeholder:text-dark-gray/50"
                        className="focus:border-user-orange"
                        outerContainerStyle=""
                        isForm={false}
                    />
                </div>

                {/* CustomButton for submission */}
                <div className="mt-6 md:mt-8">
                    <CustomButton
                        type="submit"
                        buttonText={languageTranslatorUtil(language,"contact_us_page","sendMessageButton")}
                        bgColor="bg-user-orange"
                        height="h-12"
                        textColor="text-white"
                        textWeight="font-semibold"
                        className="w-full hover:bg-orange-600 font-roboto rounded-[5px]"     
                        loading={isSubmittingContactForm}
                        disabled={isSubmittingContactForm}
                        onClick={handleSubmit}
                    />
                </div>
            </form>
        </div>
    );
}

export default ContactForm;