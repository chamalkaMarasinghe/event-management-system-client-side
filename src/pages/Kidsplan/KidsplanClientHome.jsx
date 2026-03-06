import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { FaArrowRight } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import image1HQ from "../../assets/images/image1HQ.webp";
import image1LQ from "../../assets/images/image1LQ.webp";
import image2HQ from "../../assets/images/image2HQ.webp";
import image2LQ from "../../assets/images/image2LQ.webp";
import image3HQ from "../../assets/icons/gray-map-with-location-pin-HQ.webp";
import image3LQ from "../../assets/icons/gray-map-with-location-pin-LQ.webp";

import Button from "../../components/Form/CustomButton";
import CustomButton from "../../components/Base/CustomButton";
import EventCard from "../../components/Base/EventPlan";
import EventCardSkeleton from "../../components/skeletons/EventCardSkeleton";
import HowKidsplanWorksSection from "../../components/Base/HowKidsplanWorksSection";
import HeroSearchBar from "../../components/Base/HeroSearchBar";

import { useThunk } from "../../hooks/useThunk";
import { getAllEvents } from "../../store/thunks/eventThunks";
import { openSignInModal } from "../../store";
import {
  KidsplanWorkSteps,
  ChromeLocationSettingsSteps,
} from "../../constants/StringLitterels";
import showToast from "../../utils/toastNotifications";
import { useLanguage } from "../../context/language/language";
import { useCurrentLocation } from "../../context/location/location";
import { languageTranslatorUtil } from "../../utils/languageTranslatorUtil";
import { CONFIGURATIONS } from "../../config/envConfig";

const KidsplanClientHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const wishList = useSelector(state => state.auth.user?.wishList);

  const { language } = useLanguage();
  const currentLocation = useCurrentLocation();

  // STATE: status defonation ==========================================================================>

  const [locationEnabled, setLocationEnabled] = useState(false);
  const [isRenderingRecentEvents, setIsRenderingRecentEvents] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [events, setEvents] = useState([]);
  const [waitingForAuth, setWaitingForAuth] = useState(false);
  const [heroSearchTerm, setHeroSearchTerm] = useState("");

  // STATE: static image loading states ================================================================>

  const [loadedHero, setLoadedHero] = useState(false);
  const [loadedBottom, setLoadedBottom] = useState(false);
  const [loadedDesktopSetPin, setLoadedDesktopSetPin] = useState(false);

  // STATE: thunks definations =========================================================================>

  const [doGetAllEvents, isGetAllEvents, getAllEventsError] =
    useThunk(getAllEvents);
    
  // STATE: side effect definations ====================================================================>

  // NOTE: Check localStorage for location enabled state on component mount
  useEffect(() => {
    if(currentLocation?.savedLocationEnabled) {
      setLocationEnabled(true);
      fetchEvents({ longitude: currentLocation?.longitude, latitude: currentLocation?.latitude, isNearbyEvents: true });
    }
  }, []);

  useEffect(() => {
    if (showPopup) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.body.style.overflow = "hidden"; // disable scroll
    } else {
      document.body.style.overflow = "auto"; // restore scroll
    }
  }, [showPopup]);

  // FUNCTION: helper function definations =============================================================>

  // Fetch events function
  const fetchEvents = async ({
    latitude,
    longitude,
    isNearbyEvents = false,
  } = {}) => {
    try {
      const params = {
        limit: 8,
        offset: 0,
        latitude,
        longitude,
        isNearbyEvents,
        clientRoute: "/events/home",
      };

      const result = await doGetAllEvents(params);

      if (result.success) {
        const fetchedEvents = result?.response?.data?.data || [];
        setEvents(fetchedEvents);
        if(!(result?.response?.data?.isNearbyReslts)){
          setIsRenderingRecentEvents(true);
        }
      } else {
        showToast("error", result?.error?.message || languageTranslatorUtil(language,"toastMessages","staticErrors","failedEventFetch"));
        setEvents([]);
      }
    } catch (error) {
      showToast("error", languageTranslatorUtil(language,"toastMessages","staticErrors","failedEventFetch"));
      setEvents([]);
    }
  };

  const handleEnableLocation = async () => {
    try {      
      const { latitude, longitude } = await currentLocation?.getLocation();
      fetchEvents({ longitude, latitude, isNearbyEvents: true });
      setLocationEnabled(true);
    } catch (error) {
      showToast('error', languageTranslatorUtil(language,"browserLocationErrors",error.code));
    }
  };

  const handleNotNowClick = () => {
    setIsRenderingRecentEvents(true);
    setShowPopup(true);
    setLocationEnabled(true);
    fetchEvents({
      longitude: currentLocation?.longitude,
      latitude: currentLocation?.latitude,
    });
  };

  const handleHeroSearch = (term = "") => {
    if (!term || !term.toString().trim().length) {
      showToast("warning", languageTranslatorUtil(language,"toastMessages","staticWarnings","enterSearchTerm"));
      return;
    }

    let formatedValue =
      term.toString().trim().length > 10
        ? term.trim().substring(0, 8)
        : term.trim();
    navigate(`/events?heroSearchTerm=${formatedValue}&heroSearchResult=true`);
  };

  return (
      <>
        <title>kidsplan</title>
        <div className="px-[1.25rem] md:px-[2rem] lg:px-[2.6563rem] mb-36 sm:mb-36 md:mb-36 lg:mb-24 xl:mb-0">
          {/* Hero Section */}
          <div className="relative">
            <div
                className={twMerge(
                    "relative w-full h-[378px] custom-w-br-920:h-[478px] xl:h-[678px]",
                    loadedHero ? "bg-transparent" : "bg-gray-300 animate-pulse"
                )}
            >
              <LazyLoadImage
                  src={image1HQ}
                  placeholderSrc={image1LQ}
                  alt="Hero Background"
                  className="absolute inset-0 object-cover w-full h-full rounded-[12px]"
                  effect="blur"
                  visibleByDefault={true} // <- forces eager loading
                  onLoad={() => {
                    setLoadedHero(true);
                  }}
              />
              <div className="absolute inset-0 bg-opacity-50 bg-subheadings rounded-[12px]"></div>
            </div>
            <div className="absolute font-roboto inset-0 flex flex-col items-center justify-center text-center px-4 text-[28px] md:text-[40px] lg:text-[62px] font-light text-white uppercase">
            
                  
                    <div>{languageTranslatorUtil(language,"ms_values","findEventsWorkshops")}</div>
                    <div>{languageTranslatorUtil(language,"ms_values","andExperiences")}</div>
                    <div className="font-semibold">{languageTranslatorUtil(language,"ms_values","nearYou")}</div>
                
              

              <div className="sm:w-[400px] md:w-[500px] lg:w-[600px] mt-12">
                <HeroSearchBar
                    searchTerm={heroSearchTerm}
                    setSearchTerm={setHeroSearchTerm}
                    handleSearch={handleHeroSearch}
                />
              </div>
            </div>
          </div>

          {/* How KidsPlan works section */}
          <div className="pt-[60px] md:pt-[100px] lg:pt-[120px] px-[10px] md:px-[38px] font-roboto text-center">
            <HowKidsplanWorksSection workSteps={KidsplanWorkSteps} />
          </div>

          {/* Grow Business Section */}
          <div className="py-[190px] xl:py-[100px] px-[40px] md:px-[80px] lg:px-[126px] font-sf_pro">
            <div className="flex flex-row items-start justify-center gap-[69px] text-center xl:text-left xl:justify-start">
              <div className="max-xl:flex max-xl:flex-col max-xl:items-center max-xl:justify-center h-[395px] xl:h-[395px] flex flex-col justify-between">
                {/* mobile screen */}
                <div className="flex items-center justify-center xl:hidden rounded-[12px] max-lg:mb-10 w-full">
                  <div
                      className={twMerge(
                          "w-full max-w-[512px] rounded-[12px]",
                          loadedBottom ? "bg-transparent" : "bg-gray-300 animate-pulse"
                      )}
                  >
                    <LazyLoadImage
                        src={image2HQ}
                        placeholderSrc={image2LQ}
                        alt=""
                        className="w-full rounded-[12px] h-auto sm:h-[395px] object-cover mb-8"
                        effect="blur"
                        visibleByDefault={true} // <- forces eager loading
                        onLoad={() => {
                          setLoadedBottom(true);
                        }}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between h-full">
                  <div className="font-roboto font-medium text-[16px] leading-[100%] uppercase text-subheadings/60">
                    {languageTranslatorUtil(
                        language,
                        "home_page",
                        "growBusinessSubtitle"
                    )}
                  </div>
                  <div className="mt-2 md:mt-4 font-roboto font-medium text-[40px] leading-[100%]">
                          {languageTranslatorUtil(
                            language,
                            "home_page",
                            "growBusinessTitle"
                        )?.split("k")[0]}{" "}
                          <span className="text-primary">kidsplan</span>
                  </div>
                  <div className="mt-2 md:mt-6 font-roboto font-normal text-[20px] leading-[100%] text-black lg:mt-10 text-opacity-70">
                    {languageTranslatorUtil(
                        language,
                        "home_page",
                        "growBusinessDescription"
                    )}
                  </div>
                  <div className="flex items-center justify-center mt-auto xl:items-start xl:justify-start">
                    <Button
                        type="button"
                        buttonText={languageTranslatorUtil(
                            language,
                            "home_page",
                            "growBusinessCTA"
                        )}
                        loading={false}
                        className="bg-primary font-roboto font-semibold text-[16px] leading-[100%] w-[180px] text-white flex items-center justify-center rounded-[8px] mt-[30px] md:mt-[40px] lg:mt-[60px]"
                        onClick={() => {
                          navigate("/create-event")
                        }}
                    />
                  </div>
                </div>
              </div>
              {/* Desktop Screen */}
              <div
                  className={twMerge(
                      "hidden xl:flex items-center justify-center rounded-[12px] max-lg:mb-10",
                      loadedBottom ? "bg-transparent" : "bg-gray-300 animate-pulse"
                  )}
                  style={{ height: "395px" }}
              >
                <LazyLoadImage
                    src={image2HQ}
                    placeholderSrc={image2LQ}
                    alt=""
                    className="max-w-[512px] rounded-[12px] h-[395px] object-cover"
                    effect="blur"
                    visibleByDefault={true} // <- forces eager loading
                    onLoad={() => {
                      setLoadedBottom(true);
                    }}
                />
              </div>
            </div>
          </div>

        {/* Pop-up */}
    {showPopup && (
    <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-4"
        onClick={() => setShowPopup(false)} // click on overlay closes popup
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Popup Content - */}
      <div
        className="relative z-10 bg-white py-6 px-4 xs:px-6 md:px-8 rounded-xl w-full max-w-[1100px] max-h-[calc(100vh-1rem)] xs:max-h-[calc(100vh-2rem)] md:max-h-fit overflow-y-auto md:overflow-visible flex flex-col md:flex-row items-center justify-center font-inter"
        onClick={(e) => e.stopPropagation()} // prevent click from bubbling to overlay
        style={{
          // Ensure minimum height for very small screens
          minHeight: 'auto'
        }}
      >
        {/* Mobile screen */}
        <div className="relative block w-32 h-[120px] xs:w-40 xs:h-[159.32px] md:hidden mb-3 xs:mb-4 flex-shrink-0">
          <div
              className={twMerge(
                  "relative w-full h-full",
                  loadedDesktopSetPin
                      ? "bg-transparent"
                      : "bg-gray-300 animate-pulse"
              )}
          >
            <LazyLoadImage
                src={image3HQ}
                placeholderSrc={image3LQ}
                alt="location pin"
                className="absolute inset-0 object-cover w-full h-full rounded-[12px]"
                effect="blur"
                visibleByDefault={true} // <- forces eager loading
                onLoad={() => {
                  setLoadedDesktopSetPin(true);
                }}
            />
          </div>
        </div>

        {/* Close button - scrolls with content */}
        <button
            onClick={() => setShowPopup(false)}
            className="absolute z-50 w-[30px] flex items-center justify-center h-[30px] top-4 right-4 cursor-pointer text-dark-gray text-opacity-50 hover:text-gray-800"
        >
          <IoCloseOutline size={24} />
        </button>

        {/* Content container with better spacing for small screens */}
        <div className="flex flex-col gap-1 xs:gap-2 lg:gap-6 max-w-[852px] font-roboto text-sm xs:text-base md:text-lg lg:text-xl">
          <div className="text-lg font-medium xs:text-level-4 md:text-level-3 text-primary">
            {languageTranslatorUtil(
                language,
                "home_page",
                "locationInstructionsTitle"
            )}
          </div>

          <div className="font-normal text-light-gray">
            {languageTranslatorUtil(
                language,
                "home_page",
                "locationInstructionsSubTitle1"
            )}
          </div>

          <div className="font-medium text-dark-black">
            {languageTranslatorUtil(
                language,
                "home_page",
                "locationInstructionsSubtitle2"
            )}
          </div>

          {/* Step List */}
          <div className="flex flex-col gap-2 xs:gap-4 md:gap-6 text-light-gray">
            {ChromeLocationSettingsSteps.map((step) => (
                <div key={step.id} className="flex gap-2 xs:gap-3 md:gap-6">
                  {/* Step Number Column */}
                  <div className="w-[60px] xs:w-[70px] md:w-[90px] min-w-[60px] xs:min-w-[70px] md:min-w-[80px] font-medium text-nowrap text-xs xs:text-sm md:text-base flex-shrink-0">
                    {  languageTranslatorUtil(language,"enableLocation","step")} {String(step.id).padStart(2, "0")} :
                  </div>

                  {/* Step Instruction Column */}
                  <div className="flex-1 text-xs font-normal leading-snug xs:text-sm md:text-base xs:leading-normal">{  languageTranslatorUtil(language,"enableLocation",`id${step.id}`)}</div>
                </div>
            ))}
          </div>
        </div>

        {/* Desktop Screen */}
        <div className="pl-11 hidden md:block min-w-48 h-[159.9px]">
            {/*<img src={image3} alt="" />*/}          
            
            <div
              className={twMerge(
                  "relative w-full h-full",
                  loadedDesktopSetPin
                      ? "bg-transparent"
                      : "bg-gray-300 animate-pulse"
              )}
          >
            <LazyLoadImage
                src={image3HQ}
                placeholderSrc={image3LQ}
                alt="location pin"
                className="absolute inset-0 object-cover w-full h-full rounded-[12px]"
                effect="blur"
                visibleByDefault={true} // <- forces eager loading
                onLoad={() => {
                  setLoadedDesktopSetPin(true);
                }}
            />
          </div>
        </div>
      </div>
    </div>
)}
        </div>
      </>
  );
};

export default KidsplanClientHome;
