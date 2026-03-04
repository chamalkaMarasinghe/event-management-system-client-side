import React from "react";

const ClientServiceProProfileHeroSkeleton = () => {
    return (
        <div className="mx-6 md:mx-10">
            {/* Profile Hero Section Skeleton */}
            <div className="mb-6">
                <div className="w-full rounded-[6px] border-[1px] border-[#E6E7EC] bg-white">
                    {/* Banner Image Skeleton */}
                    <div className="w-full h-[176px] md:h-[196px] bg-slate-300 animate-pulse relative rounded-tl-[6px] rounded-tr-[6px]">
                        {/* Profile Logo/Avatar Skeleton */}
                        <div className="absolute top-[98px] left-[29px]">
                            <div className="w-[140px] h-[140px] md:w-[170px] md:h-[170px] rounded-full flex items-center justify-center border-4 border-white bg-slate-300 animate-pulse"></div>
                        </div>
                    </div>

                    {/* Profile Content Skeleton */}
                    <div className="pt-[85px] md:pt-[98px] px-[15px] md:pl-7 pb-[19px]">
                        {/* Title Skeleton */}
                        <h1 className="h-7 md:h-8 bg-slate-300 animate-pulse rounded-md w-3/4 mx-auto sm:mx-0 mb-3"></h1>

                        {/* Author Skeleton */}
                        <div className="h-5 md:h-6 bg-slate-300 animate-pulse rounded-md w-1/3 mb-3"></div>

                        {/* Stats Skeleton */}
                        <div className="flex flex-col md:flex-row items-start mb-3 gap-3">
                            <div className="h-5 bg-slate-300 animate-pulse rounded-md w-32"></div>
                            <div className="h-5 bg-slate-300 animate-pulse rounded-md w-36"></div>
                        </div>

                        {/* Description Skeleton */}
                        <div className="space-y-2">
                            <div className="h-4 bg-slate-300 animate-pulse rounded-md w-full"></div>
                            <div className="h-4 bg-slate-300 animate-pulse rounded-md w-full"></div>
                            <div className="h-4 bg-slate-300 animate-pulse rounded-md w-3/4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientServiceProProfileHeroSkeleton;