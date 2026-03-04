import React from 'react'

const HeroImage = ({imageUrl, alt="image alt"}) => {
  return (
    <div className='w-full h-[100%] p-5 md:p-0 overflow-hidden'>
      <img
        src={imageUrl}
        alt={alt}
        className='h-[100%] w-full object-cover md:rounded-2xl rounded-2xl'
      />
    </div>
  )
}

export default HeroImage
