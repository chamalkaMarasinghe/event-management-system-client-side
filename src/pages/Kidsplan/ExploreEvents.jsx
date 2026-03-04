import {useEffect, useRef, useState} from "react";
import {useLocation, useSearchParams} from "react-router-dom";
import {FaArrowRight} from "react-icons/fa";
import {useSelector} from "react-redux";
import dayjs from "dayjs";

import SearchBar from "../../components/Base/SearchBar";
import DatePicker from "../../components/Base/CustomDatePicker";
import EventCard from "../../components/Base/EventPlan";
import CustomButton from "../../components/Base/CustomButton";
import Dropdown from "../../components/Base/DropDownNew";
import EventCardSkeleton from "../../components/skeletons/EventCardSkeleton";
import AutoComplete from "../../components/Base/AutoComplete";

import showToast from "../../utils/toastNotifications";
import {useLanguage} from "../../context/language/language";
import {useThunk} from "../../hooks/useThunk";
import {useCurrentLocation} from "../../context/location/location";
import {getAllEvents} from "../../store/thunks/eventThunks";
import {eventCategories} from "../../constants/commonConstants";
import {stringTemplates} from "../../config/Static_content_Client";
import {languageTranslatorUtil} from "../../utils/languageTranslatorUtil";

import DropdownIcon from "../../assets/icons/dropdown.svg";
import LocationIcon from "../../assets/icons/location-pin.png";
import SearchIcon from "../../assets/icons/Search.svg";

const initialLimit = 20;
const loadMoreIncrement = 8;

