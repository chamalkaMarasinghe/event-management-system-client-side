import React from "react";
import ProfileImage from "./Base/ProfileImage";
import StarRating from "./Base/StarRating";
import { formatHH_MM_SS, formatYYYY_MM_DD } from "../utils/dateFormating";

const ClientReviewCard = ({ review }) => {
    // Format the date and time exactly as "2025-04-02 at 2.00 PM"
    const formatDateTime = (dateString) => {
        if (!dateString) return "N/A";

        const date = formatYYYY_MM_DD(dateString); // "2025-04-02"
        const time = formatHH_MM_SS(dateString); // "2:00 PM"

        return (
            <>
                {date} <span className="text-[#33415580]">at</span> {time}
            </>
        );
    };

    // Get user's full name
    const getUserFullName = () => {
        if (!review.postedByFullName) return "Anonymous User";
        return review.postedByFullName;
    };

    return (
        <div className="border border-[#DDE1E6] rounded-xl px-3 py-6 sm:p-6">
            {/* Review Item */}
            <div className="border-b pb-3 border-gray-200">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-16 h-16">
                        <ProfileImage
                            profilePicture={review.postedByProfilePicture}
                            firstName={review.postedByFullName?.split(' ')[0] || 'User'}
                            lastName={review.postedByFullName?.split(' ').slice(1).join(' ') || ''}
                            className="w-12 h-12"
                            imageStyle="rounded-full object-cover"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="mb-[2px]">
                            <span className="font-inter font-semibold text-[16px] sm:text-[18px] leading-6 text-headings-1 break-words">
                              {getUserFullName()}
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                            {/* Star Rating */}
                            <StarRating rating={review.rating || 0} size={20} />
                            <span className="font-inter font-normal text-[14px] sm:text-[16px] text-dark-black break-words">
                                {formatDateTime(review.createdAt)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-3 pt-6">
                {/* Event Title */}
                <p className="font-medium text-base leading-6 tracking-normal text-black font-roboto break-words">
                    {review.eventTitle || "Event Title Not Available"}
                </p>
                {/* Review Message */}
                <p className="font-inter font-normal text-base text-content-color break-words hyphens-auto overflow-wrap-anywhere">
                    {review.feedback || "No feedback provided."}
                </p>
            </div>
        </div>
    );
};

export default ClientReviewCard;