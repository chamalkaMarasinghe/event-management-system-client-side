import React, { useState } from 'react'
import UserAvatar from "../../utils/UserAvatar";
import ProfileImage from "../ProfileImage";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/language/language';
import { languageTranslatorUtil } from '../../utils/languageTranslatorUtil';

const EventHostProfile = ({profilePic, username, category, organizerId = '', loading = false}) => {

  const navigate = useNavigate();
  const {language} = useLanguage();
  const [isImageValid, setIsImageValid] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleImageError = () => {
    setIsImageValid(false);
  };

  if(loading){
    return (
      <div className={`w-full h-full rounded-full bg-slate-300 animate-pulse`}>
          <div className={`w-full h-full rounded-full`}/>
      </div>
    );
  }

  return (
    <div className=' md:h-[48px] w-full flex items-center gap-3'>
      <div className='flex justify-center items-center h-9 w-9 xs:h-10 xs:w-10'>

          {loading ? (
              <div className="absolute w-[11px] h-[11px] bg-transparent rounded-full flex items-center justify-center top-2 left-0">
                  {!loading && <span className="bg-transparent w-[7px] h-[7px] rounded-full"></span>}
              </div>
          ) : null}
          <ProfileImage
              profilePicture={profilePic}
              firstName={username?.split(" ")?.[0] || ""}
              lastName={username?.split(" ")?.[1] || ""}
              loading={loading}
              backgroundColor={"#F65F18"}
          />

        {/*{isImageValid && profilePic ? (*/}
        {/*  // <LazyLoad height={200} offset={100} once>*/}
        {/*    <div className={`flex w-full h-[100%] ${hasLoaded ? "" : "bg-slate-300 animate-pulse"}`}>*/}
        {/*      <img */}
        {/*        src={profilePic}*/}
        {/*        alt="Profile"*/}
        {/*        className='h-9 w-9 xs:h-10 xs:w-10 rounded-full object-cover'*/}
        {/*        onError={handleImageError} // If image fails, fallback to avatar*/}
        {/*        onLoad={() => setHasLoaded(true)}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*  // </LazyLoad>*/}
        {/*) : (*/}
        {/*  <UserAvatar*/}
        {/*    firstName={username?.split(" ")?.[0] || ""}*/}
        {/*    lastName={username?.split(" ")?.[1] || ""}*/}
        {/*    size={64}*/}
        {/*    fontSize={"16px"}*/}
        {/*    backgroundColor={"#5C5F6A"}*/}
        {/*    className="w-full h-full"*/}
        {/*  />*/}
        {/*)}*/}
      </div>
      <div className='flex flex-col'>
        <span className="xs:text-lg tracking-[0%] font-roboto font-medium text-[19px] leading-[100%] capitalize text-subheadings opacity-60">
           {languageTranslatorUtil(language,"ms_values","hostedByLabel2")} @<span className="text-gray-900 font-roboto font-medium text-[19px] leading-[100%] capitalize hover:text-primary hover:cursor-pointer transition-all duration-100 " onClick={() => {navigate(`/client-service-provider/${organizerId}`)}}>{username}</span>
        </span>
        <span className="font-roboto font-normal text-[16px] leading-[22px] tracking-[0%] text-subheadings opacity-60">
          {category}
        </span>
      </div>
    </div>
  )
}

export default EventHostProfile
