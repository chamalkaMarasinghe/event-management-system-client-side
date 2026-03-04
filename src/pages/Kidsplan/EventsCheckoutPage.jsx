import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import CustomButton from "../../components/Base/CustomButton";
import {
  PAYMENT_METHODS,
  paymentMethod,
  SCHEDULING_TYPES,
} from "../../constants/commonConstants";
import { bookEvent, getEventById } from "../../store/thunks/eventThunks";
import { useThunk } from "../../hooks/useThunk";
import showToast from "../../utils/toastNotifications";
import { capitalize, currencyFormatter } from "../../utils/formatting";
import {
  format_MM_DD_YYYY,
  formatHH_MM_SS,
  formatYYYY_MM_DD_HH_MM_A,
  getDayOfWeek,
} from "../../utils/dateFormating";
import { useDispatch, useSelector } from "react-redux";
import { openSignInModal, createPaymentCheckout, createSubscriptionCheckout, createSubscriptionCheckoutWithP24 } from "../../store";
import { useLocale } from "antd/es/locale";

import { Tooltip } from "antd";
import { CONFIGURATIONS } from "../../config/envConfig";
import { useConfirmation } from "../../hooks/useConfirmation";
import { ConfirmationModal } from "../../components/Model/ConfirmationModel";
import { languageTranslatorUtil } from "../../utils/languageTranslatorUtil";
import { useLanguage } from "../../context/language/language";
import {PaymentDetailsSkeleton,PaymentMethodSkeleton} from "../../components/skeletons/CheckoutSkeleton.jsx"
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

const EventsCheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
  const authenticatedUser = useSelector((state) => state?.auth?.user);
  const eventId = params?.eventId;
  const isPayNow = searchParams.get("paynow") === 'true';
  const {language} = useLanguage();

  const [eventData, setEventData] = useState({});
  const [nextRecurringEvent, setNextRecurringEvent] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [schedulingType, setSchedulingType] = useState(
    eventData?.schedulingType || SCHEDULING_TYPES.RECURRING
  ); // ONETIME or SUBSCRIPTION
  const [paymentType, setPaymentType] = useState(
    eventData?.paymentMethod?.[0] !== PAYMENT_METHODS.SUBSCRIPTION ? eventData?.paymentMethod?.[0] : eventData?.paymentMethod?.[1] !== PAYMENT_METHODS?.SUBSCRIPTION ? eventData?.paymentMethod?.[1] : eventData?.paymentMethod?.[2]
  ); // For subscription vs one-time
  const [paymentTypeReccuring, setPaymentTypeReccuring] = useState(isPayNow ? PAYMENT_METHODS.SUBSCRIPTION : eventData?.paymentMethod?.[0]); // For subscription vs one-time
  const [subscriptionPaymentMethod, setSubscriptionPaymentMethod] = useState(isPayNow ? paymentMethod.PREZELWAY_24 : paymentMethod.CREDIT_CARD);
  // const [paymentMethod, setPaymentMethod] = useState(''); // For subscription payment method
  // const schedulingType = eventData?.schedulingType || SCHEDULING_TYPES.SUBSCRIPTION; // ONETIME or SUBSCRIPTION
