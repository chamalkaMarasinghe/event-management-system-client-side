import React from 'react';

export const HeroImageSkeleton = () => {
    return (
        <div className='w-full h-[100%] p-5 md:p-0 overflow-hidden'>
            <div className="animate-pulse h-[100%] w-full bg-slate-300 md:rounded-2xl rounded-2xl"></div>
        </div>
    );
};