import { twMerge } from "tailwind-merge";

const CheckoutSkeleton = ({ width = "w-full", height = "h-4", className = "" }) => (
    <div
        className={twMerge(
            "bg-slate-300 rounded animate-pulse",
            width,
            height,
            className
        )}
    />
);

const PaymentDetailsSkeleton = () => {
    return (
        <div className="space-y-3 animate-pulse">
            {/* Subscription Option Skeleton */}
            <div className="border border-slate-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center space-x-3">
                    <div className="h-4 w-4 rounded-full bg-slate-300"></div>
                    <div className="h-4 w-40 bg-slate-300 rounded"></div>
                </div>

                {/* Subscription details skeleton */}
                <div className="mx-3 pt-4 border-t border-slate-200 space-y-6">
                    <div className="text-center space-y-3">
                        <div className="h-6 w-56 mx-auto bg-slate-300 rounded"></div>
                        <div className="h-4 w-40 mx-auto bg-slate-300 rounded"></div>
                        <div className="h-10 w-28 mx-auto bg-slate-300 rounded"></div>
                    </div>

                    <div className="w-full max-w-[400px] mx-auto space-y-3">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <div key={idx} className="flex justify-between">
                                <div className="h-4 w-24 bg-slate-300 rounded"></div>
                                <div className="h-4 w-20 bg-slate-300 rounded"></div>
                            </div>
                        ))}
                    </div>

                    <div className="h-4 w-3/4 mx-auto bg-slate-300 rounded"></div>
                </div>
            </div>

            {/* One-Time Payment Option Skeleton */}
            {/*<div className="border border-slate-200 rounded-lg p-4 space-y-3">*/}
            {/*    <div className="flex items-center space-x-3">*/}
            {/*        <div className="h-4 w-4 rounded-full bg-slate-300"></div>*/}
            {/*        <div className="h-4 w-36 bg-slate-300 rounded"></div>*/}
            {/*    </div>*/}

            {/*    /!* One-Time Details *!/*/}
            {/*    <div className="mx-3 pt-4 border-t border-slate-200 space-y-6">*/}
            {/*        <div className="text-center space-y-3">*/}
            {/*            <div className="h-6 w-48 mx-auto bg-slate-300 rounded"></div>*/}
            {/*            <div className="h-4 w-40 mx-auto bg-slate-300 rounded"></div>*/}
            {/*            <div className="h-10 w-28 mx-auto bg-slate-300 rounded"></div>*/}
            {/*        </div>*/}

            {/*        <div className="space-y-3">*/}
            {/*            <div className="flex justify-between">*/}
            {/*                <div className="h-4 w-28 bg-slate-300 rounded"></div>*/}
            {/*                <div className="h-4 w-20 bg-slate-300 rounded"></div>*/}
            {/*            </div>*/}
            {/*            <div className="flex justify-between">*/}
            {/*                <div className="h-4 w-28 bg-slate-300 rounded"></div>*/}
            {/*                <div className="h-4 w-20 bg-slate-300 rounded"></div>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div className="h-4 w-32 bg-slate-300 rounded"></div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

const PaymentMethodSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
            {[1, 2].map((i) => (
                <div
                    key={i}
                    className="flex items-start cursor-default border border-slate-200 rounded-lg p-3"
                >
                    {/* Radio button skeleton */}
                    <div className="grid place-items-center mr-3 mt-1">
                        <div className="h-4 w-4 rounded-full bg-slate-300" />
                    </div>

                    {/* Text content skeleton */}
                    <div className="space-y-2">
                        <div className="h-4 w-24 bg-slate-300 rounded" />
                        <div className="h-3 w-40 bg-slate-300 rounded" />
                    </div>
                </div>
            ))}
        </div>
    );
};


export {PaymentDetailsSkeleton, PaymentMethodSkeleton};
export default CheckoutSkeleton;