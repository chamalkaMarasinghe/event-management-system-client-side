import React from 'react'

const EventHostProfile = ({profilePic, username, category}) => {
  return (
    <div className=' md:h-[48px] w-full flex items-center gap-3'>
      <img 
       src={profilePic}
       className='h-9 w-9 xs:h-10 xs:w-10 rounded-full object-cover'
      />
      <div className='flex flex-col'>
        <span className="font-semibold text-level-6 xs:font-semibold xs:text-lg leading-[100%] tracking-[0%] capitalize text-subheadings font-sf_pro opacity-60">
          Hosted By <span className="text-gray-900 ">{username}</span>
        </span>
        <span className="text-level-7 xs:font-normal xs:text-base leading-[22px] tracking-[0%] font-sf_pro text-subheadings opacity-60">
          {category}
        </span>
      </div>
    </div>
  )
}

export default EventHostProfile
