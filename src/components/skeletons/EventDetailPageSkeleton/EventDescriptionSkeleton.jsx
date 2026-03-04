import React from 'react';

export const EventDescriptionSkeleton = () => {
    return (
        <div className='flex flex-col items-start gap-5'>
            <div className="animate-pulse h-8 bg-slate-300 rounded w-1/3"></div>
            <div className="animate-pulse h-4 bg-slate-300 rounded w-full"></div>
            <div className="animate-pulse h-4 bg-slate-300 rounded w-full"></div>
            <div className="animate-pulse h-4 bg-slate-300 rounded w-3/4"></div>
            <ul className='list-disc ml-6 w-full'>
                <li className="flex mt-2">
                    <div className="animate-pulse h-4 bg-slate-300 rounded w-1/2"></div>
                </li>
                <li className="flex mt-2">
                    <div className="animate-pulse h-4 bg-slate-300 rounded w-1/3"></div>
                </li>
            </ul>
        </div>
    );
};