const ExploreEvents = () => {

  const {language} = useLanguage();
  const currentLocation = useCurrentLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const wishList = useSelector(state => state.auth.user?.wishList);

  const isRestoringRef = useRef(false);
  const hasRestoredRef = useRef(false);
  const autocompleteRef = useRef();

  // Helper function to safely create dayjs object
  const formatDate = (dateValue) => {
    if (!dateValue) return null;

    // If it's already a dayjs object and valid, return it
    if (dayjs.isDayjs(dateValue) && dateValue.isValid()) {
      return dateValue;
    }

    // If it's a string or other format, try to parse it
    const dayjsDate = dayjs(dateValue);
    return dayjsDate.isValid() ? dayjsDate : null;
  };

  // STATE: component base states >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [currentLimit, setCurrentLimit] = useState(20);
  const [currentOffset, setCurrentOffset] = useState(0);

  // UI Filter Inputs
  const [filters, setFilters] = useState({
    heroSearchResult: 'false',
    heroSearchTerm: '',
    category: null,
    location: "",
    locationLongitude: "",
    locationLatitude: "",
    date: null,
  });

  // Filters that are applied on events
  const [appliedFilters, setAppliedFilters] = useState({
    heroSearchResult: searchParams.get("heroSearchResult"),
    heroSearchTerm: searchParams.get("heroSearchTerm"),
    category: searchParams.get("category"),
    location: searchParams.get("location"),
    locationLongitude: searchParams.get("locationLongitude"),
    locationLatitude: searchParams.get("locationLatitude"),
    date: searchParams.get("date"),
  });

  // STATE: thunks  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [doGetAllEvents, isGetAllEvents, getAllEventsError] = useThunk(getAllEvents);

  // Helper function to populate filters from URL parameters
  const populateFiltersFromURL = () => {
    const heroSearchResultParam = searchParams.get("heroSearchResult");
    const heroSearchTermParam = searchParams.get("heroSearchTerm");
    const categoryParam = searchParams.get("category");
    const locationParam = searchParams.get("location");
    const locationLongitudeParam = searchParams.get("locationLongitude");
    const locationLatitudeParam = searchParams.get("locationLatitude");
    const dateParam = searchParams.get("date");

    return {
      heroSearchResult: heroSearchResultParam || 'false',
      heroSearchTerm: heroSearchTermParam || "",
      category: eventCategories.find(c => c.name === categoryParam) || null,
      location: locationParam || "",
      locationLongitude: locationLongitudeParam,
      locationLatitude: locationLatitudeParam,
      date: formatDate(dateParam),
    };
  };

  // STATE: side effects >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  useEffect(() => {
    const isReturningFromEvent = sessionStorage.getItem('returningFromEvent');

    if (isReturningFromEvent && !hasRestoredRef.current) {
      const savedState = sessionStorage.getItem('eventsPageState');

      if (savedState) {
        const state = JSON.parse(savedState);

        // Restore state immediately
        setAllEvents(state.events || []);
        setAppliedFilters(state.filters || {});
        setCurrentLimit(state.limit || initialLimit);
        setCurrentOffset(state.offset || 0);
        setTotalEvents(state.totalEvents || 0);

        // FIXED: Use saved filters from session storage, but ensure date is properly converted
        const restoredFilters = { ...state.filters };
        if (restoredFilters.date) {
          restoredFilters.date = formatDate(restoredFilters.date);
        }
        setFilters(restoredFilters);

        // Update URL with the saved filters to sync URL with state
        updateURL(state?.filters, state?.limit, state?.offset);

        // Use multiple timeouts to ensure scroll happens after all renders
        const scrollToPosition = () => {
          if (state.scrollPosition > 0) {
            window.scrollTo({
              top: state.scrollPosition,
              left: 0,
              behavior: 'auto'
            });
          }
        };

        // Try multiple times to ensure it works
        setTimeout(scrollToPosition, 100);
        setTimeout(scrollToPosition, 300);
        setTimeout(scrollToPosition, 500);

        hasRestoredRef.current = true;
      }

      sessionStorage.removeItem('returningFromEvent');
    }
  }, []);

  // Main effect to sync filters with URL - handle all cases
  useEffect(() => {
    // Skip if we're in the process of restoring from session storage
    if (hasRestoredRef.current) return;

    const urlFilters = populateFiltersFromURL();
    const limitParam = parseInt(searchParams.get("limit")) || initialLimit;
    const offsetParam = parseInt(searchParams.get("offset")) || 0;

    // Always sync filters from URL when URL has parameters
    const hasUrlParams = [...searchParams.keys()].length > 0;

    if (hasUrlParams) {
      setFilters(urlFilters);
      setAppliedFilters(urlFilters);
      setCurrentLimit(limitParam);
      setCurrentOffset(offsetParam);
    } else if (location.pathname === "/events") {
      const defaultFilters = {
        heroSearchResult: 'false',
        heroSearchTerm: '',
        category: null,
        location: '',
        locationLongitude: "",
        locationLatitude: "",
        date: null,
      };

      setFilters(defaultFilters);
      setAppliedFilters(defaultFilters);
      setCurrentLimit(initialLimit);
      setCurrentOffset(0);

      setSearchParams({
        heroSearchResult: 'false',
        limit: initialLimit,
        offset: 0,
      });
    }
  }, [searchParams, location.pathname]);

  // Initial load effect
  useEffect(() => {
    if (hasRestoredRef.current) return;

    const hasFilters = appliedFilters.heroSearchResult !== undefined;

    if (hasFilters && !currentLocation?.isLoading && !isLoadingMore) {
      const totalItemsToLoad = currentOffset > 0 ? currentOffset + currentLimit : currentLimit;
      fetchEvents(totalItemsToLoad, 0, false);
    }
  }, [appliedFilters, currentLocation?.isLoading]);

  // Save state whenever important data changes
  useEffect(() => {
    saveCurrentState();
  }, [allEvents, appliedFilters, currentLimit, currentOffset]);

  // Save scroll position before leaving the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveCurrentState();
    };

    // Save on scroll to capture current position
    const handleScroll = () => {
      if (!isRestoringRef.current && allEvents.length > 0) {
        const currentState = JSON.parse(sessionStorage.getItem('eventsPageState') || '{}');
        currentState.scrollPosition = window.scrollY;
        sessionStorage.setItem('eventsPageState', JSON.stringify(currentState));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [allEvents]);

  // Sync URL with applied filters and pagination
  const updateURL = (newFilters, limit = currentLimit, offset = currentOffset, shouldUpdateSearchParams = true) => {
    const params = new URLSearchParams();

    if(newFilters?.heroSearchResult){
      params.set("heroSearchResult", newFilters?.heroSearchResult);
    }

    if (newFilters?.heroSearchTerm) {
      params.set("heroSearchTerm", newFilters?.heroSearchTerm);
    }

    if (newFilters?.category) {
      params.set("category", newFilters?.category?.name);
    }

    if (newFilters?.location) {
      params.set("location", newFilters?.location);
    }

    if (newFilters?.locationLatitude) {
      params.set("locationLatitude", newFilters?.locationLatitude);
    }

    if (newFilters?.locationLongitude) {
      params.set("locationLongitude", newFilters?.locationLongitude);
    }

    if (newFilters?.date) {
      // Ensure we have a valid dayjs object before formatting
      const dateToSet = formatDate(newFilters?.date);
      if (dateToSet) {
        params.set("date", dateToSet.format("YYYY-MM-DD"));
      }
    }

    // Always set limit and offset in URL to maintain state on reload
    params.set("limit", limit?.toString());
    params.set("offset", offset?.toString());

    // Only update search params if explicitly requested
    if (shouldUpdateSearchParams) {
      setSearchParams(params);
    }

    const paramsObject = {}
    for (const element of params?.entries()) {
      paramsObject[`${element[0]}`] = isNaN(element[1]) ? element[1] : Number(element[1])
    }

    return paramsObject || {};
  };

  // Fetch events from API
  const fetchEvents = async (limit = initialLimit, offset = 0, isLoadMore = false) => {

    if (isLoadMore) setIsLoadingMore(true);
    else setIsLoading(true);

    try {
      const result = await doGetAllEvents({
        ...updateURL(appliedFilters, limit, offset, false),
        clientRoute: location.pathname,
        longitude: currentLocation?.longitude || 1,
        latitude: currentLocation?.latitude || 1
      });

      if (result.success) {
        const newEvents = result.response.data.data || [];

        if (isLoadMore) {
          setAllEvents((prev) => [...prev, ...newEvents]); // Append
        } else {
          setAllEvents(newEvents); // Replace
        }
        setTotalEvents(result.response.data.pagination?.totalDocuments || 0);
      } else {
        showToast("error", result?.error?.message || languageTranslatorUtil(language,"toastMessages","staticErrors","failedEventFetch"))
        if (!isLoadMore) {
          setAllEvents([]);
          setTotalEvents(0);
        }
      }
    } catch (error) {
      if (!isLoadMore) {
        setAllEvents([]);
        setTotalEvents(0);
      }
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  // Save current state before any navigation or updates
  const saveCurrentState = () => {
    if (allEvents.length > 0 && !isRestoringRef.current) {
      const currentState = {
        events: allEvents,
        filters: appliedFilters,
        limit: currentLimit,
        offset: currentOffset,
        scrollPosition: window.scrollY,
        totalEvents: totalEvents
      };

      sessionStorage.setItem('eventsPageState', JSON.stringify(currentState));
    }
  };

  // Handle search button click
  const handleSearchClick = async () => {

    const newAppliedFilters = { ...filters };

    setAppliedFilters(newAppliedFilters);
    setCurrentLimit(initialLimit);
    setCurrentOffset(0);
    updateURL(newAppliedFilters, initialLimit, 0);

    // Fetch events immediately with new filters
    if (!currentLocation?.isLoading) {
      await fetchEventsWithFilters(newAppliedFilters, initialLimit, 0, false);
    }
  };

  // Function to fetch events with specific filters
  const fetchEventsWithFilters = async (filtersToApply, limit = initialLimit, offset = 0, isLoadMore = false) => {

    if (isLoadMore) setIsLoadingMore(true);
    else setIsLoading(true);

    try {
      const result = await doGetAllEvents({
        ...updateURL(filtersToApply, limit, offset, false),
        clientRoute: location.pathname,
        longitude: currentLocation?.longitude || 1,
        latitude: currentLocation?.latitude || 1
      });

      if (result.success) {
        const newEvents = result.response.data.data || [];

        if (isLoadMore) {
          setAllEvents((prev) => [...prev, ...newEvents]); // Append
        } else {
          setAllEvents(newEvents); // Replace
        }
        setTotalEvents(result.response.data.pagination?.totalDocuments || 0);
      } else {
        showToast("error", result?.error?.message || languageTranslatorUtil(language,"toastMessages","staticErrors","failedEventFetch"));
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
      setIsLoadingMore(false);
    }
  };

  // Handle load more button click
  const handleLoadMore = () => {
    const newOffset = allEvents?.length;
    const newLimit = loadMoreIncrement;

    // Update the states
    setCurrentLimit(newLimit);
    setCurrentOffset(newOffset);

    // Update URL with new pagination
    updateURL(appliedFilters, newLimit, newOffset);

    // Fetch more events
    if(!currentLocation?.isLoading){
      fetchEvents(loadMoreIncrement, allEvents?.length, true);
    }
  };

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      await handleSearchClick();
    }
  };

  // Check if there are more events to load
  const hasMoreEvents = allEvents.length < totalEvents;

  const handleLocationChange = (selectedLocation) => {
    setFilters((prev) => ({
          ...prev,
          location: selectedLocation?.address,
          locationLongitude: selectedLocation?.location?.coordinates?.[0],
          locationLatitude: selectedLocation?.location?.coordinates?.[1]}
    ));
  };

  return (
      <>
        <title>Explore Events</title>
        <div className="w-full max-w-[1280px] mx-auto mb-[60px] md:mb-[80px] lg:mb-[120px] font-roboto">
          {/* Title */}
          <div className="font-medium text-center">
            <div className="mb-3 uppercase text:[12px] sm:text-[16px] text-subheadings/60">
              {stringTemplates?.explore_events_page?.heroTitle?.[language]}
            </div>
            {
                appliedFilters?.heroSearchResult !== "true" &&
                <div className="text-[38px] sm:text-[40px] font-roboto">
                  
                        {languageTranslatorUtil(language,"explore_events_page","heroSubtitle").split(",")[0]} <span className="text-primary">{languageTranslatorUtil(language,"explore_events_page","heroSubtitle").split(",")[1]}</span>
                      
                  
                </div>
            }
            {
                appliedFilters?.heroSearchResult === "true" &&
                <div className="text-[38px] sm:text-[40px] font-roboto">
                  Matchings For <span className="text-primary">"{appliedFilters.heroSearchTerm}"</span>
                </div>
            }
          </div>

          {/* Filters */}
          {
              appliedFilters?.heroSearchResult !== "true" &&
              <div className="mt-12 flex flex-col ml:flex-row  justify-center gap-2 mx-5">

                {/* search */}
                <div className="w-full ml:w-[140%] h-[40px]">
                  <SearchBar
                      placeholder={languageTranslatorUtil(language,"common_stringTemplates","searchButton")}
                      icon={<img src={SearchIcon} alt="Location" className="w-5 h-5" />}
                      className=" w-full h-[41.7px] font-normal font-roboto rounded-md placeholder:text-[#33415580]"
                      onChange={(e) =>
                          setFilters((prev) => ({ ...prev, heroSearchTerm: e.target.value }))
                      }
                      value={filters.heroSearchTerm}
                      onKeyDown={handleKeyDown}
                  />
                </div>

                {/* Category */}
                <div className="w-full h-[40px]">
                  <Dropdown
                      placeholder={languageTranslatorUtil(language,"checkout_page_subscription_events","categoryLabel")}
                      options={eventCategories}
                      defaultOption={filters.category}
                      isForm={false}
                      allowFillColor={true}
                      icon={<img src={DropdownIcon} alt="Dropdown Icon" className="w-5 h-5" />}
                      onSelect={(category) =>
                          setFilters((prev) => ({ ...prev, category }))
                      }
                  />
                </div>

                {/* Location */}
                <div className="w-full h-[40px]">
                  <AutoComplete
                      ref={autocompleteRef}
                      key={`autocomplete-location-filter-${filters.location || 'empty'}`}
                      placeholder={languageTranslatorUtil(language,"common_stringTemplates","locationLabel")}
                      value={ {location : { address: filters?.location || "" }} }
                      onSelect={(fieldName, payload) => {handleLocationChange(payload.value)}}
                      wrapperStyling="static"
                      dropdownListWrapperStylings="relative w-[90%] ml:w-[260%]"
                      inputStyle="font-roboto text-level-5 placeholder:tracking-[-0.011em] text-light-gray rounded-[0.375rem] border-[#CBD5E0] h-[41.7px]"
                      prefixIcon={LocationIcon}
                      isDisplayMap={false}
                  />
                </div>

                {/* Date */}
                <div className="w-full h-[40px]">
                  <DatePicker
                      placeholder=
                          {language === "ENGLISH" ?
                              languageTranslatorUtil(language,"common_stringTemplates","eventDateLabel").split(" ")[1]
                              :
                              languageTranslatorUtil(language,"common_stringTemplates","eventDateLabel").split(" ")[0]
                          }
                      pickerHeight="41.7px"
                      pickerWidth="100%"
                      borderRadius="6px"
                      onChange={(date) =>
                          setFilters((prev) => ({ ...prev, date }))
                      }
                      value={filters.date}
                  />
                </div>

                {/* Search Button */}
                <div>
                  <CustomButton
                      buttonText={languageTranslatorUtil(language,"common_stringTemplates","searchButton")}
                      bgColor="bg-black"
                      width="w-full min-w-[150px]"
                      height="h-[41.7px]"
                      borderColor="border-black"
                      icon={<FaArrowRight size={20} />}
                      iconPosition="right"
                      loading={isGetAllEvents}
                      disabled={isLoading || isGetAllEvents}
                      onClick={handleSearchClick}
                      className="flex items-center justify-center rounded-[8px] font-semibold text-level-5 text-white"
                  />
                </div>
              </div>
          }

          {/* Event Cards */}
          <div className="flex flex-wrap gap-3 items-center justify-evenly mt-[40px] mx-5">
            {(isLoading || currentLocation?.isLoading) && (allEvents?.length < 1) && (
                new Array(4).fill(0).map((_, index) => ( // Show 4 skeletons initially
                    <EventCardSkeleton key={index} />
                ))
            )}

            {!isLoading && !currentLocation?.isLoading && allEvents.length > 0 && (
                allEvents.map((event) => {
                  const wishListed=  wishList?.some(element => element?._id === event?._id)
                  return  <EventCard
                      event={event}
                      key={event?._id}
                      showDeleteIcon ={wishListed}
                  />
                })
            )
            }

            {/* Loading more skeleton */}
            {isLoadingMore && (
                new Array(loadMoreIncrement).fill(0).map((_, index) => (
                    <EventCardSkeleton key={`loading-more-${index}`} />
                ))
            )}

            {!isLoading && !currentLocation?.isLoading && allEvents.length === 0 && !getAllEventsError && (
                <div className="flex w-full justify-center items-center mt-10 text-center text-gray-500">
                  {languageTranslatorUtil(language,"ms_values","noEventsFound")}
                </div>
            )}
          </div>

          {/* Load More Button */}
          {!isLoading && allEvents.length > 0 && hasMoreEvents && (
              <div className="mt-6 md:mt-9 lg:mt-12">
                <CustomButton
                    buttonText={languageTranslatorUtil(language,"common_stringTemplates","loadMoreButton")}
                    bgColor="bg-black"
                    width="w-[170px]"
                    height="h-[43px]"
                    borderColor="border-black"
                    loading={isLoadingMore}
                    disabled={isLoadingMore}
                    onClick={handleLoadMore}
                    className="flex items-center justify-center rounded-[8px] font-semibold text-level-5 text-white mx-auto"
                />
              </div>
          )}
        </div>
      </>
  );
};

export default ExploreEvents;
