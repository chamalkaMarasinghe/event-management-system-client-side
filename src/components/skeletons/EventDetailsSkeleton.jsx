import React from 'react';

import { EventTitleSkeleton } from "./EventDetailPageSkeleton/EventTitleSkeleton";
import { EventHostProfileSkeleton } from "./EventDetailPageSkeleton/EventHostProfileSkeleton";
import { InfoChipSkeleton } from "./EventDetailPageSkeleton/InfoChipSkeleton";
import { ButtonSkeleton } from "./EventDetailPageSkeleton/ButtonSkeleton";
import { EventMapOrInfoBoxSkeleton } from "./EventDetailPageSkeleton/EventMapOrInfoBoxSkeleton";
import { HeroImageSkeleton } from "./EventDetailPageSkeleton/HeroImageSkeleton";
import { EventDescriptionSkeleton } from "./EventDetailPageSkeleton/EventDescriptionSkeleton";

const EventDetailsSkeleton = () => {

    const infoChipKeys = [1, 2, 3, 4];

    return (
        <main className="flex flex-col min-h-screen w-full md:px-20 md:pb-10 gap-y-10">
            <section className="flex flex-col lg:flex-row md:gap-14 w-full ">
                {/* Event Details Column */}
                <div className="flex flex-col gap-4 order-1 p-5 md:p-0 lg:order-2">
                    {/* Title Skeleton */}
                    <EventTitleSkeleton />

                    {/* Host Profile Skeleton */}
                    <EventHostProfileSkeleton />

                    {/* Info Chips Skeleton */}
                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                        {infoChipKeys.map((key) => (
                            <InfoChipSkeleton key={key} />
                        ))}
                    </div>

                    {/* Buttons Skeleton */}
                    <div className="flex justify-between">
                        <div className="flex gap-3">
                            <ButtonSkeleton />
                            <ButtonSkeleton />
                        </div>
                        <ButtonSkeleton />
                    </div>

                    {/* MapOrInfoBox Skeleton */}
                    <EventMapOrInfoBoxSkeleton />
                </div>

                {/* Hero Image Skeleton */}
                <div 
                    className={`
                        flex-1 
                        order-2 
                        md:order-1
                        lg:min-w-[420px] 
                        lg:max-w-[420px] 
                        lg:h-[420px]
                        custom-w-br-1180:min-w-[520px] 
                        custom-w-br-1180:max-w-[520px] 
                        custom-w-br-1180:h-[520px]
                        xl:min-w-[580px] 
                        xl:max-w-[580px] 
                        xl:h-[580px]
                        custom-w-br-1366:min-w-[630px] 
                        custom-w-br-1366:max-w-[630px] 
                        custom-w-br-1366:h-[630px]
                    `}
                >
                    <HeroImageSkeleton />
                </div>
            </section>

            {/* Description Section Skeleton */}
            <section className="w-full h-full p-5 md:p-0">
                <EventDescriptionSkeleton />
            </section>
        </main>
    );
};

export default EventDetailsSkeleton;