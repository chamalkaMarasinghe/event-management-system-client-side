const EventCardSkeleton = () => {
  return (
    <div className="max-w-[290px] h-auto overflow-hidden bg-white border shadow-md rounded-lg animate-pulse">
      {/* Image */}
      <div className="w-[292px] h-[292px] bg-slate-200"></div>

      {/* EventCard Info */}
      <div className="p-4">
        {/* Price & Date */}
        <div className="flex items-center justify-between">
          <div className="w-16 h-6 rounded bg-slate-200"></div>
          <div className="w-24 h-6 rounded bg-slate-200"></div>
        </div>

        {/* Event Name */}
        <div className="w-20 h-4 my-3 rounded bg-slate-200"></div>
        {/* HostName */}
        <div className="w-24 h-3 mb-4 rounded bg-slate-200"></div>

        {/* Time */}
        <div className="flex justify-between mb-3">
          <div className="w-24 h-4 rounded bg-slate-200"></div>
          <div className="w-24 h-4 rounded bg-slate-200"></div>
        </div>

        {/* Location */}
        <div className="h-4 my-4 rounded w-36 bg-slate-200"></div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-3">
          <div className="w-1/2 h-10 rounded bg-slate-200"></div>
          <div className="w-1/2 h-10 rounded bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
};

export default EventCardSkeleton;
