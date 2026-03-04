import { useState, useEffect } from 'react';
import showToast from "../../utils/toastNotifications";
import CustomButton from './CustomButton';
import useForm from "../../hooks/useForm";
import {COMMON_FIELD_TYPES} from "../../constants/fieldTypes";
import { languageTranslatorUtil } from '../utils/languageTranslatorUtil';

const ContactForm = () => {
    // Authentication state
    const isAuthenticated = false; // Hardcoded example value
    const userEmail = "user@example.com"; // Hardcoded email for authenticated user

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
            email: isAuthenticated ? userEmail : '',
            subject: '',
            message: ''
        },
        {
            firstName: true,
            lastName: true,
            email: true,
            message: true
        },
        {
            firstName: COMMON_FIELD_TYPES.REQUIRED_FIELD,
            lastName: COMMON_FIELD_TYPES.REQUIRED_FIELD,
            email: COMMON_FIELD_TYPES.EMAIL_FIELD,
            subject: COMMON_FIELD_TYPES.REQUIRED_FIELD,
            message: COMMON_FIELD_TYPES.REQUIRED_FIELD
        }
    );

    // Add loading state
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Set email if user is authenticated
    useEffect(() => {
        if (isAuthenticated) {
            setFormData(prev => ({
                ...prev,
                email: userEmail
            }));
        }
    }, [isAuthenticated, setFormData, userEmail]);

    // Form submission
    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        // Mark all fields as touched to show validation errors
        setTouched({
            firstName: true,
            lastName: true,
            email: true,
            subject: true,
            message: true
        });

        const isValid = validateForm();

        if (isValid) {
            setIsSubmitting(true);

            try {
                // Simulate API call with timeout
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Here you would typically send the form data to your backend
                console.log('Form submitted:', formData);

                // Reset form after successful submission
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: isAuthenticated ? userEmail : '',
                    subject: '',
                    message: ''
                });

                showToast("success", "Message Sent Successfully");
            } catch (error) {
                console.error('Error submitting form:', error);
                showToast("error", languageTranslatorUtil(language,"toastMessages","staticErrors","failedSendMsg"));
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    // Input field class based on error state
    const getInputClass = (fieldName) => {
        return `w-full p-3 border rounded outline-none placeholder:font-normal placeholder:text-[15px] placeholder:leading-[100%] placeholder:tracking-[0px] placeholder-align-middle placeholder:text-dark-gray/50 ${
            touched[fieldName] && errors[fieldName]
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 focus:border-user-orange'
        }`;
    };

    // Consistent styling for form elements
    const labelClass = "block mb-2 font-medium text-[15px] leading-[20px] tracking-[-0.15px] font-sf_pro text-dark-gray";
    const formGroupClass = "mb-1";
    const errorClass = "text-sm text-red-600 h-5"; // Fixed height for error messages

    return (
        <div className="w-full max-w-2xl mx-auto gap-[10px] rounded-[16px] p-8 sm:p-10 md:p-[48px] bg-white shadow-[0.9px_4.5px_45px_0px_#54637A1A]">
            <div className="mb-6 md:mb-8">
                <h2 className="font-medium text-2xl sm:text-[28px] md:text-[32px] leading-[100%] tracking-[0%] capitalize font-sf_pro text-black">
                    Leave Your <span className="text-user-orange">Message</span>
                </h2>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                    {/* First Name */}
                    <div className={formGroupClass}>
                        <label htmlFor="firstName" className={labelClass}>
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            onBlur={() => handleBlur("firstName", formData.firstName)}
                            onFocus={() => clearError("firstName")}
                            placeholder="Enter your First Name"
                            className={getInputClass('firstName')}
                            disabled={isSubmitting}
                        />
                        <div className={errorClass}>
                            {touched.firstName && errors.firstName}
                        </div>
                    </div>

                    {/* Last Name */}
                    <div className={formGroupClass}>
                        <label htmlFor="lastName" className={labelClass}>
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            onBlur={() => handleBlur("lastName", formData.lastName)}
                            onFocus={() => clearError("lastName")}
                            placeholder="Enter your Last Name"
                            className={getInputClass('lastName')}
                            disabled={isSubmitting}
                        />
                        <div className={errorClass}>
                            {touched.lastName && errors.lastName}
                        </div>
                    </div>
                </div>

                {/* Email */}
                <div className={formGroupClass}>
                    <label htmlFor="email" className={labelClass}>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        onBlur={() => handleBlur("email", formData.email)}
                        onFocus={() => clearError("email")}
                        placeholder="Enter your Email"
                        className={getInputClass('email')}
                        readOnly={isAuthenticated}
                        disabled={isAuthenticated || isSubmitting}
                    />
                    <div className={errorClass}>
                        {touched.email && errors.email}
                    </div>
                </div>

                {/* Subject */}
                <div className={formGroupClass}>
                    <label htmlFor="subject" className={labelClass}>
                        Subject
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        onBlur={() => handleBlur("subject", formData.subject)}
                        onFocus={() => clearError("subject")}
                        placeholder="Enter your Subject of the Message"
                        className={getInputClass('subject')}
                        disabled={isSubmitting}
                    />
                    <div className={errorClass}>
                        {touched.subject && errors.subject}
                    </div>
                </div>

                {/* Message */}
                <div className={formGroupClass}>
                    <label htmlFor="message" className={labelClass}>
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        onBlur={() => handleBlur("message", formData.message)}
                        onFocus={() => clearError("message")}
                        placeholder="Enter your Message Here.."
                        rows="6"
                        className={getInputClass('message')}
                        disabled={isSubmitting}
                    ></textarea>
                    <div className={errorClass}>
                        {touched.message && errors.message}
                    </div>
                </div>

                {/* CustomButton for submission */}
                <div className="mt-6 md:mt-8">
                    <CustomButton
                        type="submit"
                        buttonText="Send Message"
                        bgColor="bg-user-orange"
                        height="h-12"
                        textColor="text-white"
                        textWeight="font-semibold"
                        className="w-full hover:bg-orange-600 rounded-[5px]"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                    />
                </div>
            </form>
        </div>
    );
}

export default ContactForm;