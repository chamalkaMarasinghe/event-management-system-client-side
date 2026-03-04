import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import LocationPinIcon from "../../assets/icons/location-pin.png";
import { CiHeart } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import NoPreviewImage from "../../assets/custom-no-preview.png";
import {
  EVENT_TYPES,
  PAYMENT_METHODS,
  SCHEDULING_TYPES,
} from "../../constants/commonConstants";
import { useLocation, useNavigate } from "react-router-dom";
import { currencyFormatter } from "../../utils/formatting";
import { formatHH_MM_SS, isEventExpired } from "../../utils/dateFormating";
import { languageTranslatorUtil } from "../../utils/languageTranslatorUtil.js";
import { useThunk } from "../../hooks/useThunk";
import { useLanguage } from "../../context/language/language.js";
import { bookEvent } from "../../store/thunks/eventThunks";
import showToast from "../../utils/toastNotifications";
import CustomButton from "./CustomButton";
import { createThread } from "../../store";
import { ErrorCodes } from "../../constants/errorCodes";
import {
  addWishListedEvent,
  removeWishListedEvent,
} from "../../store/index.js";
import {
  addWishListedEventThunk,
  removeWishListedEventThunk,
} from "../../store/thunks/wishListThunks.js";

import { ConfirmationModal } from "../Model/ConfirmationModel.jsx";
import { useCurrentLocation } from "../../context/location/location.js";
import { Tooltip } from "antd";
import { fromToChatSaveSate } from "../../store/slices/userSlice.js";

// Helper function to truncate to long text
const truncateText = (text, maxLenght = 30) => {
  if (!text) return "N/A";
  return text.length > maxLenght ? `${text.substring(0, maxLenght)}...` : text;
};

