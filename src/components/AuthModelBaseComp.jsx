import React from "react";
import ImageSection from "../../components/Login/ImageSection";
import SignInForm from "../../components/Login/SignInForm";
import Image from "../../assets/login/setnewpassword.webp";
import Image_LQ from "../../assets/login/setnewpassword_lq.webp";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { closeSignInModal } from "../../store";
import { AUTH_POPUP_VARIANTS } from "../../constants/commonConstants";
import KidsSignUpForm from "../Login/KidsSignUpForm";

export const AuthModelBaseComp = ({
  isOpen,
  variant,
  handlers
}) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeSignInModal());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white relative shadow-lg rounded-3xl md:rounded-3xl w-[88%] md:max-w-[628px] lg:max-w-[628px] flex justify-center items-center h-[540px] md:h-[540px]">
        <div className=" md:h-[540px] w-full px-6 md:pr-6 md:w-[638px] flex flex-col md:flex-row gap-8 ">
          <button
            onClick={handleClose}
            className="absolute z-50 right-3 top-3  w-[30px] flex items-center justify-center h-[30px]  cursor-pointer text-gray-500 hover:text-gray-800"
          >
            <IoCloseOutline size={28} />
          </button>

          {/* Form Section */}
          <div className="w-full flex justify-center items-center ">
            <KidsSignUpForm
              isModel={true}
              variant={variant}
              handlers={handlers}
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export const PopUpHeading = () => {
  return (
    <div className="w-[248px h-[67px] flex justify-center items-center flex-col">
      <h1 className="font-roboto font-semibold text-[32px] leading-[33.6px] align-middle tracking-[0%] text-[#000000]">Register Account</h1>
      <h1 className="font-roboto font-normal text-[14px] leading-[25px] align-middle tracking-[0%] text-[#5C5F6A]">Create Your Account</h1>
    </div>
  )
}


