import React, { useState, useEffect } from 'react';
import { format, getDay } from "date-fns";

// Dump Components
import { eventDetails } from "../../Data/Data"
import  HeroImage from './HeroImage';
import EventTitle from './EventTitle';
import EventHostProfile from './EventHostProfile';
import InfoChip from './InfoChip';
import CustomButton from '../Form/CustomButton';
import EventMap from './EventMap';
import EventDescription from './EventDescription';
import EventInforBox from './EventInforBox';

import { MdCalendarMonth } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { GiPathDistance } from "react-icons/gi";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { CiCalendar } from "react-icons/ci";
import { EVENT_TYPES, PAYMENT_METHODS, SCHEDULING_TYPES } from '../../constants/commonConstants';
import { useLocation, useNavigate } from 'react-router-dom';
import {formatHH_MM_SS, formatYYYY_MMM_DD, getDayOfWeek, getDurationInHours, getDurationLabel} from '../../utils/dateFormating';
import { currencyFormatter } from '../../utils/formatting';
import { languageTranslatorUtil } from '../../utils/languageTranslatorUtil';
import {useThunk} from "../../hooks/useThunk";
import { useLanguage } from '../../context/language/language';
import {bookEvent, getEventById} from "../../store/thunks/eventThunks";
import EventDetailsSkeleton from "../skeletons/EventDetailsSkeleton";
import showToast from "../../utils/toastNotifications";
import { createThread } from '../../store';
import { ErrorCodes } from '../../constants/errorCodes';
import { useCurrentLocation } from '../../context/location/location';
import { useDispatch, useSelector } from 'react-redux';
import { fromToChatSaveSate } from '../../store/slices/userSlice';

