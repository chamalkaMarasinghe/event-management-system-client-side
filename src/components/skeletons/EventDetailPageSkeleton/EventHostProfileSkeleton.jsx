import React from 'react';

export const EventHostProfileSkeleton = () => {
    return (
        <div className='md:h-[48px] w-full flex items-center gap-3'>
            <div className="animate-pulse h-9 w-9 xs:h-10 xs:w-10 bg-slate-300 rounded-full"></div>
            <div className='flex flex-col gap-2 w-3/4'>
                <div className="animate-pulse h-4 bg-slate-300 rounded w-2/3"></div>
                <div className="animate-pulse h-4 bg-slate-300 rounded w-1/2"></div>
            </div>
        </div>
    );
};