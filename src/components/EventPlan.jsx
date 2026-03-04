import { format } from "date-fns";
import LocatioPinIcon from "../../assets/icons/location-pin.png";
import { CiHeart } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import image from "../../assets/images/image.png";
import { EVENT_TYPES } from "../../constants/commonConstants";

const EventCard = ({
  eventType = EVENT_TYPES.PUBLIC,
  imageURL,
  price,
  eventName,
  eventDate,
  eventHostName,
  startTime,
  endTime,
  eventLocation,
  showDeleteIcon = false,
  isSubscription = false,
}) => {
  const formattedDate = eventDate
    ? format(new Date(eventDate), "yyyy-MMM-dd")
    : "";

  const dayName = eventDate
    ? format(new Date(eventDate), "EEEE")
    : "";

  // Final label logic
  const dateLabel =
    eventType === EVENT_TYPES.PUBLIC || eventType === EVENT_TYPES.RECURRING
      ? formattedDate
      : `Every ${dayName}`;

  return (
    <div className="max-w-[290px] h-auto overflow-hidden bg-white border shadow-md rounded-lg font-sf_pro">
      <div className="relative">
        <img
          src={image}
          alt="Event"
          className="object-cover w-[292px] h-[292px]"
        />

        {eventType === EVENT_TYPES.OPEN && (
          <span className="absolute px-3 py-1 text-sm font-normal text-black bg-[var(--primary-bg-color)] rounded-[4px] shadow-sm top-[11px] left-[14.5px]">
            Open Event
          </span>
        )}

        <button className="absolute p-2 bg-white rounded-full shadow-sm top-3 right-3">
          {showDeleteIcon ? <RiDeleteBinLine size={20} /> : <CiHeart size={20} />}
        </button>

        {eventType === EVENT_TYPES.RECURRING && (
          <span className="absolute bottom-0 w-full py-1 text-sm font-normal text-center text-black bg-primary">
            Recurring Event
          </span>
        )}

        {isSubscription && (
          <span className="absolute bottom-0 w-full py-1 text-sm font-normal text-center text-black bg-primary">
            Subscription Event
          </span>
        )}
      </div>

      {/* Event Info */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <p className="text-xl leading-[1.75rem] font-semibold text-primary-text font-sf_pro">
            {price}
          </p>
          <span className="px-2 py-1 text-sm font-normal text-deep-gray bg-[var(--primary-bg-color)] rounded-[4px]">
            {dateLabel}
          </span>
        </div>

        <p className="mt-2 text-sm font-normal text-light-gray leading-[1.375rem]">
          {eventName}
        </p>
        <p className="mt-1 text-xs text-dark-gray text-opacity-50 leading-[1.375rem]">
          By {eventHostName}
        </p>

        {/* Time or Custom Text */}
        {eventType === EVENT_TYPES.OPEN ? (
          <div className="flex items-center h-[44px] text-xs text-dark-gray text-opacity-50 leading-[14px]">
            <p className="text-light-gray">
              Start a chat to plan your event with the organizers.
            </p>
          </div>
        ) : (
          <div className="flex justify-between mt-2 mb-3 text-xs leading-[1.375rem] text-dark-gray text-opacity-50">
            <p>
              <span className="font-normal text-dark-gray">Start at:</span>{" "}
              {startTime}
            </p>
            <p>
              <span className="font-normal text-dark-gray">End at:</span>{" "}
              {endTime}
            </p>
          </div>
        )}

        <div className="flex items-center gap-1 text-sm leading-[1.375rem] text-light-gray">
          <img src={LocatioPinIcon} alt="Location" className="w-4 h-4" />
          <span>{eventLocation}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-3">
          <button className="flex-1 py-2 text-base font-semibold text-white bg-primary rounded-[4px]">
            View Details
          </button>
          <button className="flex-1 py-2 text-base text-primary font-semibold bg-white rounded-[4px] border border-primary">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