const EventDetails = ({id}) => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const currentLocation = useCurrentLocation();
  const {language} = useLanguage();

  // Simulate event data fetch
  const [eventData, setEventData] = useState();

  const eventId = id;
  let  event = null;
  const wishList = useSelector(state => state.auth.user?.wishList)
  const wishListed=  wishList?.some(element => element?._id === eventId)

  const [doGetEvent, isGettingEvent, getEventError] = useThunk(getEventById);
  const [doBookEvent, isBookingEvent, errorBookingEvent] = useThunk(bookEvent);
  const [doCreateThread, isCreateThread, errorCreateThread] = useThunk(createThread);

  // NOTE: extracting the organizer full name
  let eventOrganizerFullName = `${eventData?.organizer?.firstName?.trim() || ""} ${eventData?.organizer?.lastName?.trim() || ""}`;
  eventOrganizerFullName = eventOrganizerFullName?.trim()?.length < 1 ? "Event Organizer" : eventOrganizerFullName;

  const rawDate = eventData?.date || eventData?.eventStartDate;
  const formattedDateForTime = rawDate ? format(new Date(rawDate), "yyyy-MM-dd") : "";
  const start = new Date(`${formattedDateForTime}T${eventData?.startingTime}:00`);
  const end = new Date(`${formattedDateForTime}T${eventData?.endingTime}:00`);

  // const formattedDate = rawDate ? format(new Date(rawDate), "yyyy-MMM-dd") : "";
  // const dayName = eventData?.eventStartDate ? format(new Date(eventData?.eventStartDate), "EEEE") : "";

  // const formattedTime = start ? formatHH_MM_SS(start) : "";

  let dateLabel = languageTranslatorUtil(language,"ms_values","dateTimeUnavailable");

  if (eventData?.schedulingType === SCHEDULING_TYPES.RECURRING) {
    if (eventData?.eventType === EVENT_TYPES.OPEN) {
      dateLabel = languageTranslatorUtil(language,"ms_values","yourPreferredTime");
    } else {
      dateLabel = `${languageTranslatorUtil(language,"home_page","everyLabel")} ${languageTranslatorUtil(language,"common_stringTemplates","daysOfWeek",getDayOfWeek(eventData?.eventStartDate))}
      ${eventData?.eventStartDate ? ` ${languageTranslatorUtil(language,"ms_values","atTime")} ${formatHH_MM_SS(eventData?.eventStartDate)}` : ""}`
    }
  } else {
    if (eventData?.eventType === EVENT_TYPES.OPEN) {
      dateLabel = languageTranslatorUtil(language,"ms_values","yourPreferredTime");
    } else if (eventData?.eventType === EVENT_TYPES.PUBLIC || eventData?.eventType === EVENT_TYPES.PRIVATE) {
      dateLabel = `${formatYYYY_MMM_DD(eventData?.date)}${eventData?.date ? ` ${languageTranslatorUtil(language,"ms_values","atTime")} ${formatHH_MM_SS(eventData?.date)}` : ""}`;
    } else {
      dateLabel = languageTranslatorUtil(language,"ms_values","dateAndStartingTime");
    }
  }

  // NOTE: extracting physical address
  // let physicalAddress = eventData?.eventLocations?.map(it => it?.address)?.join(", ") || "Address";

 //! Updated physicalAddress logic to show first address with "..." for multiple locations
 // Added hasMultipleLocations variable to determine if eventLocations length > 1
  let physicalAddress = eventData?.eventLocations?.length > 1 
    ? `${eventData?.eventLocations?.[0]?.address}.....` 
    : eventData?.eventLocations?.[0]?.address || "Address";
  const hasMultipleLocations = eventData?.eventLocations?.length > 1;

  useEffect(() => {

    const fetchEventData = async () => {
      const result = await doGetEvent({eventId: eventId, clientRoute: location?.pathname, longitude: currentLocation?.longitude, latitude: currentLocation?.latitude});
      if (result.success) {
        event = result.response.data || [];
        setEventData(event); // NOTE: null testing
      } else {
        showToast('error', result?.error?.message|| languageTranslatorUtil(language,"toastMessages","staticErrors","failedEventFetch"))
      }
    };

    if(!currentLocation?.isLoading){
      fetchEventData();
    }

  }, [doGetEvent, eventId, currentLocation?.isLoading]);

  const handleBookNow = async () => {
    if (!eventData) {
      console.error("Event data is not available for booking.");
      return;
    }
    // Prepare the event data to be passed to the booking function
    const bookingPayload  = {
      eventId: eventId,
      schedulingType: eventData?.schedulingType || SCHEDULING_TYPES.ONETIME,
      eventType: eventData?.eventType || EVENT_TYPES.PUBLIC,
      eventName: eventData?.name,
      eventDate: eventData?.date,
      eventHostName: eventOrganizerFullName,
      startTime: eventData?.startingTime,
      endTime: eventData?.endingTime,
      eventLocation: physicalAddress,
    };

    // Call the booking function with the event data
    const result = await doBookEvent(bookingPayload);
    if (result.error) {
      console.error("Error booking event:", result.error);
      showToast("error", result.error.message || languageTranslatorUtil(language,"toastMessages","staticErrors","failedBookEvent"));
      return;
    }
    showToast("success", languageTranslatorUtil(language,"toastMessages","staticSuccessMsgs","eventBookedSuccess"));
  };

  // FUNCTION: handle chat now button click
  const handleStartChat = async(user2Id) => {    
    if(user2Id){
      const response = await doCreateThread(user2Id);
      dispatch(fromToChatSaveSate(location.pathname + location.search));
      if(response?.success){
        navigate(`/chat?thread=${response?.response?.data?._id}`)
      }else{
        if(response?.error?.customCode === ErrorCodes.DUPLICATE_ENTRIES.code){
          navigate(`/chat?thread=${response?.error?.message?.split(":")[1]?.toString()?.trim()}`)
        }else{
          showToast("error", response?.error?.message || languageTranslatorUtil(language,"toastMessages","staticErrors","errorOccurred"));
        }
      }
    }else{
      showToast("error", );languageTranslatorUtil(language,"toastMessages","staticErrors","missingSpId")
    }
  } 

  if (isGettingEvent) return <EventDetailsSkeleton />; // NOTE: loading state

  return (
    <main className="flex flex-col w-full min-h-screen md:px-20 md:pb-10 gap-y-10">

      <section className="flex flex-col w-full lg:flex-row md:gap-14">

        <div className="flex flex-col flex-1 order-1 gap-4 p-5 md:p-0 lg:order-2">
          
          <EventTitle eventTitle={eventData?.name || languageTranslatorUtil(language,"my_orders_page","tableHeaders","eventTitle")}  event={eventData} showDeleteIcon={wishListed}/>

          <EventHostProfile
            username={eventOrganizerFullName || "Event Oraganizer" }
            profilePic={eventData?.organizer?.businessInformation?.logo[0] || null}
            category={languageTranslatorUtil(language,"common_stringTemplates","dropdown",eventData?.category) || "Event Category"}
            organizerId={eventData?.organizer?._id || ''}
          />

          

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <InfoChip icon={MdCalendarMonth} label={languageTranslatorUtil(language,"common_stringTemplates","DateTimeLabel")} value={dateLabel} recurring={eventData?.recurringEventsDates?.length > 0} />

            {/* Modified to set truncate and multipleLocations based on hasMultipleLocations */}
            {/* Added eventLocations prop to InfoChip to pass eventData?.eventLocations directly */}
            <InfoChip 
              icon={IoLocationOutline} 
              label={languageTranslatorUtil(language,"common_stringTemplates","locationLabel")} 
              value={physicalAddress} 
              truncate={hasMultipleLocations}
              multipleLocations={hasMultipleLocations}
              eventLocations={eventData?.eventLocations || []}
            />
            {eventData?.eventType !== EVENT_TYPES.OPEN && <InfoChip icon={GiPathDistance} label={languageTranslatorUtil(language,"event_details_page","distanceLabel")} 
            value={currentLocation?.savedLocationEnabled ? eventData?.distanceInKm ? `${eventData?.distanceInKm} km` : "N/A"  : "N/A"} />}
            <InfoChip icon={HiOutlineCurrencyDollar} label={languageTranslatorUtil(language,"event_details_page","priceLabel")} value={ eventData?.eventType === EVENT_TYPES.OPEN ? languageTranslatorUtil(language,"ms_values","flexiblePricing") : currencyFormatter.format(eventData?.price || 0.00)} />
             { (eventData?.schedulingType === SCHEDULING_TYPES.RECURRING && eventData?.paymentMethod.includes(PAYMENT_METHODS.SUBSCRIPTION) ) ? (
               <InfoChip icon={HiOutlineCurrencyDollar} label={languageTranslatorUtil(language,"event_details_page","monthlyPrice")} value={Number.isFinite(eventData?.pricePerMonth)  ? currencyFormatter.format(eventData?.pricePerMonth) : "N/A"} />
                  ) : <></> }
            {eventData?.schedulingType === SCHEDULING_TYPES.RECURRING && (
                <InfoChip
                    icon={CiCalendar}
                    label={languageTranslatorUtil(language, "checkout_page_subscription_events","eventTypeLabel")?.split(0)}
                    value={
                      Array.isArray(eventData?.paymentMethod) && eventData.paymentMethod.includes(PAYMENT_METHODS.SUBSCRIPTION)
                          ? languageTranslatorUtil(language,"ms_values","subscription")
                          : languageTranslatorUtil(language,"ms_values","recurring")
                    }
                />
            )}
          </div>

          <div className="flex justify-between">
            <div className="flex gap-3 w-[60%] sm:w-[65%]">
              {
                <CustomButton
                  buttonText={languageTranslatorUtil(language,"common_stringTemplates","bookNowButton")}
                  className="h-10 rounded-md text-xs px-0 font-normal w-24 md:h-10 md:w-24 md:text-xs md:font-medium md:rounded-md md:px-0 lg:h-[46px] lg:w-auto custom-w-br-1180:text-base lg:font-semibold lg:rounded-lg lg:px-6 gap-[10px] py-3 bg-primary "
                  onClick={() => {navigate(`/events/${eventData?._id}/checkout`)}}
                  loading={isBookingEvent}
                  disabled={isBookingEvent || eventData?.participantCount >= eventData?.maximumAttendees}
                  textWeight="font-bold leading-none"
                /> 
              }
            </div>
          </div>

          <div className="w-full hidden h-[100%] lg:block">
            {(eventData?.eventType === EVENT_TYPES.PUBLIC || eventData?.eventType === EVENT_TYPES.PRIVATE) && (
              <EventMap eventLocations={eventData?.eventLocations || []} />
            )}
          </div>
          {eventData?.eventType === EVENT_TYPES.OPEN && <EventInforBox />}

        </div>

        <div 
          className={`
            flex flex-col gap-4
            flex-1 
            order-2 
            md:order-1
            lg:min-w-[420px] 
            lg:max-w-[420px] 
            lg:h-[420px]
            custom-w-br-1180:min-w-[520px] 
            custom-w-br-1180:max-w-[520px] 
            custom-w-br-1180:h-[520px]
            xl:min-w-[580px] 
            xl:max-w-[580px] 
            xl:h-[580px]
            custom-w-br-1366:min-w-[630px] 
            custom-w-br-1366:max-w-[630px] 
            custom-w-br-1366:h-[630px]
          `}
        >
          <div className="h-full max-h-[300px] lg:h-[600px] custom-w-br-1180:h-[632px] xl:h-[636px] custom-w-br-1366:h-[640px]">
            <HeroImage imageUrl={eventData?.flyer?.[0]} />
          </div>
          
          <div className="block px-5 mt-5 lg:hidden">
            {(eventData?.eventType === EVENT_TYPES.PUBLIC || eventData?.eventType === EVENT_TYPES.PRIVATE) && (
              <EventMap eventLocations={eventData?.eventLocations || []} />
            )}
          </div>
        </div>
      </section>

      <section className="w-full h-full p-5 md:p-0">
        {/* <EventDescription
            maxAttendance={eventData?.maximumAttendees || 0}
            duration={eventData?.duration || 0}
            description={eventData?.description}
            eventType={eventData?.eventType}
        /> */}
      </section >
    </main>
  )
}

export default EventDetails