console.log(isPayNow);

  const {
    requestConfirmation,
    confirmation,
    confirm,
    cancel,
  } = useConfirmation();

  // STATE: Thuns defining >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [doGetEvent, isGettingEvent, getEventError] = useThunk(getEventById);
  const [doBookEvent, isBookingEvent, errorBookingEvent] = useThunk(bookEvent);
  const [doCreatePaymentCheckout, isCreatePaymentCheckout, errorCreatePaymentCheckout] = useThunk(createPaymentCheckout);
  const [doCreateSubscriptionCheckout, isCreateSubscriptionCheckout, errorCreateSubscriptionCheckout] = useThunk(createSubscriptionCheckout);
  const [doCreateSubscriptionCheckoutWithP24, isCreateSubscriptionCheckoutWithP24, errorCreateSubscriptionCheckoutWithP24] = useThunk(createSubscriptionCheckoutWithP24);

  const stripeKey = CONFIGURATIONS.REACT_APP_STRIPE_API_KEY;

  if (!stripeKey) {
    console.error(
      "Stripe API key is missing. Please check your environment variables."
    );
  }
  const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

  // STATE: side effects >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // Helper function to handle truncate text
  const truncateText = (text, maxLength = 50) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // Book Now handler
  // Confirmation options
  // const confirmationOptions = {
  //   type: "accept",
  //   title: "Confirm Booking",
  //   message: `Are you sure you want to book "${eventData?.name || 'this event'}"?`,
  //   confirmText: "Yes, Book Now",
  //   cancelText: "Cancel",
  // };

  // const handleBookNowClick = async () => {
  //   const confirmed = await requestConfirmation(confirmationOptions);
  //   if (confirmed) {
  //     await handlePayment();
  //   }
  // };

  useEffect(() => {
    const fetchEventData = async () => {
      const result = await doGetEvent({
        eventId: eventId,
        clientRoute: location?.pathname,
      });
      if (result.success) {
        const event = result.response.data || [];
        setEventData(event); // NOTE: null testing
        setSchedulingType(event?.schedulingType);

        // Set default payment type to subcription if available
        // if (event?.paymentMethod?.includes(PAYMENT_METHODS.SUBSCRIPTION)) {
        setPaymentTypeReccuring(isPayNow ? PAYMENT_METHODS.SUBSCRIPTION : event?.paymentMethod?.[0]);
        setPaymentType(event?.paymentMethod?.[0] !== PAYMENT_METHODS.SUBSCRIPTION ? event?.paymentMethod?.[0] : event?.paymentMethod?.[1] !== PAYMENT_METHODS?.SUBSCRIPTION ? event?.paymentMethod?.[1] : event?.paymentMethod?.[2]);
      } else {
        showToast("error", result?.error?.message || languageTranslatorUtil(language,"toastMessages","staticErrors","errorOccurred"));
      }
    };
    fetchEventData();
  }, [doGetEvent, eventId]);

  useEffect(() => {
    if (Object?.values(eventData)?.length > 0 && eventData?.schedulingType === SCHEDULING_TYPES.RECURRING) {

      let subEndDate = null;

      for(let recurringDate of eventData?.recurringEventsDates){
        for(let participant of recurringDate?.participants){
          if(authenticatedUser?._id?.toString() === participant?.user?.toString()){
            subEndDate = participant?.subscriptionEndDate;
          }
        }
      }
      
      if(subEndDate){
        // NOTE: Find first upcoming recurring event date
        // const indexToUpdate = eventData?.recurringEventsDates?.findIndex(
        //   (rec) => new Date(rec?.start) >= new Date() && new Date(rec?.start) >= new Date(subEndDate)
        // );
        // setNextRecurringEvent(eventData?.recurringEventsDates[indexToUpdate]);
        setNextRecurringEvent({start: dayjs(subEndDate).format("YYYY-MM-DD")});
      }else {
        // NOTE: Find first upcoming recurring event date
        // const indexToUpdate = eventData?.recurringEventsDates?.findIndex(
        //   (rec) => new Date(rec?.start) >= new Date()
        // );
        // setNextRecurringEvent(eventData?.recurringEventsDates[indexToUpdate]);
        setNextRecurringEvent({start: dayjs().add(1, "month").format("YYYY-MM-DD")})
      }
    }
  }, [eventData]);


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const status = urlParams.get("status");
    const event = urlParams.get("event")

    if (status === "success") {
      showToast(
        "success",
        languageTranslatorUtil(language,"toastMessages","staticSuccessMsgs","eventBookedSuccess") 
      );

      const timer = setTimeout(() => {
        navigate(`/events/${event}/checkout`, { replace: true });
      }, 3000);

      return () => clearTimeout(timer);
    } 
    else if (status === "error") {
      console.log("fjfjjffjfj")
      const errorMessage =
        urlParams.get("message") ||
        languageTranslatorUtil(language,"toastMessages","staticErrors","failedBookEvent");
      console.log("errorMessage", errorMessage)
      showToast("error", decodeURIComponent(errorMessage));

      // navigate(`/events/${eventData?._id}/checkout`, { replace: true });
    }
  }, [location.search, navigate]);

  // FUNCTIONS: helper function >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const handlePayment = async () => {
    if (!isAuthenticated) {
      dispatch(openSignInModal());
    } else {
      // NOTE: Call the booking function with the event data
      if (Object?.values(eventData)?.length > 0) {
        if (eventData?.paymentMethod?.includes(PAYMENT_METHODS.SUBSCRIPTION) && paymentTypeReccuring === PAYMENT_METHODS.SUBSCRIPTION) {
          if(subscriptionPaymentMethod === paymentMethod.CREDIT_CARD){
            
            const subscriptionResult = await doCreateSubscriptionCheckout({ eventId });
            let sessionId;
            if (subscriptionResult?.success || subscriptionResult?.response?.sessionId) {
              const stripe = await stripePromise;

              sessionId = subscriptionResult?.response.sessionId;

              if (!stripe) {
                throw new Error("Stripe failed to initialize");
              }

              const result = await stripe.redirectToCheckout({
                sessionId: sessionId,
              });

              if (result.error) {
                throw new Error(
                  result.error.message || "Failed to redirect to Stripe Checkout"
                );
              }

            } else {
              showToast("error", subscriptionResult?.error?.message || languageTranslatorUtil(language,"toastMessages","staticErrors","stripeCheckoutFailure"));
            }
          }else if (subscriptionPaymentMethod === paymentMethod.PREZELWAY_24){

            const subscriptionResult = await doCreateSubscriptionCheckoutWithP24({ eventId });
            let sessionId;

            if (subscriptionResult?.success || subscriptionResult?.response?.sessionId) {
              const stripe = await stripePromise;

              sessionId = subscriptionResult?.response.sessionId;

              if (!stripe) {
                throw new Error("Stripe failed to initialize");
              }

              const result = await stripe.redirectToCheckout({
                sessionId: sessionId,
              });

              if (result.error) {
                throw new Error(
                  result.error.message || "Failed to redirect to Stripe Checkout"
                );
              }

            } else {
              showToast("error", subscriptionResult?.error?.message || languageTranslatorUtil(language,"toastMessages","staticErrors","stripeCheckoutFailure"));
            }
          }
        }else{
          if (paymentType === PAYMENT_METHODS.ONLINE) {
            const checkoutResult = await doCreatePaymentCheckout({ eventId });            
            let sessionId;

            if (checkoutResult?.success && checkoutResult?.response.sessionId) {
              const stripe = await stripePromise;

              sessionId = checkoutResult?.response.sessionId;

              if (!stripe) {
                throw new Error("Stripe failed to initialize");
              }

              const result = await stripe.redirectToCheckout({
                sessionId: sessionId,
              });

              if (result.error) {
                throw new Error(
                  result.error.message || "Failed to redirect to Stripe Checkout"
                );
              }

            } else {
              showToast("error", checkoutResult?.error?.message || languageTranslatorUtil(language,"toastMessages","staticErrors","stripeCheckoutFailure"));
            }
          } else if (paymentType === PAYMENT_METHODS.INHOUSE) {
            const result = await doBookEvent({
              eventId: eventData?._id || "E1003",
            });

            if (result?.error) {
              showToast("error", result.error.message || languageTranslatorUtil(language,"toastMessages","staticErrors","failedBookEvent"));
              return;
            }
            navigate(result?.response?.data)            
            showToast("success", languageTranslatorUtil(language,"toastMessages","staticSuccessMsgs","eventBookedSuccess"));
          }
        }
      }
    }
  };

  const handleCancel = () => {
    // navigate("/payment-unsuccessful");
    navigate(-1);
  };


  if(isGettingEvent ){
    return( 
      <>
        <PaymentDetailsSkeleton/>
        <PaymentMethodSkeleton/>
      </>
    );
  }
  // NOTE: Subscription event layout
  else if (eventData?.paymentMethod?.includes(PAYMENT_METHODS.SUBSCRIPTION)) {
    return (
      <>
        {/* Add custom CSS for 850px breakpoint */}
        <style jsx>{`
          @media (max-width: 849px) {
            .responsive-850 {
              flex-direction: column;
              gap: 0.25rem;
              text-align: center;
            }
            .responsive-850 .badge-center {
              align-self: center;
            }
          }
          @media (min-width: 850px) {
            .responsive-850 {
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              gap: 0;
              text-align: left;
            }
            .responsive-850 .badge-center {
              align-self: auto;
            }
          }
        `}</style>
        <div className="flex flex-col flex-grow w-full max-w-[936px] mx-auto px-5 sm:px-8 md:px-16 lg:px-0 mb-16 md:mb-20">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row gap-2 font-roboto font-medium text-level-2 custom-w-br-360:text-level-1 leading-[100%] tracking-normal">
              {
              (language === "ENGLISH") ?
              <>
               <p className="text-primary-text">{languageTranslatorUtil(language,"ms_values","events")}</p>
              <p className="text-primary">
                {languageTranslatorUtil(language,"ms_values","checkout")}
              </p>

              </> 
              :

              <>
               <p className="text-primary-text">{languageTranslatorUtil(language,"ms_values","checkout")}</p>
              <p className="text-primary">
                {languageTranslatorUtil(language,"ms_values","events")}
              </p>
              
              </>
              
            }
            </div>
          </div>
          <div className="flex flex-col flex-grow w-full mb-6 sm:mb-8 rounded-xl p-4 sm:p-6 md:p-13 lg:p-16 bg-white shadow-md">
            {/* Event Header */}
            <div className="mb-6 sm:mb-10 w-full max-w-[808px]">
              <div className="flex responsive-850 mb-3">
                <h1 className="text-[16px] sm:text-[20px] lg:text-[30px] font-medium text-black font-roboto max-w-[70%]">
                  {eventData?.name || "Event Name"}
                </h1>
                <span className="text-[16px] sm:text-[20px] lg:text-[25px] font-semibold text-user-orange font-roboto">
                  {currencyFormatter.format(eventData?.price || 0.0)}
                </span>
              </div>
              <div className="flex responsive-850 text-[16px] md:text-[18px] font-roboto">
                <span className="text-dark-black font-medium">{languageTranslatorUtil(language,"ms_values","hostedByLabel2")+":"}</span>
                <span className="text-[#1B1A1A99] font-medium">
                  {`${eventData?.organizer?.firstName || ""} ${eventData?.organizer?.lastName || ""
                    }`.trim().length > 0
                    ? `${eventData?.organizer?.firstName} ${eventData?.organizer?.lastName}`
                    : "Host Name"}
                </span>
              </div>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 gap-[10px] mb-6 sm:mb-6 bg-[#FAFAFA] p-[18px] sm:p-6 rounded-lg">
              {/* Event Type */}
              <div className="flex responsive-850">
                <span className="text-light-gray text-[14px] sm:text-[16px] lg:text-[18px] font-medium font-roboto">
                  {languageTranslatorUtil(language,"checkout_page_subscription_events","eventTypeLabel")}
                </span>
                <span className="bg-[#FFF7ED] text-user-orange px-3 py-1 rounded-[4px] text-[14px] font-roboto font-medium badge-center">
                  {languageTranslatorUtil(language,"common_stringTemplates","eventTypes",eventData?.eventType) || "Event Type"}
                </span>
              </div>

              {/* Category */}
              <div className="flex responsive-850 font-roboto text-[14px] sm:text-[16px] lg:text-[18px]">
                <span className="text-light-gray font-medium">{languageTranslatorUtil(language,"checkout_page_subscription_events","categoryLabel")}</span>
                <span className="text-[#1B1A1A99] font-normal">
                  {languageTranslatorUtil(language,"common_stringTemplates","dropdown",eventData?.category)|| "Event Category"}
                </span>
              </div>

              {/* Event Frequency */}
              <div className="flex responsive-850 font-roboto text-[14px] sm:text-[16px] lg:text-[18px]">
                <span className="text-light-gray font-medium">
                  {languageTranslatorUtil(language,"checkout_page_subscription_events","eventFrequencyLabel")}
                </span>
                <span className="text-[#1B1A1A99] font-normal">
                  {eventData?.eventStartDate
                    ? `${languageTranslatorUtil(language, "ms_values", "occursEvery")} ${languageTranslatorUtil(language,"common_stringTemplates","daysOfWeek",getDayOfWeek(eventData?.eventStartDate))}`
                    : languageTranslatorUtil(language,"ms_values","day")}
                </span>
              </div>

              {/* Location */}
              <div className="flex responsive-850 font-roboto text-[14px] sm:text-[16px] lg:text-[18px]">
                <span className="text-light-gray font-medium">{languageTranslatorUtil(language,"common_stringTemplates","locationLabel")}</span>
                <Tooltip
                  title={eventData?.eventLocations?.[0]?.address || languageTranslatorUtil(language,"common_stringTemplates","locationLabel")}
                  placement="top"
                  overlayStyle={{ maxWidth: "300px" }}
                >
                  <span className="text-[#1B1A1A99] font-normal break-words cursor-help">
                    {truncateText(
                      eventData?.eventLocations?.[0]?.address,
                      50
                    ) ||  languageTranslatorUtil(language,"common_stringTemplates","locationLabel")}
                  </span>
                </Tooltip>
              </div>
            </div>

            {/* Payment Type Selection - Excluding inhouse method for recurring type events */}
            <div className="mb-6 sm:mb-10">
              <h3 className="text-[16px] sm:text-[18px] font-medium text-dark-black font-roboto mb-4 responsive-850">
                {languageTranslatorUtil(language,"checkout_page_subscription_events","paymentOptionTitle")}
              </h3>
              <div className="space-y-3">
                {/* Subscription Payment Option - Subscription payment method */}
                {eventData?.paymentMethod?.includes(
                  PAYMENT_METHODS.SUBSCRIPTION
                ) && (
                    <div
                      className={`border border-[#CBD5E0] rounded-lg ${paymentTypeReccuring === PAYMENT_METHODS.SUBSCRIPTION
                        ? "bg-[#FFF7ED] border-[#FEBE99]"
                        : "bg-white"
                        }`}
                    >
                      <label
                        htmlFor="SUBSCRIPTION_BASED"
                        className="flex items-center p-3 cursor-pointer"
                      >
                        <div className="grid place-items-center mr-[8px]">
                          <input
                            type="radio"
                            id="SUBSCRIPTION_BASED"
                            name="paymentType"
                            value={PAYMENT_METHODS.SUBSCRIPTION}
                            checked={paymentTypeReccuring === PAYMENT_METHODS.SUBSCRIPTION}
                            onChange={(e) => setPaymentTypeReccuring(e.target.value)}
                            className="col-start-1 row-start-1 appearance-none shrink-0 w-4 h-4 border-2 border-user-orange rounded-full"
                          />
                          {paymentTypeReccuring === PAYMENT_METHODS.SUBSCRIPTION && (
                            <div className="col-start-1 row-start-1 w-2 h-2 rounded-full bg-user-orange" />
                          )}
                        </div>
                        <span className="text-dark-black font-normal text-[14px] font-roboto ">
                          {languageTranslatorUtil(language,"checkout_page_subscription_events","subscriptionOption")}
                        </span>
                      </label>

                      {/* Subscription Details */}
                      {paymentTypeReccuring === PAYMENT_METHODS.SUBSCRIPTION && (
                        <div className="mx-3 pb-3 gap-[10px] border-t-[1px] border-[#CBD5E0]">
                          <div className="text-center mb-9">
                            <h3 className="text-[18px] sm:text-[24px] font-normal text-light-black font-roboto mt-6 mb-3">
                              {languageTranslatorUtil(language,"checkout_page_subscription_events","subscriptionInfoLine1")}
                            </h3>
                            <p className="text-[11px] sm:text-[14px] font-normal text-light-gray font-roboto leading-[22px] tracking-[-0.6%] mb-6">
                             {languageTranslatorUtil(language,"checkout_page_subscription_events","subscriptionInfoLine2")}
                            </p>
                            <div className="text-[30px] sm:text-[36px] font-normal font-roboto bg-gradient-to-r from-[#F65F18] to-[#F49867] text-transparent bg-clip-text">
                              {currencyFormatter.format(eventData?.pricePerMonth || 0.0)}
                            </div>
                          </div>

                          <div className="flex justify-center mb-10">
                            <div className="w-full max-w-[400px] space-y-3">
                              <div className="flex justify-between items-center text-[14px] sm:text-[16px] font-roboto">
                                <span className="text-dark-gray font-medium">
                                  {languageTranslatorUtil(language,"checkout_page_subscription_events","startDateLabel")}
                                </span>
                                <span className="text-[#1B1A1A99] font-normal">
                                  {format_MM_DD_YYYY(eventData?.eventStartDate) ||
                                    "Date"}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-[14px] sm:text-[16px] font-roboto">
                                <span className="text-dark-gray font-medium">
                                  {languageTranslatorUtil(language,"checkout_page_subscription_events","endDateLabel")}
                                </span>
                                <span className="text-[#1B1A1A99] font-normal">
                                  {format_MM_DD_YYYY(eventData?.eventEndDate) ||
                                    "Date"}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-[14px] sm:text-[16px] font-roboto">
                                <span className="text-dark-gray font-medium">
                                  {languageTranslatorUtil(language,"common_stringTemplates","eventTimeLabel")}
                                </span>
                                <span className="text-[#1B1A1A99] font-normal">
                                  {` ${formatHH_MM_SS(
                                    eventData?.startingTime || ""
                                  ) || "Time"
                                    } - ${formatHH_MM_SS(
                                      eventData?.endingTime || ""
                                    ) || "Time"
                                    } `}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-[14px] sm:text-[16px] font-roboto">
                                <span className="text-dark-gray font-medium">
                                  {languageTranslatorUtil(language,"checkout_page_subscription_events","nextPaymentDueDateLabel")}
                                </span>
                                <span className="text-dark-black font-medium">
                                  {format_MM_DD_YYYY(nextRecurringEvent?.start) ||
                                    "Date"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <p className="text-[11px] sm:text-[14px] font-medium text-light-gray font-roboto text-center leading-[22px] tracking-[-0.6%]">
                           {languageTranslatorUtil(language,"checkout_page_subscription_events","autoRenewalNote")}
                          </p>
                          <div className="flex justify-center items-center w-full">
                            <div className="">
                              <label
                                htmlFor="payWithCard"
                                className="flex items-center p-3 cursor-pointer"
                              >
                                <div className="grid place-items-center mr-[8px]">
                                  <input
                                    type="radio"
                                    id="payWithCard"
                                    name="subscriptionPaymentType"
                                    value={paymentMethod.CREDIT_CARD}
                                    checked={subscriptionPaymentMethod === paymentMethod.CREDIT_CARD}
                                    onChange={(e) => setSubscriptionPaymentMethod(e.target.value)}
                                    className="col-start-1 row-start-1 appearance-none shrink-0 w-4 h-4 border-2 border-user-orange rounded-full"
                                    disabled={isPayNow ? true : false}
                                  />
                                  {(subscriptionPaymentMethod === paymentMethod.CREDIT_CARD) && (
                                    <div className="col-start-1 row-start-1 w-2 h-2 rounded-full bg-user-orange" />
                                  )}
                                </div>
                                <span className={twMerge("font-normal text-[14px] font-roboto", isPayNow ? "text-gray-500 cursor-not-allowed" : "text-dark-black cursor-pointer")}>
                                   {languageTranslatorUtil(language,"ms_values","cardPayment") }     
                                </span>
                              </label>
                            </div>
                            <div className="">
                              <label
                                htmlFor="payWithPrezelway24"
                                className="flex items-center p-3 cursor-pointer"
                              >
                                <div className="grid place-items-center mr-[8px]">
                                  <input
                                    type="radio"
                                    id="payWithPrezelway24"
                                    name="subscriptionPaymentType"
                                    value={paymentMethod.PREZELWAY_24}
                                    checked={subscriptionPaymentMethod === paymentMethod.PREZELWAY_24}
                                    onChange={(e) => setSubscriptionPaymentMethod(e.target.value)}
                                    className="col-start-1 row-start-1 appearance-none shrink-0 w-4 h-4 border-2 border-user-orange rounded-full"
                                  />
                                  {(subscriptionPaymentMethod === paymentMethod.PREZELWAY_24) && (
                                    <div className="col-start-1 row-start-1 w-2 h-2 rounded-full bg-user-orange" />
                                  )}
                                </div>
                                <span className="text-dark-black font-normal text-[14px] font-roboto">
                                  {languageTranslatorUtil(language,"ms_values","preezlePayment")}
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                {/* Pay Only for one Event Option - ONLINE payment method */}
                {(eventData?.paymentMethod?.includes(PAYMENT_METHODS.ONLINE) || eventData?.paymentMethod?.includes(PAYMENT_METHODS.INHOUSE)) && !isPayNow && (
                  <div
                    className={`border border-[#CBD5E0] rounded-lg ${(paymentTypeReccuring === PAYMENT_METHODS.ONLINE || paymentTypeReccuring === PAYMENT_METHODS.INHOUSE)
                      ? "bg-[#FFF7ED] border-[#FEBE99]"
                      : "bg-white"
                      }`}
                  >
                    <label
                      htmlFor="PAY_FOR_ONLY_ONE"
                      className="flex items-center p-3 cursor-pointer"
                    >
                      <div className="grid place-items-center mr-[8px]">
                        <input
                          type="radio"
                          id="PAY_FOR_ONLY_ONE"
                          name="paymentType"
                          value={PAYMENT_METHODS.ONLINE}
                          checked={paymentTypeReccuring === PAYMENT_METHODS.ONLINE || paymentTypeReccuring === PAYMENT_METHODS.INHOUSE}
                          onChange={(e) => setPaymentTypeReccuring(e.target.value)}
                          className="col-start-1 row-start-1 appearance-none shrink-0 w-4 h-4 border-2 border-user-orange rounded-full"
                        />
                        {(paymentTypeReccuring === PAYMENT_METHODS.ONLINE || paymentTypeReccuring === PAYMENT_METHODS.INHOUSE) && (
                          <div className="col-start-1 row-start-1 w-2 h-2 rounded-full bg-user-orange" />
                        )}
                      </div>
                      <span className="text-dark-black font-normal text-[14px] font-roboto">
                        {languageTranslatorUtil(language,"checkout_page_subscription_events","singleEventOption")}
                      </span>
                    </label>

                    {/* One-time Payment Details */}
                    {(paymentTypeReccuring === PAYMENT_METHODS.ONLINE || paymentTypeReccuring === PAYMENT_METHODS.INHOUSE) && (
                      <div className="mx-3 pb-3 gap-[10px] border-t-[1px] border-[#CBD5E0]">
                        <div className="text-center mb-9">
                          <h3 className="text-[18px] sm:text-[24px] font-normal text-light-black font-roboto mt-6 mb-3">
                            {languageTranslatorUtil(language,"checkout_page_subscription_events","oneTimePaymentTitle")}
                          </h3>
                          <p className="text-[11px] sm:text-[14px] font-normal text-light-gray font-roboto leading-[22px] tracking-[-0.6%] mb-6">
                            {languageTranslatorUtil(language,"checkout_page_subscription_events","oneTimePaymentDescription")}
                          </p>
                          <div className="text-[30px] sm:text-[36px] font-normal font-roboto bg-gradient-to-r from-[#F65F18] to-[#F49867] text-transparent bg-clip-text">
                            {currencyFormatter.format(eventData?.price || 0.0)}
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="flex justify-center">
                            <div className="w-full max-w-md space-y-3">
                              <div className="flex justify-between items-center text-[14px] sm:text-[16px] font-medium font-roboto">
                                <span className="text-dark-gray">
                                  {languageTranslatorUtil(language,"common_stringTemplates","eventDateLabel")}
                                </span>
                                <span className="text-black">
                                  {format_MM_DD_YYYY(
                                    nextRecurringEvent?.start || ""
                                  ) || "Date"}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-[14px] sm:text-[16px] font-medium font-roboto">
                                <span className="text-dark-gray">
                                 {languageTranslatorUtil(language,"common_stringTemplates","eventTimeLabel")}
                                </span>
                                <span className="text-black">{` ${formatHH_MM_SS(eventData?.startingTime || "") || "Time"
                                  } - ${formatHH_MM_SS(
                                    eventData?.endingTime || ""
                                  ) || "Time"
                                  } `}</span>
                              </div>
                            </div>
                          </div>
                          <div className="border-b border-[#E5E7EB] pt-6"></div>
                        </div>

                        <div className="p-4 sm:p-6">
                          <h4 className="text-[16px] sm:text-[18px] font-medium text-light-gray font-roboto mb-3">
                                         {languageTranslatorUtil(language,"common_stringTemplates","paymentMethodLabel")}
                          </h4>
                          <div className="space-y-3">
                            {
                              eventData?.paymentMethod?.map((item, index) => {
                                if(item === PAYMENT_METHODS.SUBSCRIPTION) return;
                                return (
                                  <>
                                    <label className="flex items-start cursor-pointer">
                                      <div className="grid place-items-center mr-3 mt-1">
                                        <input
                                          type="radio"
                                          name="paymentMethod"
                                          value={item}
                                          checked={paymentType === item}
                                          // checked={paymentMethod === PAYMENT_METHODS.ONLINE}
                                          // onChange={(e) => setPaymentMethod(item)}
                                          onChange={(e) => setPaymentType(item)}
                                          className="col-start-1 row-start-1 appearance-none shrink-0 w-4 h-4 border-2 border-user-orange rounded-full"
                                        />
                                        {paymentType === item && (
                                          <div className="col-start-1 row-start-1 w-2 h-2 rounded-full bg-user-orange" />
                                        )}
                                      </div>
                                      <div>
                                        <div className="text-[#1B1A1A99] text-[13px] sm:text-[14px] font-roboto font-normal leading-[22px] tracking-[-0.6%]">
                                          {item === PAYMENT_METHODS.ONLINE && languageTranslatorUtil(language, "common_stringTemplates", "onlinePaymentOption")}
                                          {item === PAYMENT_METHODS.INHOUSE && languageTranslatorUtil(language, "common_stringTemplates", "InhousePaymentOption")}
                                        </div>
                                        <div className="text-light-gray text-[11px] sm:text-[12px] font-roboto font-normal leading-[22px] tracking-[-0.6%]">
                                          {item === PAYMENT_METHODS.ONLINE && languageTranslatorUtil(language, "checkout_page_subscription_events" , "subscription_pay_only_for_an_event_payment_method_online")}
                                          {item === PAYMENT_METHODS.INHOUSE && languageTranslatorUtil(language, "checkout_page_subscription_events" , "subscription_pay_only_for_an_event_payment_method_inhouse")}
                                        </div>
                                      </div>
                                    </label>
                                  </>
                                );
                              })
                            }
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col flex-grow"></div>
            <div className="mt-10">
              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <CustomButton
                  buttonText={languageTranslatorUtil(language,"add_review_popup","cancelButton")}
                  bgColor="bg-transparent"
                  textColor="text-dark-orange"
                  borderColor="border-dark-orange"
                  height="h-12 sm:h-14"
                  width="w-full"
                  className="px-4 sm:px-8 rounded-lg hover:bg-orange-50 hover:text-primary"
                  hoverTextColor = "hover:text-primary"
                  hoverBorderColor = "hover:border-dark-orange"
                  textWeight="font-semibold"
                  onClick={handleCancel}
                  disabled={isProcessing}
                />

                <CustomButton
                  buttonText={isProcessing ? languageTranslatorUtil(language,"ms_values","processing") : languageTranslatorUtil(language,"common_stringTemplates","bookNowButton")}
                  bgColor="bg-dark-orange"
                  textColor="text-white"
                  borderColor="border-dark-orange"
                  height="h-12 sm:h-14"
                  width="w-full"
                  className="px-4 sm:px-8 rounded-lg hover:bg-orange-600"
                  textWeight="font-semibold"
                  loading={isCreateSubscriptionCheckout || isCreateSubscriptionCheckoutWithP24 || isBookingEvent}
                  disabled={isCreateSubscriptionCheckout || isCreateSubscriptionCheckoutWithP24 || isBookingEvent}
                  onClick={handlePayment}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  // NOTE: One-time event layout
  else if (!isPayNow) {
    return (
      <>
        {/* Add custom CSS for 850px breakpoint */}
        <style jsx>{`
          @media (max-width: 849px) {
            .responsive-850 {
              flex-direction: column;
              gap: 0.25rem;
              text-align: center;
            }
            .responsive-850 .badge-center {
              align-self: center;
            }
          }
          @media (min-width: 850px) {
            .responsive-850 {
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              gap: 0;
              text-align: left;
            }
            .responsive-850 .badge-center {
              align-self: auto;
            }
          }
        `}</style>

        <div className="flex flex-col flex-grow w-full max-w-[936px] mx-auto px-5 sm:px-8 md:px-16 lg:px-0 mb-16 md:mb-20">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row gap-2 font-roboto font-medium text-level-2 custom-w-br-360:text-level-1 leading-[100%] tracking-normal">
               {
              (language === "ENGLISH") ?
              <>
               <p className="text-primary-text">{languageTranslatorUtil(language,"ms_values","events")}</p>
              <p className="text-primary">
                {languageTranslatorUtil(language,"ms_values","checkout")}
              </p>

              </> 
              :

              <>
               <p className="text-primary-text">{languageTranslatorUtil(language,"ms_values","checkout")}</p>
              <p className="text-primary">
                {languageTranslatorUtil(language,"ms_values","events")}
              </p>
              
              </>
              
            }
              
            </div>
          </div>
          <div className="flex flex-col flex-grow w-full mb-6 sm:mb-8 rounded-xl p-4 sm:p-6 md:p-16 bg-white shadow-md">
            {/* Event Header */}
            <div className="mb-6 sm:mb-10 w-full max-w-[808px]">
              <div className="flex responsive-850 mb-3">
                <h1 className="text-[16px] sm:text-[20px] lg:text-[30px] font-medium text-black font-roboto max-w-[70%]">
                  {eventData?.name || "Event Name"}
                </h1>
                <span className="text-[16px] sm:text-[20px] lg:text-[25px] font-semibold text-user-orange font-roboto">
                  {currencyFormatter.format(eventData?.price || 0.0)}
                </span>
              </div>
              <div className="flex responsive-850 text-[16px] md:text-[18px] font-roboto">
                <span className="text-dark-black font-medium">{languageTranslatorUtil(language,"ms_values","hostedByLabel2")+":"} </span>
                <span className="text-[#1B1A1A99] font-medium">
                  {`${eventData?.organizer?.firstName || ""} ${eventData?.organizer?.lastName || ""
                    }`?.trim()?.length > 0
                    ? `${eventData?.organizer?.firstName} ${eventData?.organizer?.lastName}`
                    : "Host Name"}
                </span>
              </div>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 gap-[10px] mb-6 sm:mb-6 bg-[#FAFAFA] p-[18px] sm:p-6 rounded-lg">
              <div className="flex responsive-850">
                <span className="text-light-gray text-[14px] sm:text-[16px] lg:text-[18px] font-medium font-roboto">
                  {languageTranslatorUtil(language,"checkout_page_subscription_events","eventTypeLabel")}
                </span>
                <span className="bg-[#FFF7ED] text-user-orange px-3 py-1 rounded-[4px] text-[14px] font-roboto font-medium badge-center">
                  {languageTranslatorUtil(language, "common_stringTemplates", "eventTypes", eventData?.eventType) || "Event Type"}
                </span>
              </div>
              <div className="flex responsive-850 font-roboto text-[14px] sm:text-[16px] lg:text-[18px]">
                <span className="text-light-gray font-medium">{languageTranslatorUtil(language,"checkout_page_subscription_events","categoryLabel")}</span>
                <span className="text-[#1B1A1A99] font-normal">
                  {languageTranslatorUtil(language, "common_stringTemplates", "dropdown", `${eventData?.category}`) || "Event Category"}
                </span>
              </div>
              <div className="flex responsive-850 font-roboto text-[14px] sm:text-[16px] lg:text-[18px]">
                <span className="text-light-gray font-medium">{languageTranslatorUtil(language,"common_stringTemplates","DateTimeLabel")}</span>
                <span className="text-[#1B1A1A99] font-normal">
                  {/* {eventDetails?.frequency} */}
                  {/* 2025-July-12 at 10.00 AM */}
                  {formatYYYY_MM_DD_HH_MM_A(eventData?.date || eventData?.eventStartDate) || "Date"}
                </span>
              </div>
              <div className="flex responsive-850 font-roboto text-[14px] sm:text-[16px] lg:text-[18px]">
                <span className="text-light-gray font-medium">{languageTranslatorUtil(language,"common_stringTemplates","locationLabel")}</span>
                <Tooltip
                  title={eventData?.eventLocations?.[0]?.address || languageTranslatorUtil(language,"common_stringTemplates", languageTranslatorUtil(language,"common_stringTemplates","locationLabel"))}
                  placement="top"
                  overlayStyle={{ maxWidth: "300px" }}
                >
                  <span className="text-[#1B1A1A99] font-normal break-words cursor-help">
                    {truncateText(eventData?.eventLocations?.[0]?.address, 50) || languageTranslatorUtil(language,"common_stringTemplates","locationLabel")}
                  </span>
                </Tooltip>
              </div>
            </div>

            {/* Payment Details Section */}
            <div className="mb-6 sm:mb-10 bg-[#FAFAFA] p-4 sm:p-6 rounded-lg">
              <h3 className="text-[20px] sm:text-[24px] gap-[10px] font-medium text-black font-roboto mb-6 border-b-[1px] border-[#CBD5E0] pb-3 responsive-850">
                {languageTranslatorUtil(language,"ms_values","paymentDetails")}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[16px] sm:text-[18px] font-medium font-roboto">
                  <span className="text-light-gray">{languageTranslatorUtil(language,"ms_values","eventPayment")}</span>
                  <span className="text-light-gray">
                    {currencyFormatter.format(eventData?.price || 0.0)}
                  </span>
                </div>
                <div className="mb-4">
                  <span className="text-light-gray text-[16px] sm:text-[18px] font-medium font-roboto block mb-3">
                    {languageTranslatorUtil(language,"common_stringTemplates","paymentMethodLabel")}
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {eventData?.paymentMethod?.map((item, index) => {
                      return (
                        <>
                          <label
                            className="flex items-start cursor-pointer hover:bg-gray-50"
                            key={index}
                          >
                            <div className="grid place-items-center mr-3 mt-1">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value={item}
                                checked={paymentType === item}
                                onChange={(e) => setPaymentType(e.target.value)}
                                className="col-start-1 row-start-1 appearance-none shrink-0 w-4 h-4 border-2 border-user-orange rounded-full"
                              />
                              {paymentType === item && (
                                <div className="col-start-1 row-start-1 w-2 h-2 rounded-full bg-user-orange" />
                              )}
                            </div>
                            <div>
                              <div className="text-[#1B1A1A99] text-[13px] sm:text-[14px] font-roboto font-normal leading-[22px] tracking-[-0.6%]">
                                {item === PAYMENT_METHODS.ONLINE && languageTranslatorUtil(language, "common_stringTemplates", "onlinePaymentOption")}
                                {item === PAYMENT_METHODS.INHOUSE && languageTranslatorUtil(language, "common_stringTemplates", "InhousePaymentOption")}
                              </div>
                              <div className="text-light-gray text-[11px] sm:text-[12px] font-roboto font-normal leading-[22px] tracking-[-0.6%]">
                                {item === PAYMENT_METHODS.INHOUSE
                                  ? languageTranslatorUtil(language,"ms_values","payInPerson")
                                  : languageTranslatorUtil(language,"ms_values","payViaStripe")}
                              </div>
                            </div>
                          </label>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col flex-grow"></div>
            <div className="mt-10">
              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <CustomButton
                  buttonText={languageTranslatorUtil(language,"add_review_popup","cancelButton")}
                  bgColor="bg-transparent"
                  textColor="text-dark-orange"
                  borderColor="border-dark-orange"
                  height="h-12 sm:h-14"
                  width="w-full"
                  className="px-4 sm:px-8 rounded-lg hover:bg-orange-50 hover:text-primary"
                  hoverTextColor = "hover:text-primary"
                  hoverBorderColor = "hover:border-dark-orange"
                  textWeight="font-semibold"
                  onClick={handleCancel}
                  disabled={isProcessing}
                />

                <CustomButton
                  buttonText={isProcessing ? languageTranslatorUtil(language,"ms_values","processing") : languageTranslatorUtil(language,"common_stringTemplates","bookNowButton")}
                  bgColor="bg-dark-orange"
                  textColor="text-white"
                  borderColor="border-dark-orange"
                  height="h-12 sm:h-14"
                  width="w-full"
                  className="px-4 sm:px-8 rounded-lg hover:bg-orange-600"
                  textWeight="font-semibold"
                  loading={isCreatePaymentCheckout || isCreateSubscriptionCheckout || isBookingEvent}
                  disabled={isCreatePaymentCheckout || isCreateSubscriptionCheckout || isBookingEvent}
                  onClick={handlePayment}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default EventsCheckoutPage;