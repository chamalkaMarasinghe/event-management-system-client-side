const ReviewCardSkelton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="border border-[#DDE1E6] rounded-xl px-3 py-6 sm:p-6">
        <div className="pb-3 border-b border-gray-200">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="self-center w-16 h-16">
              {/* Profile Image */}
              <div className="flex items-center justify-center w-[64px] h-[64px] rounded-full bg-slate-200"></div>
            </div>
            <div className="flex-1 mt-1">
              <div className="mb-[2px]">
                {/* Client Name */}
                <div className="w-24 h-5 rounded bg-slate-200"></div>
              </div>
              <div className="flex flex-col items-start gap-3 mt-3 sm:flex-row sm:items-center">
                {/* 5 Star Rating */}
                <div className="h-4 rounded w-28 bg-slate-200"></div>
                {/* Date and Time */}
                <div className="w-48 h-4 rounded bg-slate-200"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-8 mt-6 rounded bg-slate-200"></div>
      </div>
    </div>
  );
};

export default ReviewCardSkelton;
