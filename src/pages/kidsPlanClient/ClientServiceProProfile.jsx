import React, { useState, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { EVENT_TYPES } from "../../constants/commonConstants";

import EventCard from "../../components/Base/EventPlan";
import ClientReviewCard from "../../components/ClientReviewCard";
import CustomButton from "../../components/CustomButton";

import ClientServiceProProfileHeroSkeleton from "../../components/skeletons/ClientServiceProProfileHeroSkeleton";
import { useThunk } from "../../hooks/useThunk";
import { useLanguage } from "../../context/language/language";
import showToast from "../../utils/toastNotifications";
import { getClientServiceProReviews } from "../../store/thunks/reviewThunks";
import {getAllEvents} from "../../store/thunks/eventThunks";
import {getServiceProviderProfileById} from "../../store";
import EventCardSkeleton from "../../components/skeletons/EventCardSkeleton";
import { languageTranslatorUtil } from "../../utils/languageTranslatorUtil";
import ProfileImage from "../../components/ProfileImage";
import NoPreviewImage from "../../assets/custom-no-preview.png";
import { useCurrentLocation } from "../../context/location/location";
import { useSelector } from "react-redux";
import ReviewCardSkelton from "../../components/skeletons/ReviewCardSkelton";
import Button from "../../components/Form/CustomButton";

const initialLimit = 16;
const loadMoreIncrement = 8;

const ClientServiceProProfile = () => {

  const { serviceProId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentLocation = useCurrentLocation();
  const wishList = useSelector(state => state.auth.user?.wishList);

  const scrollRef = useRef(null);

  // State to manage active tab
  const [activeTab, setActiveTab] = useState("eventList");
  // State to manage loading
  const [isLoading, setIsLoading] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  // State for image loading
  const [bannerLoaded, setBannerLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [galleryImagesLoaded, setGalleryImagesLoaded] = useState({});

  // Local state for reviews
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [hasMoreReviews, setHasMoreReviews] = useState(true);
  const [isServiceProviderHasNotFound, setIsServiceProviderHasNotFound] = useState(false);

  const [doGetClientReviews, isReviewsLoading, reviewsError] = useThunk(getClientServiceProReviews);
  const [doGetEventDetails, isEventLoading, eventError] = useThunk(getAllEvents);
  const [doGetServiceProDetails, isServiceProLoading, serviceProError] = useThunk(getServiceProviderProfileById);

  const [serviceProfileDetails, setServiceProfileDetails] = useState({});

  const [allEvents, setAllEvents] = useState([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [currentEventLimit, setCurrentEventLimit] = useState(initialLimit);
  const [currentEventOffset, setCurrentEventOffset] = useState(0);
  const [isLoadingMoreEvents, setIsLoadingMoreEvents] = useState(false);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const {language} = useLanguage();

  // Function to get pagination parameters from URL or defaults
  const getPaginationFromURL = () => {
    const urlOffset = parseInt(searchParams.get('offset') || '0');
    const urlLimit = parseInt(searchParams.get('limit') || '5');
    return { offset: urlOffset, limit: urlLimit };
  };

  // Function to calculate next pagination parameters
  const calculateNextPagination = (currentOffset) => {
    if (currentOffset === 0) {
      return { offset: 10, limit: 5 };
    } else {
      return { offset: currentOffset + 5, limit: 5 };
    }
  };

  // Function to generate all pagination steps up to target offset
  const generatePaginationSteps = (targetOffset) => {
    const steps = [];

    if (targetOffset === 0) {
      return [{ offset: 0, limit: 10 }];
    }

    steps.push({ offset: 0, limit: 10 });

    let currentOffset = 10;
    while (currentOffset <= targetOffset) {
      const limit = 5;
      steps.push({ offset: currentOffset, limit: limit });
      currentOffset += 5;
    }

    return steps;
  };

  // Function to handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);

    // Load reviews when switching to ratings tab
    if (tab === "ratings" && serviceProId) {
      const { offset } = getPaginationFromURL();
      setCurrentOffset(offset);
      loadAllReviewsUpToOffset(offset);
    }
  };

  // Function to handle gallery image load
  const handleGalleryImageLoad = (index) => {
    setGalleryImagesLoaded(prev => ({
      ...prev,
      [index]: true
    }));
  };

  // Function to load all reviews up to a specific offset
  const loadAllReviewsUpToOffset = async (targetOffset) => {
    try {
      let allReviews = [];
      let totalDocs = 0;

      const paginationSteps = generatePaginationSteps(targetOffset);

      for (const step of paginationSteps) {
        const result = await doGetClientReviews({
          serviceProId: serviceProId,
          offset: step.offset,
          limit: step.limit
        });

        if (result && result.success && result.response && result.response.data) {
          const stepData = result.response.data.data || [];
          const pagination = result.response.data.pagination || {};

          allReviews = [...allReviews, ...stepData];
          totalDocs = pagination.totalDocuments || stepData.length;
        } else {
          showToast("error", languageTranslatorUtil(language,"toastMessages","staticErrors","loadingReviewsResponeFormatFailure"));
          return;
        }
      }

      setReviews(allReviews);
      setTotalReviews(totalDocs);
      setHasMoreReviews(allReviews.length < totalDocs);

    } catch (error) {
      showToast("error", languageTranslatorUtil(language,"toastMessages","staticErrors","loadingReviewsFailure"));
    }
  };

  // Function to load more reviews
  const loadMoreReviews = async () => {
    setLoadMoreLoading(true);
    const { offset: nextOffset, limit: nextLimit } = calculateNextPagination(currentOffset);

    try {
      const result = await doGetClientReviews({
        serviceProId: serviceProId,
        offset: nextOffset,
        limit: nextLimit
      });

      if (result && result.success && result.response && result.response.data) {
        const stepData = result.response.data.data || [];

        if (stepData.length > 0) {
          setReviews(prevReviews => [...prevReviews, ...stepData]);
          setCurrentOffset(nextOffset);
          setSearchParams({
            offset: nextOffset.toString(),
            limit: nextLimit.toString()
          });

          const newTotalLoaded = reviews.length + stepData.length;
          setHasMoreReviews(newTotalLoaded < totalReviews);
        }
        setLoadMoreLoading(false);
      } else if (result && result.message) {
        setLoadMoreLoading(false);
        showToast("error", result.message);
      }

    } catch (error) {
      showToast("error", languageTranslatorUtil(language,"toastMessages","staticErrors","loadingMoreReviewsFailure"));
    }
  };

  // Function to handle explore more button click
  const handleLoadMore = () => {
    loadMoreReviews();
  }

  // Function to update URL with event pagination parameters
  const updateEventURL = (limit, offset) => {
    const params = new URLSearchParams(searchParams);

    // Set event-specific pagination parameters
    params.set("limit", limit?.toString());
    params.set("offset", offset?.toString());

    setSearchParams(params);
  };

  const handleEventsLoadMore = () => {
    const newOffset = allEvents?.length;
    const newLimit = loadMoreIncrement;

    // Update the states
    setCurrentEventLimit(newLimit);
    setCurrentEventOffset(newOffset);

    // Update URL with new pagination parameters
    updateEventURL(newLimit, newOffset);

    // Fetch more events
    if(!currentLocation?.isLoading){
      fetchEventDetails(loadMoreIncrement, allEvents?.length, true);
    }
  };

  // Handle reviews error
  useEffect(() => {
    if (reviewsError) {
      showToast("error", languageTranslatorUtil(language,"toastMessages","staticErrors","loadingReviewsFailure"));
    }
  }, [reviewsError]);

  // Initialize pagination from URL on component mount
  useEffect(() => {
    const { offset } = getPaginationFromURL();
    setCurrentOffset(offset);
  }, [searchParams]);

  // Load reviews when switching to ratings tab
  useEffect(() => {
    if (serviceProId && activeTab === "ratings" && reviews.length === 0) {
      const { offset } = getPaginationFromURL();
      loadAllReviewsUpToOffset(offset);
    }
  }, [serviceProId, activeTab]);

  useEffect(() => {
    const getServicePro = async ()=> {
      const result = await doGetServiceProDetails(serviceProId);
      if(result?.success){
        setServiceProfileDetails(result?.response?.data);
      }else{
        setIsServiceProviderHasNotFound(true);
        showToast("error", result?.error?.message || languageTranslatorUtil(language,"toastMessages","staticErrors","findSpFailure"));
      }
    }

    getServicePro();
  }, [doGetServiceProDetails, serviceProId]);

  const fetchEventDetails = async (limit = initialLimit, offset = 0, isLoadMore = false) => {
    if (isLoadMore) setIsLoadingMoreEvents(true);
    else setIsLoading(true);

    try {
      const result = await doGetEventDetails({
        serviceProviderId: serviceProId,
        offset: offset || 0,
        limit: limit || initialLimit,
        longitude: currentLocation?.longitude || 1,
        latitude: currentLocation?.latitude || 1,
        clientRoute: "/events/serivepro/events",
      });

      if (result && result.success && result.response && result.response.data) {
        const eventData = result.response.data.data || [];
        const pagination = result.response.data.pagination || {};

        if (isLoadMore) {
          setAllEvents((prev) => [...prev, ...eventData]); // Append new events
        } else {
          setAllEvents(eventData); // Replace events
        }
        setTotalEvents(pagination?.totalDocuments || 0);
      } else {
        console.error("Failed to fetch events:", result.error);
        if (!isLoadMore) {
          setAllEvents([]);
          setTotalEvents(0);
        }
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      if (!isLoadMore) {
        setAllEvents([]);
        setTotalEvents(0);
      }
    } finally {
      setIsLoading(false);
      setIsLoadingMoreEvents(false);
    }
  };

  // Initialize event pagination from URL on component mount
  useEffect(() => {
    const eventLimit = parseInt(searchParams.get("limit")) || initialLimit;
    const eventOffset = parseInt(searchParams.get("offset")) || 0;

    setCurrentEventLimit(eventLimit);
    setCurrentEventOffset(eventOffset);
  }, [searchParams]);

  // Load events on initial load and handle URL-based pagination restoration
  useEffect(() => {
    if(!currentLocation?.isLoading){
      const eventLimit = parseInt(searchParams.get("limit")) || initialLimit;
      const eventOffset = parseInt(searchParams.get("offset")) || 0;

      if (eventOffset > 0) {
        // Load all events if an offset already included in the URL
        const totalItemsToLoad = eventOffset + eventLimit;
        fetchEventDetails(totalItemsToLoad, 0, false);
      } else {
        // Normal initial load
        fetchEventDetails(initialLimit, 0, false);
      }
    }
  }, [doGetEventDetails, serviceProId, currentLocation?.isLoading]);

  // // NOTE: Save scroll position before leaving the page
  // useEffect(() => {
  //   // Save on scroll to capture current position
  //   const handleScroll = () => {
  //     sessionStorage.setItem('y-scroll-position-from-event-card', window.scrollY);
  //   };
    
  //   // window.addEventListener('beforeunload', handleBeforeUnload);
  //   if(!sessionStorage.getItem('y-scroll-position-from-event-card')){
  //     window.addEventListener('scroll', handleScroll, { passive: true });
  //   }

  //   return () => {
  //     // window.removeEventListener('beforeunload', handleBeforeUnload);
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  // //Note: Restore scroll position on mount
  // useEffect(() => {
  //   let savedScroll = sessionStorage.getItem('y-scroll-position-from-event-card');
  //   savedScroll = parseFloat(savedScroll);  
  //   if (savedScroll > 0) {
  //     setTimeout(() => {
  //       window.scrollTo({
  //         top: savedScroll,
  //         left: 0,
  //         behavior: 'auto'
  //       });
  //       sessionStorage.removeItem('y-scroll-position-from-event-card')
  //     }, 4000)
  //   }
  // }, []);

  // Check if there are more events to load
  const hasMoreEvents = allEvents.length < totalEvents;

  // If loading, show the skeleton
  if (isServiceProLoading) {
    return <ClientServiceProProfileHeroSkeleton />;
  }
  
  return (
      <>
        <title>Service Provider Profile</title>
        <div className="mx-6 md:mx-10"  ref={scrollRef}>
          {/* Profile Hero Section */}
          <div className="mb-6">
            <div className="w-full rounded-[6px] border-[1px] border-[#E6E7EC] bg-white">
              {/* Banner Image */}
              <div className="w-full h-[176px] md:h-[196px] relative">
                <div
                    className={twMerge(
                        "relative w-full h-[176px] md:h-[196px] bg-gradient-to-r from-orange-100 to-orange-400",
                        // bannerLoaded ? "bg-transparent" : "bg-gray-300"
                    )}
                >
                  {/* <LazyLoadImage
                      src={serviceProfileDetails?.businessInformation?.cover?.[0]  || NoPreviewImage}
                      placeholderSrc={NoPreviewImage}
                      alt="Service banner"
                      className="w-full h-[176px] md:h-[196px] rounded-tl-[6px] rounded-tr-[6px] object-cover"
                      effect="blur"
                      onLoad={() => setBannerLoaded(true)}
                      onError={(e) => {
                        e.target.onerror = null; // prevent looping
                        e.target.src = NoPreviewImage;
                        setBannerLoaded(true);
                      }}
                  /> */}
                </div>

                {/* Profile Logo/Avatar */}
                <div className="absolute top-[98px] left-[29px]">
                  <div className="w-[140px] h-[140px] md:w-[170px] md:h-[170px] rounded-full flex items-center justify-center border-4 border-white overflow-hidden">
                    {isLoading ? (
                        <div className="absolute w-[11px] h-[11px] bg-transparent rounded-full flex items-center justify-center top-2 left-0">
                          {!isLoading && <span className="bg-transparent w-[7px] h-[7px] rounded-full"></span>}
                        </div>
                    ) : null}
                    <ProfileImage
                        profilePicture={serviceProfileDetails?.businessInformation?.logo?.[0]}
                        firstName={serviceProfileDetails?.firstName || ""}
                        lastName={serviceProfileDetails?.lastName || ""}
                        fontSize={"40px"}
                        loading={isLoading}
                        backgroundColor={"#F65F18"}
                    />

                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="pt-[85px] md:pt-[98px] px-[15px] md:pl-7 pb-[19px]">
                <h1 className="text-[20px] md:text-[24px] font-roboto font-medium leading-[100%] capitalize sm:text-start text-black mb-3">
                  {`${serviceProfileDetails?.firstName} ${serviceProfileDetails?.lastName}` || "Service Provider Name"}
                </h1>
                {/* <div className="font-roboto font-medium leading-[100%] capitalize sm:text-[16px] md:text-[18px] text-light-black mb-3">
                  {languageTranslatorUtil(language,"common_stringTemplates","byServiceProvider")}{" "}
                  {serviceProfileDetails?.firstName || "First Name"}{" "}
                  {serviceProfileDetails?.lastName || "Last Name"}
                </div> */}
                <div className="flex flex-col md:flex-row items-start font-roboto font-normal leading-[100%] capitalize sm:text-[14px] md:text-[16px] text-dark-black mb-3 gap-3">
                </div>
                <p className="text-subheadings/60 font-roboto leading-[100%] capitalize sm:text-[14px] md:text-[16px] font-normal text-justify break-words">
                  {serviceProfileDetails?.businessInformation?.description || ""}
                </p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="w-full border bg-white border-white rounded-xl sm:px-6 pt-3 mb-[88px]">
            <div className="mb-6">
              <div className="flex flex-col items-center sm:flex-row sm:items-start px-2 py-3 gap-3">
                <button
                    className={`px-2 py-2 font-roboto font-semibold text-[15px] ${
                        activeTab === "eventList"
                            ? "text-[#F65F18] border-b-2 border-[#F65F18]"
                            : "text-gray-80 hover:text-gray-800"
                    }`}
                    onClick={() => handleTabChange("eventList")}
                >
                  {languageTranslatorUtil(language,"event_details_page","service_provider_profile_client_view","tabLabels","eventList")}
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "eventList" && (
                <div>
                  <div className="flex items-center justify-center border-[1px] border-[#E6E7EC] rounded-xl p-2 custom-w-br-360:p-5 md:p-6 mb-12 ">
                    <div className="flex flex-wrap gap-9 items-center justify-evenly">
                      {/* Initial loading state */}
                      {(isLoading || currentLocation?.isLoading) && (allEvents?.length < 1) && (
                          new Array(initialLimit).fill(0).map((_, index) => (
                              <EventCardSkeleton key={index} />
                          ))
                      )}

                      {/* Event cards */}
                      {!isLoading && !currentLocation?.isLoading && allEvents.length > 0 && (
                          allEvents.map((event) => {
                              const wishListed = wishList?.some(element => element?._id === event?._id)
                              return(
                                <EventCard
                                    event={event}
                                    key={event?._id}
                                    showDeleteIcon ={wishListed}
                                />
                              )
                          })
                      )}

                      {/* Loading more skeleton */}
                      {isLoadingMoreEvents && (
                          new Array(loadMoreIncrement).fill(0).map((_, index) => (
                              <EventCardSkeleton key={`loading-more-${index}`} />
                          ))
                      )}

                      {/* No events message */}
                      {!isLoading && !currentLocation?.isLoading && allEvents?.length === 0 && !eventError && (
                          <div className="mt-10 text-center text-gray-500">
                            {/* //Todo: Polish Translation missing */}
                            {languageTranslatorUtil(language,"ms_values","noEventsProvider")}
                          </div>
                      )}
                    </div>
                  </div>

                  {/* Load More Button */}
                  {!isLoading && !currentLocation?.isLoading && allEvents.length > 0 && hasMoreEvents && (
                      <div className="mt-6 md:mt-9 lg:mt-12">
                        <CustomButton
                            buttonText={languageTranslatorUtil(language,"common_stringTemplates","loadMoreButton")}
                            bgColor="bg-black"
                            width="w-[170px]"
                            height="h-[43px]"
                            borderColor="border-black"
                            loading={isLoadingMoreEvents}
                            disabled={isLoadingMoreEvents}
                            onClick={handleEventsLoadMore}
                            className="flex items-center justify-center rounded-[8px] font-semibold text-level-5 text-white mx-auto"
                        />
                      </div>
                  )}
                </div>
            )}

            {activeTab === "ratings" && (
                <div className="border-[1px] border-[#E6E7EC] rounded-xl py-6 px-3 sm:px-6 mb-12">
                  <div className="bg-white rounded-md">
                    <h2 className="text-[18px] sm:text-[20px] text-center sm:text-start font-semibold mb-4">
                      {/* //Todo:Polish translation missing */}
                      {languageTranslatorUtil(language,"ms_values","allReviews")} { isReviewsLoading ? <span className="text-transparent bg-slate-300 rounded-md ml-2 animate-pulse">rvw</span> : `( ${totalReviews} )`}
                    </h2>

                    {/* Loading State */}
                    {isReviewsLoading && reviews.length === 0 && (
                         new Array(4).fill(0).map((_, index) => ( // Show 4 skeletons initially
                            <div className="mb-5">
                              <ReviewCardSkelton key={index} />
                            </div>
                        ))
                    )}

                    {/* Empty State */}
                    {!isReviewsLoading && reviews.length === 0 && (
                        <div className="text-center py-8">
                          {/* //Todo:Polish translation missing */}
                          <p className="text-gray-500">{languageTranslatorUtil(language,"ms_values","noReviews")}</p>
                        </div>
                    )}

                    {/* Review List */}
                    {reviews.length > 0 && (
                        <div className="space-y-6">
                          {reviews.map((review, index) => (
                              <ClientReviewCard review={review} key={review._id || index} />
                          ))}

                          {loadMoreLoading && <ReviewCardSkelton />}

                          {/* Load More Button */}
                          {hasMoreReviews && (
                              <div className="pb-3 flex justify-center">
                                <CustomButton
                                    //  Todo:Polish translation missing
                                    buttonText={isReviewsLoading ? languageTranslatorUtil(language,"ms_values","loading") : languageTranslatorUtil(language,"common_stringTemplates","ExploreMoreButton")}
                                    textColor="text-white"
                                    bgColor="bg-black"
                                    width="w-[170px]"
                                    borderColor="border-black"
                                    onClick={handleLoadMore}
                                    textWeight="font-semibold"
                                F    className="hover:bg-gray-800 text-[14px] sm:text-[16px] px-6 py-2 sm:px-8 sm:py-3 rounded-lg"
                                    loading={isReviewsLoading}
                                    disabled={isReviewsLoading}
                                />
                              </div>
                          )}
                        </div>
                    )}
                  </div>
                </div>
            )}

            {activeTab === "gallery" && (
                <div className="border border-[#DDE1E6] rounded-xl py-6 px-4 md:px-6 mb-12">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {serviceProfileDetails?.businessInformation?.gallery &&
                    serviceProfileDetails.businessInformation.gallery.length > 0 ? (
                      serviceProfileDetails.businessInformation.gallery.map((item, index) => (
                        <div key={index} className="relative group overflow-hidden">
                          <div className="aspect-w-1 aspect-h-1 w-full">
                            <div
                              className={twMerge(
                                "relative w-full aspect-square",
                                galleryImagesLoaded[index]
                                  ? "bg-transparent"
                                  : "bg-gray-300 animate-pulse"
                              )}
                            >
                              <LazyLoadImage
                                src={item}
                                placeholderSrc={NoPreviewImage}
                                alt={`Gallery Image ${index + 1}`}
                                className="object-cover w-full h-[100%] transition duration-300 group-hover:scale-105"
                                effect="blur"
                                onLoad={() => handleGalleryImageLoad(index)}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = NoPreviewImage;
                                  handleGalleryImageLoad(index);
                                }}
                              />
                            </div>
                          </div>
                          <div className="absolute inset-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center"></div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center w-full">
                        <p className="text-gray-500">{languageTranslatorUtil(language,"ms_values","noGalleryImages")}</p>
                      </div>
                    )}
                  </div>
                </div>
            )}
          </div>
        </div>
        {
          isServiceProviderHasNotFound && (
            <div className="fixed justify-center items-center top-0 bottom-0 left-0 right-0 bg-black opacity-80 z-[60]">
              <div className="flex flex-col gap-0 w-full h-[100%] justify-center items-center">
                <p className="text-white text-[30px] text-center">Service Provider Not Found</p>
                <div className="w-full flex justify-center items-center">
                  <Button
                    type="button"
                    buttonText={"Back"}
                    loading={false}
                    className="bg-dark-orange font-roboto font-semibold text-[16px] leading-[100%] w-[180px] text-white flex items-center justify-center rounded-[8px]"
                    onClick={() => {
                      navigate(-1);
                    }}
                  />
                </div>
              </div>
            </div>
          )
        }
      </>
  );
};

export default ClientServiceProProfile;
