import React from 'react'

const EventDescription = ({description, maxAttendance, duration}) => {
  return (
    <div className='flex flex-col items-start gap-5'>
      <h2 className='font-medium font-sf_pro text-2xl leading-[100%] tracking-[0] capitalize text-[#334155]'>
        Event Description
      </h2>
      <p className="font-sf_pro font-normal text-base leading-[25px] tracking-[0] text-justify text-[#334155]"  style={{ whiteSpace: "pre-line" }}>
        {description}
      </p>
      <ul className='list-disc ml-6 text-[17px] font-sf_pro leading-[22px] tracking-[0] text-[#5C5F6A]'>
        <li><span>Maximum Attendees:</span>{maxAttendance} members</li>
        <li><span>Duration:</span>{duration} hours</li>
      </ul>
    </div>
  )
}

export default EventDescription
