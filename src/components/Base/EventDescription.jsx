import React from "react";
import { useLanguage } from "../../context/language/language";
import { languageTranslatorUtil } from "../../utils/languageTranslatorUtil";
import { EVENT_TYPES } from "../../constants/commonConstants";

const formatDuration = (durationStr,language) => {
  let hours = 0;
  let minutes = 0;

  if (!durationStr || durationStr.trim() === "") {
    return  durationStr;
  }

  // Match "X hour(s)" and "Y minute(s)" if present
  const hourMatch = durationStr.match(/(\d+)\s*hour/);
  const minuteMatch = durationStr.match(/(\d+)\s*minute/);

  if (hourMatch) {
    hours = parseInt(hourMatch[1], 10);
  }

  if (minuteMatch) {
    minutes = parseInt(minuteMatch[1], 10);
  }

  let hoursString = "";
  let minuteString = "";

  // Build hours part
  if (hours > 0) {
    hoursString = `${hours} ${hours === 1 ? languageTranslatorUtil(language,"ms_values","hour") : languageTranslatorUtil(language,"ms_values","hours")}`;
  }

  // Build minutes part
  if (minutes > 0) {
    minuteString = `${minutes} ${minutes === 1 ? languageTranslatorUtil(language,"ms_values","minute") : languageTranslatorUtil(language,"ms_values","minutes")}`
  
  }
  // Handle 0 hours and 0 minutes
  if (hours === 0 && minutes === 0) {
    minuteString = "0 minutes";
  }

  // Final duration string
  return [hoursString, minuteString].filter(Boolean).join(" ");
};

const EventDescription = ({
  description,
  maxAttendance,
  duration,
  eventType,
}) => {
  const { language } = useLanguage();
  const formattedDuration = formatDuration(duration,language);

  
  return (
    <div className="flex flex-col items-start gap-5">
      <h2 className="font-roboto font-medium text-[24px] capitalize text-2xl leading-[100%] tracking-[0] text-dark-gray mb-0">
        {languageTranslatorUtil(
          language,
          "event_details_page",
          "eventDescriptionLabel"
        )}
      </h2>
      <p className="font-roboto font-normal text-[16px] leading-[25px] text-base tracking-[0] text-justify text-dark-gray mb-0"  style={{ whiteSpace: "pre-line" }}>
        {description}
      </p>
      {/* Only show details if NOT open event */}
      {eventType !== EVENT_TYPES.OPEN && (
        <ul className="list-disc ml-6 font-roboto font-normal leading-[22px] text-[17px] tracking-[0] text-light-gray space-y-3">
          {/* //Todo: Polish Tarnslation missing */}
          <li>
            <span>
              {languageTranslatorUtil(
                language,
                "ms_values",
                "maximumAttendees"
              )}{" "}
            </span>
            {maxAttendance}{" "}
            {languageTranslatorUtil(language, "ms_values", "members")}
          </li>
          <li>
            <span>
              {languageTranslatorUtil(language, "ms_values", "duration")}{" "}
            </span>
            {formattedDuration}
          </li>
        </ul>
      )}
    </div>
  );
};

export default EventDescription;
