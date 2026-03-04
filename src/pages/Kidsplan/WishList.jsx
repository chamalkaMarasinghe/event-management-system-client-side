import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/Base/CustomButton";
import EventCard from "../../components/Base/EventPlan";
import EventCardSkeleton from "../../components/skeletons/EventCardSkeleton";
import { useSelector } from "react-redux";
import { useLanguage } from "../../context/language/language";
import { languageTranslatorUtil } from "../../utils/languageTranslatorUtil";

const WishList = () => {
  const navigate = useNavigate();
  const {language} = useLanguage();
  const wishListContent = useSelector(
    (state) => state.auth.user?.wishList || []
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);

  return (
    <>
      <title>My Wishlist</title>
      <div className="flex flex-col items-center gap-8 custom-w-br-380:px-8 md:px-16 lg:px-20 pb-14">
        {/* Title Section */}
        <div className="text-center flex flex-col gap-[10px] font-roboto">
          <h1 className="font-medium text-[40px]">
            {language === "ENGLISH" ? (
              <>
                {languageTranslatorUtil(language,"ms_values","wish")} <span className="text-primary">{languageTranslatorUtil(language,"ms_values","list")}</span>
              </>
            ) : (
              <>
              {languageTranslatorUtil(language, "ms_values", "list")+" "}<span className="text-primary">{languageTranslatorUtil(language,"ms_values","wish")}</span>
              </>
            )}
          </h1>
          <p className="text-sm leading-6">
            {languageTranslatorUtil(language,"wish_list_page","description")}
          </p>
        </div>

        {/* Event Cards section */}
        <div className="flex flex-wrap items-center justify-center gap-[17px] bg-white px-6 py-6 max-w-screen-xl rounded-[12px] shadow-[0px_4px_32px_0px_rgba(255,247,237,0.2)]">
          {isLoading &&
              new Array(10).fill(0).map((_, index) => (<EventCardSkeleton key={index}/>))}
          {
            // !isLoading && mockEvents.length > 0 && (
            //   mockEvents.map((event) => (
            //     <EventCard
            //       key={event.id}
            //       image={event.image}
            //       eventName={event.title}
            //       eventDate={event.date}
            //       eventHostName={event.host}
            //       startTime={event.startTime}
            //       endTime={event.endTime}
            //       price={event.price}
            //       eventType={event.eventType}
            //       eventLocation={event.location}
            //       showDeleteIcon={true}
            //     />
            //   ))
            // )
              !isLoading &&
              wishListContent.length > 0 &&
              wishListContent.map((event) => (
                  <EventCard key={event._id} event={event} showDeleteIcon={true} />
              ))
          }
          {!isLoading && wishListContent.length < 1 && (
              <div className="mt-10 text-center text-gray-500">
                {languageTranslatorUtil(language,"ms_values","wishlistEmpty")}
                <CustomButton
                    buttonText={languageTranslatorUtil(language,"footer_section","quickLinks","BrowseEvents")}
                    bgColor="bg-black"
                    width="w-[170px]"
                    height="h-[43px]"
                    borderColor="border-black"
                    loading={false}
                    onClick={() => navigate("/events")}
                    className="flex items-center justify-center rounded-[8px] font-semibold text-level-5 text-white mx-auto mt-4"
                />
              </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WishList;
