import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import confetti from "canvas-confetti";
import Icon from "../../assets/Payment/success icon component.svg";
import Button from "../../components/Form/CustomButton";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  PAYMENT_METHODS,
  PAYMENT_TYPES,
  SCHEDULING_TYPES,
} from "../../constants/commonConstants";
import showToast from "../../utils/toastNotifications";
import { currencyFormatter } from "../../utils/formatting";
import { useLanguage } from "../../context/language/language";
import { languageTranslatorUtil } from "../../utils/languageTranslatorUtil";

// Helper functions to determine payment context
const isInHousePayment = (paymentMethod) => paymentMethod === PAYMENT_METHODS.INHOUSE;
const isSubscriptionPayment = (paymentMethod) => paymentMethod === SCHEDULING_TYPES.SUBSCRIPTION;

// Configuration object for different payment scenarios
const getPaymentConfig = (paymentMethod,language) => {
  if (isInHousePayment(paymentMethod)) {
    return {
      msg1: languageTranslatorUtil(language,"success_pages","bookingInhouseSuccess","subtext"),
      msg2: languageTranslatorUtil(language,"success_pages","bookingInhouseSuccess","emailNotice"),
      transactionID: languageTranslatorUtil(language,"success_pages","bookingInhouseSuccess","bookingIdLabel"),
      amountPaid: languageTranslatorUtil(language,"success_pages","bookingInhouseSuccess","amountToPayLabel")
    }
  }  

  if (isSubscriptionPayment(paymentMethod)) {
    return {
      msg1: languageTranslatorUtil(language,"success_pages","subscriptionOnlineSuccess","subtext"),
      msg2: languageTranslatorUtil(language,"ms_values","confirmationEmail"),
      transactionID: languageTranslatorUtil(language,"success_pages","subscriptionOnlineSuccess","subscriptionIdLabel"),
      amountPaid: languageTranslatorUtil(language,"common_stringTemplates","amountLabel")
    }
  }

  return {
    msg1: languageTranslatorUtil(language,"success_pages","paymentOnlineSuccess","subtext"),
    msg2: languageTranslatorUtil(language,"success_pages","paymentOnlineSuccess","confirmationMessage"),
    transactionID: languageTranslatorUtil(language,"success_pages","paymentOnlineSuccess","transactionIdLabel"),
    amountPaid: languageTranslatorUtil(language,"common_stringTemplates","amountLabel")
  }
}

