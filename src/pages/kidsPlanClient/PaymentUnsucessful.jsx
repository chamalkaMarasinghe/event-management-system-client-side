import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Icon from "../../assets/Payment/unsucess.svg";
import { useNavigate } from "react-router-dom";

function PaymentUnsucessful() {
  const navigate = useNavigate();
  const [iconLoaded, setIconLoaded] = useState(false);

  const handleGoToHomePage = () => {
    navigate("/");
  };

  return (
    <>
      <title>Payment Failed!</title>
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
                  alt="Unsuccessful Payment Icon"
                  className="w-[100px] h-auto"
                  effect="blur"
                  onLoad={() => setIconLoaded(true)}
                />
              </div>
              <div className=" flex flex-col items-center gap-2">
                <p className=" text-[#DC3F3F] text-[23px] sm:text-[32px] font-semibold font-roboto tracking-[0.001em]">
                  Payment Failed !
                </p>
                <p className="sm:w-[400px] text-light-gray text-center text-[13px] sm:text-[14px] font-normal font-roboto">
                  Unfortunately executing your payment failed. Can you go back{" "}
                  and try again.
                </p>
              </div>
            </div>
          </div>
          <div className=" mt-[40px] flex flex-col gap-7 sm:gap-[40px]">
            <div className=" flex flex-col items-center">
              <button className="w-full flex justify-center items-center h-[50px] sm:h-[56px] rounded-[8px] bg-[#E31919] border-[1px] text-white text-[15px] sm:text-[16px] font-roboto font-semibold transition duration-300 ease-in-out hover:bg-[#C41414] hover:shadow-md">
                Try Again
              </button>
              <button
                onClick={handleGoToHomePage}
                className="mt-[18.5px] text-[#E31919] text-[15px] sm:text-[16px] font-roboto font-semibold"
              >
                Back to Home Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentUnsucessful;
