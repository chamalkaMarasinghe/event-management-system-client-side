import React from 'react';

export const EventTitleSkeleton = () => {
    return (
        <div className='md:w-full 2xl:h-[45px] flex items-start justify-between'>
            <div className="animate-pulse h-8 sm:h-10 md:h-10 lg:h-10 xl:h-12 bg-slate-300 rounded w-3/4"></div>
            <div className="animate-pulse h-8 w-8 bg-slate-300 rounded-full mt-1"></div>
        </div>
    );
};