function PaymentSucessful() {

  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const {language} = useLanguage();

  const [iconLoaded, setIconLoaded] = useState(false);
  // const [amount, setAmount] = useState(0);
  
  // const paymentType = searchParams.get("paymentType");
  const paymentMethod = searchParams.get("paymentMethod");
  // const schedulingType = searchParams.get("schedulingType");

  //payment-successful?status=success&event=${event?._id}&amount=${totalAmount}&paymentMethod=${''}&schedulingType=${''}&paymentType=${''}&bookingId=${newBookingId}&paymentIntentId=${paymentIntentId}`);

  const amount = searchParams.get("amount") || 0;
  const paymentIntentId = searchParams.get("paymentIntentId") || '';
  const bookingId = searchParams.get("bookingId") || '';

  // Get payment configuration based on current payment context
  const config = getPaymentConfig(paymentMethod,language);
  const { msg1, msg2, transactionID, amountPaid } = config;

  useEffect(() => {
    const interval = setInterval(() => {
      confetti({
        particleCount: 40,
        spread: 160,
        origin: { x: Math.random(), y: Math.random() * 0.6 },
      });
    }, 500);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const status = urlParams.get("status");
    const event = urlParams.get("event")
    // const amount = urlParams.get("amount")

    // if(amount){
    //   setAmount(amount);
    // }

    if (status === "success") {
      showToast(
        "success",
        languageTranslatorUtil(language,"ms_values","eventBookedSuccess") 
      );
    } 
    else if (status === "error") {
      const errorMessage =
        urlParams.get("message") ||
        languageTranslatorUtil(language,"toastMessages","staticErrors","failedBookEvent");
      console.log("errorMessage", errorMessage)
      showToast("error", decodeURIComponent(errorMessage));
    }
  }, [location.search, navigate]);

  const handleGoToHomePage = () => {
    navigate("/");
  };

  return (
    <>
      <title>Payment Successfull</title>
      <div className=" w-full">
        <div className="w-[90%] sm:w-[80%] lg:w-[800px] mx-auto rounded-[21.33px] bg-white shadow-[#FFF7ED33] p-12 mb-[88px]">
          <div className=" flex items-center gap-6 flex-col justify-center">
            <div className=" flex items-center flex-col gap-6">
              <div
                className={twMerge(
                  "relative w-[100px] h-[100px]",
                  iconLoaded ? "bg-transparent" : "bg-gray-300 animate-pulse"
                )}
              >
                <LazyLoadImage
                  src={Icon}
                  placeholderSrc={Icon}
                  alt="Success Icon"
                  className="w-[100px] h-auto"
                  effect="blur"
                  onLoad={() => setIconLoaded(true)}
                />
              </div>
              <div className=" flex flex-col items-center gap-2">
                <p className=" text-dark-orange text-[23px] sm:text-[32px] font-semibold font-roboto tracking-[0.001em]">
                  {languageTranslatorUtil(language,"success_pages","paymentOnlineSuccess","heading")}
                </p>
                <p className=" text-light-gray text-center text-[13px] sm:text-[14px] font-normal font-roboto">
                  {msg1}
                </p>
              </div>
            </div>
            <table>
              <tbody>
                <tr className="">
                  <td className="text-dark-black font-semibold font-roboto text-[14px] sm:text-[16px] tracking-[0.001em] pr-3">
                    {transactionID}
                  </td>
                  <td className="text-[14px] sm:text-[16px] font-roboto font-normal text-light-gray tracking-[0.001em]">
                    {(bookingId?.length > 2 && paymentMethod === PAYMENT_METHODS.INHOUSE) ? bookingId : paymentIntentId}
                  </td>
                </tr>
                <tr className="mt-[12px]">
                  <td
                    className="text-dark-black  font-semibold font-roboto text-[14px] sm:text-[16px] tracking-[0.001em] pr-3"
                    align="right"
                  >
                    {amountPaid}
                  </td>
                  <td className="text-[14px] sm:text-[16px] font-roboto font-normal text-light-gray tracking-[0.001em]">
                    {currencyFormatter.format(amount || 0)}
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="text-light-gray text-center text-[13px] sm:text-[14px] font-normal font-roboto">
              {msg2}
            </p>
          </div>
          <div className=" mt-[40px] flex flex-col gap-10">
            <div className="flex flex-row  gap-[24px] w-full justify-center items-center">
              <div className=" flex-1 border-t-2 border-[#CBD5E0] "></div>
              <div className="flex justify-center items-center rounded-[16px] border border-dark-orange bg-[#FFF7ED] text-light-gray text-[12px] sm:text-[14px] font-roboto font-medium w-[107px] h-[32px]">
                {languageTranslatorUtil(language,"ms_values","whatNext")}
              </div>
              <div className=" border-t-2 flex-1 border-[#CBD5E0] "></div>
            </div>
            <div className=" grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-[40px]">
              <Button
                buttonText={languageTranslatorUtil(language,"ms_values","goToHome")}
                className="w-full h-14 text-[16px] flex items-center justify-center  font-roboto font-semibold "
                width="0"
                bgColor="none"
                borderColor="border-dark-orange"
                textColor="text-dark-orange"
                onClick={handleGoToHomePage}
              />
              <Button
                buttonText={languageTranslatorUtil(language,"ms_values","viewOrder")}
                className="w-full h-14 flex items-center justify-center text-[16px] font-roboto font-semibold"
                width="0"
                onClick={() => {
                  navigate("/all-orders");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentSucessful;
