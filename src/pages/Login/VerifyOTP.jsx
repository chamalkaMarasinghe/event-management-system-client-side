import React, { useEffect, useRef, useState } from "react";
import ImageSection from "../../components/Login/ImageSection";

const VerifyOTP = () => {
  const [length, setLength] = useState(5);
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const onComplete = (otp) => {
    console.log("OTP Entered", otp);
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (newOtp.every((val) => val !== "") && onComplete) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    // Handle resend logic here
    console.log("Resend code");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen px-4 md:flex-row bg-light md:px-0 ">
      <div className="container max-w-[1240px] mx-auto flex flex-col md:flex-row overflow-hidden gap-[50px]">
        {/* Left Section */}
        <div className="flex flex-col items-center justify-center flex-1 p-5">
          <div className="w-full max-w-[512px] p-6 flex flex-col gap-6">
            {/* OTP Header */}
            <div className="flex flex-col gap-2 mb-[56px] text-center md:text-left">
              <h1 className="text-3xl font-bold md:text-4xl text-primary font-nonito_sans">
                Enter OTP
              </h1>
              <p className="text-[#83899F] text-base md:text-lg font-inter leading-[150%]">
                Enter the OTP sent to your Email Address or Mobile Phone Number.
              </p>
            </div>
            {/* OTP Input */}
            <div className="flex flex-row items-center justify-center gap-2 md:gap-4">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(e, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`w-[50px] md:w-[77px] h-[50px] md:h-[77px] rounded-[10px] md:rounded-[15px] text-center text-xl md:text-[32px] font-medium font-inter text-content
                  ${
                    idx < 3
                      ? "border border-primary"
                      : "border border-[#CBD5E0]"
                  } 
                  bg-primary-light/30 outline-none focus:border-2`}
                  maxLength={1}
                  inputMode="numeric"
                />
              ))}
            </div>
            {/* Buttons */}
            <div className="flex flex-col gap-2 mt-16 md:mt-24">
              {/* Verify Button */}
              <button
                onClick={() => console.log("Verify OTP")}
                disabled={otp.some((val) => val === "")}
                className="w-full max-w-[464px] h-[50px] md:h-[60px] flex items-center justify-center px-6 bg-primary text-white rounded-lg md:rounded-xl font-inter font-semibold text-lg md:text-xl"
              >
                Verify
              </button>
              {/* Resend Link */}
              <div className="flex items-center justify-center w-full text-sm md:text-[15px] leading-[125%]">
                <span className="text-gray-500">Didn’t receive the code?</span>
                <button
                  onClick={handleResend}
                  className="ml-1 font-medium text-primary hover:underline"
                >
                  Resend
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="flex-1 hidden md:flex">
          <ImageSection />
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