const EventCard = ({
  event = null,
  showDeleteIcon = false,
  // isSubscription = false,
  // eventId,
  // schedulingType
}) => {
  let storedAuth = JSON.parse(localStorage.getItem("auth")) || {};
  
  const isExpired = event?.eventType !== EVENT_TYPES.OPEN ? event?.schedulingType === SCHEDULING_TYPES.RECURRING ? isEventExpired(event?.eventEndDate) : event?.schedulingType === SCHEDULING_TYPES.ONETIME ? isEventExpired(event?.date) : false : false;    

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentLocation = useCurrentLocation();
  const {language} = useLanguage();

  const [wishListed, setWishListed] = useState(showDeleteIcon);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [eventImageLoaded, setEventImageLoaded] = useState(false);
  const [locationIconLoaded, setLocationIconLoaded] = useState(false);

  const [doAddWishList, isAddingWishList, errorAddingWishList] = useThunk(
    addWishListedEventThunk
  );
  const [doRemoveWishList, isRemovingWishList, errorRemovingWishList] =
    useThunk(removeWishListedEventThunk);
  const [doBookEvent, isBookingEvent, errorBookingEvent] = useThunk(bookEvent);
  const [doCreateThread, isCreateThread, errorCreateThread] =
    useThunk(createThread);

  let eventOrganizerFullName = `${event?.organizer?.firstName?.trim() || ""} ${
    event?.organizer?.lastName?.trim() || ""
  }`;
  eventOrganizerFullName =
    eventOrganizerFullName?.trim()?.length < 1
      ? "Event Organizer"
      : eventOrganizerFullName;

  let phyicalAddress = event?.eventLocations?.[0]?.address;
  let phyicalAddressList = event?.eventLocations
    ?.map((it) => {
      return it?.address;
    })
    ?.join(", ");

  const formattedDate =
    event?.date || event?.eventStartDate
      ? format(new Date(event?.date || event?.eventStartDate), "yyyy-MMM-dd")
      : "";
  const dayName = event?.eventStartDate
    ? format(new Date(event?.eventStartDate), "EEEE")
    : "";
  // Final label logic
 const dateLabel =
    event?.schedulingType !== SCHEDULING_TYPES.RECURRING
      ? event?.eventType === EVENT_TYPES.OPEN
        ? languageTranslatorUtil(language,"ms_values","yourPreferredTime")
        : event?.eventType === EVENT_TYPES.PUBLIC ||
          event?.eventType === EVENT_TYPES.PRIVATE
        ? formattedDate
        : languageTranslatorUtil(language,"ms_values","startingAt")
      : (event?.eventType === EVENT_TYPES.OPEN
        ? languageTranslatorUtil(language,"ms_values","yourPreferredTime")
        : `${languageTranslatorUtil(language,"common_stringTemplates","everyLabel")} ${languageTranslatorUtil(language,"common_stringTemplates","daysOfWeek",dayName)
}`
      );
 
  const handleWishlistClick = () => {
    if (wishListed) {
      // Show confirmation modal for removal
      setShowConfirmModal(true);
    } else {
      // Add to wishlist directly
      addWishListedEventBtn();
    }
  };

  const handleConfirmRemoval = () => {
    removeWishListedEventBtn();
    setShowConfirmModal(false);
  };

  const handleCancelRemoval = () => {
    setShowConfirmModal(false);
  };

  async function removeWishListedEventBtn() {
    //remove from the store
    //remoce from the local store
    //remove from the backend

    const result = await doRemoveWishList({ eventId: event._id });
    if (result.success) {
      dispatch(removeWishListedEvent(event));
      setWishListed(false);
      showToast("success", languageTranslatorUtil(language,"toastMessages","staticSuccessMsgs","eventWishlistRemoveSuccess"));
    } else {
      showToast(
        "error",
        result?.error?.message || languageTranslatorUtil(language,"toastMessages","staticErrors","eventWishlistRemoveFailure")
      );
    }
  }

  async function addWishListedEventBtn() {
    const result = await doAddWishList({ eventId: event._id });

    if (result.success) {
      setWishListed(true);
      dispatch(addWishListedEvent(event));
      showToast("success", languageTranslatorUtil(language,"toastMessages","staticSuccessMsgs","wishListEventSuccess"));
    } else {
      showToast(
        "error",
        result?.error?.message || languageTranslatorUtil(language,"toastMessages","staticErrors","wishListEventFailure")
      );
    }
  }

  const handleViewDetails = () => {
    // Save current scroll position before navigating
    const currentState = JSON.parse(sessionStorage.getItem('eventsPageState') || '{}');
    currentState.scrollPosition = window.scrollY;
    sessionStorage.setItem('eventsPageState', JSON.stringify(currentState));

    // Set flag to indicate we're navigating from events page
    sessionStorage.setItem('returningFromEvent', 'true');

    const eventRoute = `events/${event?._id || "E1003"}`;
    navigate(`/${eventRoute}`);
  };

  // FUNCTION: handle book now button click
  const handleBookNow = async () => {
    if (!event) {
      console.error("Event data is not available for booking.");
      return;
    }
    // Prepare the event data to be passed to the booking function
    const eventData = {
      eventId: event?._id || "E1003",
      schedulingType: event?.schedulingType || SCHEDULING_TYPES.ONETIME,
      eventType: event?.eventType || EVENT_TYPES.PUBLIC,
      eventName: event?.name,
      eventDate: event?.date,
      eventHostName: eventOrganizerFullName,
      startTime: event?.startingTime,
      endTime: event?.endingTime,
      eventLocation: phyicalAddress,
      flyer: event?.flyer,
    };

    // Call the booking function with the event data
    const result = await doBookEvent(eventData);
    if (result.error) {
      showToast("error", result.error.message || languageTranslatorUtil(language,"toastMessages","staticErrors","failedBookEvent"));
      return;
    }
    showToast("success", languageTranslatorUtil(language,"toastMessages","staticSuccessMsgs","eventBookedSuccess"));
  };

  // FUNCTION: handle chat now button click
  const handleStartChat = async (user2Id) => {
    if (user2Id) {
      const response = await doCreateThread(user2Id);
      dispatch(fromToChatSaveSate(location.pathname + location.search));
      if (response?.success) {
        navigate(`/chat?thread=${response?.response?.data?._id}`);
      } else {
        if (response?.error?.customCode === ErrorCodes.DUPLICATE_ENTRIES.code) {
          navigate(
            `/chat?thread=${response?.error?.message
              ?.split(":")[1]
              ?.toString()
              ?.trim()}`
          );
        } else {
          showToast("error", response?.error?.message || languageTranslatorUtil(language,"toastMessages","staticErrors","errorOccurred"));
        }
      }
    } else {
      showToast("error", languageTranslatorUtil(language,"toastMessages","staticErrors","missingSpId"));
    }
  };

  // Todo:Polish Tarnslation below

  const confirmationOptions = {
    type: "delete",
    title: languageTranslatorUtil(language,"ms_values","removeFromWishlist"),
    message: `${languageTranslatorUtil(language,"ms_values","areYouSureYouWantToRemove")} "${
      event?.name || languageTranslatorUtil(language,"ms_values","thisEvent")
    }" ${languageTranslatorUtil(language,"ms_values","fromYourWishlist")}`,
    confirmText: languageTranslatorUtil(language,"ms_values","remove"),
    cancelText: languageTranslatorUtil(language,"add_review_popup","cancelButton"),
  };

  return (
    <>
      <div className="relative max-w-[293px] h-auto overflow-hidden bg-white border shadow-md rounded-lg font-roboto">
        {
          isExpired && 
          <div className="absolute justify-center items-center w-full h-[100%] z-30 bg-gray-500 opacity-40">
            {/* <div className="flex justify-center items-center w-full h-[100%] text-white text-[24px] font-[700px]">
              <p>Event Expired</p>
            </div> */}
          </div>
        }      
        <div className="relative">
          <div
            className={twMerge(
              "relative w-[292px] h-[292px] cursor-pointer",
              eventImageLoaded ? "bg-transparent" : "bg-gray-300 animate-pulse"
            )}
            onClick={handleViewDetails}
          >
            <LazyLoadImage
              src={event?.flyer || NoPreviewImage}
              placeholderSrc={NoPreviewImage}
              alt="Event"
              className="object-cover w-[292px] h-[292px]"
              effect="blur"
              onLoad={() => setEventImageLoaded(true)}
              onError={(e) => {
                e.target.onerror = null; // prevent looping
                e.target.src = NoPreviewImage;
                setEventImageLoaded(true);
              }}
            />
          </div>

          {event?.eventType === EVENT_TYPES.OPEN && (
            <span className="absolute px-3 py-1 text-sm font-normal text-black bg-[var(--primary-bg-color)] rounded-[4px] shadow-sm top-[11px] left-[14.5px] pointer-events-none">
              {languageTranslatorUtil(language,"common_stringTemplates","openEventLabel")}
            </span>
          )}

          {/* <button
            className={`absolute p-2 bg-white rounded-full shadow-sm top-3 right-3 z-50 ${
              isAddingWishList || isRemovingWishList ? " animate-pulse" : ""
            }`}
            onClick={handleWishlistClick}
            disabled={isAddingWishList || isRemovingWishList}
          >
            {wishListed ? <RiDeleteBinLine size={20} /> : <CiHeart size={20} />}
          </button> */}

          {event?.schedulingType === SCHEDULING_TYPES.RECURRING && (
            <span className="absolute bottom-0 w-full py-1 text-sm font-normal text-center text-black bg-primary">
                            {languageTranslatorUtil(language,"common_stringTemplates","recurringLabel")}
            </span>
          )}
          {/*
        {event?.schedulingType === SCHEDULING_TYPES.RECURRING && (
          <span className="absolute bottom-0 w-full py-1 text-sm font-normal text-center text-black bg-primary">
            Subscription Event
          </span>
        )}
         */}
        </div>

        {/* Event Info */}
        <div className="p-4">
          <div className="space-y-2">
            <div
              className="flex justify-between pb-2"
              style={{ alignItems: "center" }}
            >
              <p
              className={`text-xl font-semibold text-primary-text hover:text-primary cursor-pointer animate-transition transition duration-300 text-nowrap truncate ${event?.eventType === EVENT_TYPES.OPEN ? 'max-w-[115px]' : 'max-w-[133px]'}`}
                onClick={handleViewDetails}
                style={{ margin: 0, lineHeight: "normal" }}
              >
                                                            {/* //Or Negotiable */}
                {event?.eventType === EVENT_TYPES.OPEN ? languageTranslatorUtil(language,"ms_values","flexiblePricing") :  
                currencyFormatter.format(event?.paymentMethod?.includes(PAYMENT_METHODS?.SUBSCRIPTION) ? event?.pricePerMonth || event?.price || 0.0 : event?.price || 0.0)}
              </p>
              <span
              
              className={`${dateLabel !== "Twój preferowany czas" ? "px-2" : ""} py-1 text-sm font-normal text-deep-gray bg-[var(--primary-bg-color)] rounded-[4px] text-center`}

                style={{ lineHeight: "normal" }}
              >
                {dateLabel}
              </span>
            </div>
          </div>

          <p
              className="mt-0 font-bold text-lg text-light-gray leading-[1.375rem] mb-[4px] hover:text-primary cursor-pointer animate-transition transition duration-300 truncate"
              onClick={handleViewDetails}
              style={{ lineHeight: "normal" }}
              title={event?.name}
          >
            {truncateText(event?.name, 25)}
          </p>
          <p className="mt-0 text-xs text-dark-gray text-opacity-50 leading-[1.375rem] mb-[8px]">
            {languageTranslatorUtil(language,"common_stringTemplates","byServiceProvider")}{" "}
            <span
                className="hover:text-primary cursor-pointer animate-transition transition duration-300"
                onClick={() => {
                  navigate(`/client-service-provider/${event?.organizer?._id}`);
                }}>
                {eventOrganizerFullName}
            </span>
          </p>


          {/* Time or Custom Text */}
          {event?.eventType === EVENT_TYPES.OPEN ? (
            <div className="flex items-center h-[44px] text-xs text-dark-gray text-opacity-50 leading-[14px] mt-0">
              <p className="text-light-gray font-roboto">
                {/* //Todo: polish tarnslation */}
                {languageTranslatorUtil(language,"ms_values","startChatPlanEvent")}
              </p>
            </div>
          ) : (
            <div className="flex justify-between mt-0 mb-3 text-xs leading-[1.375rem] text-dark-gray text-opacity-50">
              <p>
                <span className="font-normal text-dark-gray">{languageTranslatorUtil(language,"common_stringTemplates","startAtLabel")}</span>{" "}
                {formatHH_MM_SS(event?.startingTime || "")?.length > 1
                  ? formatHH_MM_SS(event?.startingTime || "")
                  : "Starting time"}
              </p>
              <p>
                <span className="font-normal text-dark-gray">{languageTranslatorUtil(language,"common_stringTemplates","endAtLabel")}</span>{" "}
                {formatHH_MM_SS(event?.endingTime || "")?.length > 1
                  ? formatHH_MM_SS(event?.endingTime || "")
                  : "Ending time"}
              </p>
            </div>
          )}

          <div className="flex justify-between items-center gap-1 text-sm text-light-gray mb-[12px]">
            <div className="flex items-center flex-1 min-w-0">
              <div
                className={twMerge(
                  "w-4 h-4 flex-shrink-0 -translate-x-[2px]",
                  locationIconLoaded
                    ? "bg-transparent"
                    : "bg-gray-200 animate-pulse"
                )}
              >
                <LazyLoadImage
                  src={LocationPinIcon}
                  placeholderSrc={LocationPinIcon}
                  alt="Location"
                  className="w-4 h-4 flex-shrink-0"
                  effect="blur"
                  onLoad={() => setLocationIconLoaded(true)}
                />
              </div>
              <span
                className="truncate ml-1"
                title={
                  phyicalAddressList?.length > 1
                    ? phyicalAddressList
                    : "Address"
                }
              >
                {truncateText(
                  phyicalAddressList?.length > 1
                    ? phyicalAddressList
                    : languageTranslatorUtil(language,"ms_values","address"),
                  25
                )}
              </span>
            </div>

            <div className="flex-shrink-0">
              {
                currentLocation?.savedLocationEnabled &&
                <span>{event?.distanceInKm || 0} KM</span>
              }
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleViewDetails}
              className="flex-1 py-2 text-base font-semibold text-primary bg-white rounded-[4px] border border-primary leading-none"
            >
              {/* //Todo: polish translation */}
              {languageTranslatorUtil(language,"ms_values","viewDetails")}
            </button>
            {event?.eventType === EVENT_TYPES.OPEN ? (
              // <button
              //   onClick={() => navigate('/chat')}
              //   className="flex-1 py-2 text-base text-white font-semibold bg-primary rounded-[4px]"
              // >
              //   Chat Now
              // </button>
              <CustomButton
                type="button"
                className={`flex-1 text-base text-white font-semibold bg-primary rounded-[4px] whitespace-pre-line ${language === "ENGLISH" ? "py-2" : "py-8"}`}
                buttonText={language==="ENGLISH"? languageTranslatorUtil(language,"common_stringTemplates","chatNowButton") : languageTranslatorUtil(language,"common_stringTemplates","chatNowButton").split(" ")[0]+"\n"+languageTranslatorUtil(language,"common_stringTemplates","chatNowButton").split(" ")[1]}
                onClick={() => {
                  handleStartChat(event?.organizer?._id?.toString());
                }}
                loading={isBookingEvent}
                disabled={isCreateThread}
                textWeight="font-bold leading-none"
              />
            ) : ( // NOTE; disable the button if the maximum attendees count have neeb reached
              event?.maximumAttendees <= event?.participantCount ?
                <Tooltip
                    title={languageTranslatorUtil(language,"toolTips","maximumAttendees")}
                    placement="top"
                    overlayStyle={{ maxWidth: "300px" }}
                >
                  <CustomButton
                    type="button"
                    className={`flex-1 text-base text-white font-semibold bg-primary rounded-[4px] whitespace-pre-line ${language === "ENGLISH" ? "py-2" : "py-8"}`}
                    buttonText={language==="ENGLISH"? languageTranslatorUtil(language,"common_stringTemplates","bookNowButton") : languageTranslatorUtil(language,"common_stringTemplates","bookNowButton").split(" ")[0]+"\n"+languageTranslatorUtil(language,"common_stringTemplates","bookNowButton").split(" ")[1]}
                    // onClick={handleBookNow}
                    onClick={() => {
                      navigate(`/events/${event?._id || ""}/checkout`);
                    }}
                    loading={isBookingEvent}
                    disabled={isBookingEvent || event?.maximumAttendees <= event?.participantCount}
                    textWeight="font-bold leading-none"
                  />
                </Tooltip>
                :
                <CustomButton
                  type="button"
                  className={`flex-1 text-base text-white font-semibold bg-primary rounded-[4px] whitespace-pre-line ${language === "ENGLISH" ? "py-2" : "py-8"}`}
                 buttonText={language==="ENGLISH"? languageTranslatorUtil(language,"common_stringTemplates","bookNowButton") : languageTranslatorUtil(language,"common_stringTemplates","bookNowButton").split(" ")[0]+"\n"+languageTranslatorUtil(language,"common_stringTemplates","bookNowButton").split(" ")[1]}

                  // onClick={handleBookNow}
                  onClick={() => {
                    navigate(`/events/${event?._id || ""}/checkout`);
                  }}
                  loading={isBookingEvent}
                  disabled={isBookingEvent || event?.maximumAttendees <= event?.participantCount}
                  textWeight="font-bold leading-none"
                />
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        options={confirmationOptions}
        onConfirm={handleConfirmRemoval}
        onCancel={handleCancelRemoval}
      />
    </>
  );
};
export default EventCard;