import React from 'react'

const EventInforBox = () => {

  const steps = [
    {
      number: 1,
      text: "Discuss event details with the service provider through chat (e.g., theme, number of guests, location, and special requests). "
    },
    {
      number: 2,
      text: "Wait for the service provider to send a customized event plan and price offer."
    },
    {
      number: 3,
      text: "Review and accept the offer to proceed with payment."
    },
    {
      number: 4,
      text: "Once the event is completed, confirm it and leave a review."
    }
  ];

  return (
    <div className="h-full flex justify-center items-center ">
      <div className="border-2 w-full h-full md:h-full flex flex-col bg-[#C5C5C559] rounded-xl xs:p-2 lg:p-5">
        <h2 className="xs:font-normal xs:text-lg xs:p-1 md:font-normal md:text-lg md:p-2 leading-[100%] tracking-[0] capitalize font-inter text-deep-gray lg:mb-5 lg:p-0 lg:text-level-4 lg:font-medium">Event Plan Proceed</h2>
        <ol className="md:space-y-5 lg:space-y-7">
          {steps.map((step) => (
            <li key={step.number} className="flex items-start md:pl-2">
              <div className="flex-shrink-0 xs:w-5 xs:h-5 xs:mt-1 xs:text-xs md:w-4 md:h-4 md:mt-1 md:text-xs lg:w-6 lg:h-6 lg:text-level-6 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold mr-4">
                {step.number}
              </div>
              <p className="text-gray-700 xs:text-sm md:text-xs md:pr-2 lg:text-level-5 lg:mt-1">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default EventInforBox
