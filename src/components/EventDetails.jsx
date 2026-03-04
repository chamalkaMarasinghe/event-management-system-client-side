import React, { useState, useEffect } from 'react';

// Dump Components
import { eventDetails } from "../../../Data/Data"
import  HeroImage from './HeroImage';
import EventTitle from './EventTitle';
import EventHostProfile from './EventHostProfile';
import InfoChip from './InfoChip';
import CustomButton from '../../Form/CustomButton';
import EventMap from './EventMap';
import EventDescription from './EventDescription';
import EventInforBox from './EventInforBox';

import { MdCalendarMonth } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { GiPathDistance } from "react-icons/gi";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { CiCalendar } from "react-icons/ci";
import { EVENT_TYPES } from '../../../constants/commonConstants';


const EventDetails = ({id}) => {

  // Simulate event data fetch
  const [eventData, setEventData] = useState({});

  // test data: E1001, E1003, E1004
  const eventId = id;

  useEffect(() => {
    console.log('Event data fetching');
    const fetchedEvent = eventDetails.find(item => item.id === eventId);
    console.log('result', fetchedEvent);
    setEventData(fetchedEvent);
  }, []);

  console.log('event Data', eventData);

  if (!eventData || Object.keys(eventData).length === 0) return <div>Loading...</div>;

  return (
    <main className="flex flex-col w-full min-h-screen md:px-20 md:pb-10 gap-y-10">

      <section className="flex flex-col w-full lg:flex-row md:gap-14">

        <div className="flex flex-col flex-1 order-1 gap-4 p-5 md:p-0 lg:order-2">
          <EventTitle eventTitle={eventData?.title} />

          <EventHostProfile
            username={eventData?.host?.username}
            profilePic={eventData?.host?.avatarUrl}
            category={eventData?.category}
          />

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <InfoChip icon={MdCalendarMonth} label="Date & Time" value="2025-Sep-14 at 10.00AM" recurring={eventData.recurring} />
            <InfoChip icon={IoLocationOutline} label="Location" value={eventData.location.city} />
            <InfoChip icon={GiPathDistance} label="Distance" value="16KM" />
            <InfoChip icon={HiOutlineCurrencyDollar} label="Price" value="$40.20" />
            { eventData.isSubcription && <InfoChip icon={CiCalendar} label="Event" value="Subscription" />}
          </div>

          <div className="flex justify-between">
            <div className="flex gap-3 w-[60%] sm:w-[65%]">
              {eventData.type === EVENT_TYPES.OPEN ?
                <CustomButton
                  buttonText="Book Now"
                  className="h-8 rounded-md text-xs px-0 font-normal w-24 md:h-9 md:w-[85px] md:text-xs md:font-medium md:rounded-md md:px-0 lg:h-10 lg:w-auto custom-w-br-1180:text-base lg:font-semibold lg:rounded-lg lg:px-7 gap-[10px] py-3 bg-primary "
                /> : 
                <CustomButton
                  buttonText="Chat Now"
                  className="h-8 rounded-md text-xs px-0 font-normal w-24 md:h-9 md:w-[85px] md:text-xs md:font-medium md:rounded-md md:px-0 lg:h-10 lg:w-auto custom-w-br-1180:text-base lg:font-semibold lg:rounded-lg lg:px-7 gap-[10px] py-3 bg-primary "
                />
              }
              <CustomButton
                buttonText="View Profile"
                className="h-8 rounded-md text-xs px-0 font-normal w-24 md:h-9 md:w-[85px] md:text-xs md:font-medium md:rounded-md md:px-0 lg:w-auto lg:h-10 custom-w-br-1180:text-base lg:rounded-lg lg:font-semibold py-3 lg:px-7 bg-white border border-primary text-primary gap-[10px]"
              />
            </div>
            {eventData.type !== EVENT_TYPES.OPEN &&
              <CustomButton
                buttonText="Chat Now"
                className="h-8 rounded-md text-xs px-0 font-normal w-24 md:h-9 md:w-[85px] md:text-xs md:font-medium md:rounded-md md:px-0 lg:h-10 lg:w-auto gap-[10px] custom-w-br-1180:text-base lg:rounded-lg py-3 lg:font-semibold lg:px-7 bg-deep-gray text-white"
              />}
          </div>

          {(eventData.type === EVENT_TYPES.PUBLIC || eventData.type === EVENT_TYPES.PRIVATE) && <EventMap />}
          {eventData.type === EVENT_TYPES.OPEN && <EventInforBox />}

        </div>

        <div 
          className={`
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
          <HeroImage imageUrl={eventData?.imageUrl} />
        </div>
      </section>

      <section className="w-full h-full p-5 md:p-0">
        {/* <EventDescription
          maxAttendance={eventData?.duration}
          duration={eventData?.maxAttendees}
          description={eventData?.description}
        /> */}
      </section >
    </main>
  )
}

export default EventDetails

