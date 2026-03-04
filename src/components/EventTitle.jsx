import React from 'react'
import { FaRegHeart } from "react-icons/fa";

const EventTitle = ({eventTitle}) => {
  return (
    <div className='md:w-full 2xl:h-[45px] flex items-start justify-between'>
      <h1 className="text-level-3 sm:text-level-2 md:text-2xl lg:text-2xl xl:text-4xl font-medium font-sf_pro text-dark-black mr-2">
        {eventTitle}
      </h1>
      <FaRegHeart className='text-primary text-4xl mt-1 md:mr-0 md:mt-1 lg:text-3xl xl:mt-2 ' />
    </div>
  )
}

export default EventTitle
