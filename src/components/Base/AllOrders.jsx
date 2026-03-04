import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useConfirmation } from "../../hooks/useConfirmation";
import { getOrderStatusColor } from "../../utils/getOrderStatusColor";
import {
  CLIENT_ORDERS_TABLE_TABS,
  customBreakpoints,
  eventCategories,
  orderStatus,
  PAYMENT_METHODS,
  SCHEDULING_TYPES,
  PAYMENT_STATUS_OPTIONS,
  CLIENT_PAYMENT_STATUS,
  paymentStatus,
  paymentMethod
} from "../../constants/commonConstants";
import { capitalize, currencyFormatter, formatOrderStatus } from "../../utils/formatting";
import { languageTranslatorUtil } from "../../utils/languageTranslatorUtil.js";
import Dropdown from "../../components/Form/Dropdown";
import { orderStatusForDropdown } from "../../constants/commonConstants";
import DataTable from "./Table";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  format_MMMM,
  format_MMMM_DD,
  formatHH_MM_SS,
  formatYYYY_MM_DD,
} from "../../utils/dateFormating";
import Input from "../../components/Form/Input";
import DateRangePicker from "../../components/Form/DateRangePicker";
import EyeIcon from "../../assets/actions/eye.svg";
import MoreIcon from "../../assets/actions/more.svg";
import { logout } from "../../store";
import SearchBar from "./SearchBar";
import DropDownNew from "./DropDownNew";
import CustomButton from "./CustomButton";
import { ConfirmationModal } from "../Model/ConfirmationModel";
// import { searchableDropdownOptionsForTesting } from "../../Data/Data";
import TabButtonPlane from "./TabButtonsPlane";
import AddOrderReviewModal from "./AddOrderReviewModal";
import { getAllEvents, unsubscribeEvent, unsubscribeEventWithP24 } from "../../store/thunks/eventThunks";
import { addEventReview } from "../../store/thunks/reviewThunks";
import { useThunk } from "../../hooks/useThunk";
import { useLanguage } from "../../context/language/language.js";

import showToast from "../../utils/toastNotifications";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

const AllOrders = ({
  textColor = "#555F7E",
  textCommonStyles = `font-roboto font-normal text-[14px] text-content`,
}) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const userState = useSelector((state) => state?.auth?.user);
  const {language} = useLanguage();

  // STATE: Refs ==============================================================================================

  const actionButtonRef = useRef(null);
  const menuRef = useRef(null);

  // STATE: Component States ====================================================================================

  const [openActionRow, setOpenActionRow] = useState(null);
  const [portalWidth, setPortalWidth] = useState(240);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  // Initialize filters from URL params
  const UPDATED_CLIENT_ORDERS_TABLE_TABS = {
    UPCOMING: languageTranslatorUtil(language,"my_orders_page","statusOptions","upcoming"),
    COMPLETED: languageTranslatorUtil(language,"my_orders_page","statusOptions","completed"),
  };

  const [filters, setFilters] = useState({
    status: searchParams.get("status") || CLIENT_ORDERS_TABLE_TABS.ALL,
    search: searchParams.get("search") || "",
    payment_status: searchParams.get("payment_status") || "",
  });
  const prevFiltersRef = useRef(JSON.stringify(filters));

  // Search state - separate from filters to handle search/reset independently
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    PAYMENT_STATUS_OPTIONS.find(
      (option) => option?._id === Number(searchParams.get("payment_status"))
    ) || null
  );
  const [selectedOption, setSelectedOptions] = useState(
    searchParams.get("status") || CLIENT_ORDERS_TABLE_TABS.ALL
  );
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Add refresh trigger

  const [metaData, setMetaData] = useState(null);

  // STATE: thunks ============================================================================================

  // Add the review thunk hook
  const [doAddReview, isAddingReview, addReviewError] = useThunk(addEventReview);
  const [doUnsubscribeEvent, isUnsubscribingEvent, unsubscribeEventError] = useThunk(unsubscribeEvent);
  const [doUnsubscribeEventP24, isUnsubscribingEventP24, unsubscribeEventErrorP24] = useThunk(unsubscribeEventWithP24)

  // STATE: custom hooks =======================================================================================

  const { requestConfirmation, confirmation, confirm, cancel } =
    useConfirmation();

  // STATE: Side Effects ========================================================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionButtonRef.current &&
        !actionButtonRef.current.contains(event.target)
      ) {
        setOpenActionRow(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      setPortalWidth(menuRef.current.offsetWidth);
    }
  }, [openActionRow]);

  // Update filters when URL params change (for direct URL access)
  useEffect(() => {
    setFilters({
      status: searchParams.get("status") || CLIENT_ORDERS_TABLE_TABS.ALL,
      search: searchParams.get("search") || "",
      payment_status: searchParams.get("payment_status") || "",
    });
    setSearchValue(searchParams.get("search") || "");
    setSelectedCategory(
      PAYMENT_STATUS_OPTIONS.find(
        (option) => option._id === Number(searchParams.get("payment_status"))
      ) || null
    );
  }, [searchParams]);

  // Handle review submission errors
  useEffect(() => {
    if (addReviewError) {
      showToast("error", addReviewError);
    }
  }, [addReviewError]);

  // Update URL params whenever filters change (excluding search)
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    const currentFiltersStr = JSON.stringify(filters);
    const prevFiltersStr = prevFiltersRef.current;

    // Update or remove parameters based on filter values
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "") {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    // Only reset page to 1 if filters actually changed
    if (currentFiltersStr !== prevFiltersStr) {
      newParams.set("page", "1");
      prevFiltersRef.current = currentFiltersStr;
    }

    setSearchParams(newParams);
  }, [filters]);

  // NOTE: reset tab filter to 'ALL' tab regardless of the user selected option - if they have entered something on the search bar and search for results
  useEffect(() => {
    if(metaData?.timelineStatus === CLIENT_ORDERS_TABLE_TABS.ALL){
      setSelectedOptions(CLIENT_ORDERS_TABLE_TABS.ALL);
      setFilters((prev) => ({
        ...prev,
        status: CLIENT_ORDERS_TABLE_TABS.ALL,
      }));
    }
  }, [metaData]);

  // STATE: Helper Functions ====================================================================================

  const handleSelectedCategory = (category) => {
    setSelectedCategory(category);
    // Update URL params immediately
    const newParams = new URLSearchParams(searchParams);
    if (category) {
      newParams.set("payment_status", category._id);
    } else {
      newParams.delete("payment_status");
    }
    newParams.set("page", "1"); // Reset to first page
    setSearchParams(newParams);
  };

  const handleOpenMenu = (event, record) => {
    event.stopPropagation();

    if (openActionRow?._id === record._id) {
      setOpenActionRow(null);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    setDropdownPosition({ top: rect.bottom + window.scrollY, left: rect.left });
    setOpenActionRow(record);
  };

  const handleOpenReviewModal = (order) => {
    setSelectedOrder(order);
    setIsReviewModalOpen(true);
    setOpenActionRow(null);
  };

  // handleReviewSubmit function
  const handleReviewSubmit = async (reviewData) => {
    try {
      const result = await doAddReview({
        eventId: selectedOrder._id,
        reviewData: reviewData,
      });

      if (result?.success) {
        showToast(
          "success",
          languageTranslatorUtil(language,"toastMessages","staticSuccessMsgs","reviewSubmitSuccess")
        );
        setIsReviewModalOpen(false);
        setSelectedOrder(null);
        // Refresh the table data to show updated information
        setRefreshTrigger((prev) => prev + 1);
      } else {
        showToast(
          "error",
          result?.error?.message || languageTranslatorUtil(language,"toastMessages","staticErrors","failedSubmitReview")
        );
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      showToast("error", languageTranslatorUtil(language,"toastMessages","staticErrors","failedSubmitReview"));
    }
  };

  const handleAction = (order, action) => {
    if (action === "accept") {
      navigate(`/all-orders/raise-complaint?orderId=${order._id}`);
      setOpenActionRow(null);
    } else if (action === "delete") {
      handleOpenReviewModal(order);
    }
  };

  // Handle search functionality
  const handleSearch = () => {
    const newParams = new URLSearchParams(searchParams);
    if (searchValue.trim()) {
      newParams.set("search", searchValue.trim());
    } else {
      newParams.delete("search");
    }
    newParams.set("page", "1"); // Reset to first page
    setSearchParams(newParams);
  };

  // Handle reset - only clear search params
  const handleReset = () => {
    setSearchValue("");
    setSelectedOptions(CLIENT_ORDERS_TABLE_TABS.ALL);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("search");
    newParams.set("status", CLIENT_ORDERS_TABLE_TABS.ALL);
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  // Handle Enter key in search input
  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setSelectedOptions(tab);
    setFilters((prev) => ({
      ...prev,
      status: tab || "",
    }));
  };

  // NOTE: Table Columns ======================================================================================

  const columns = [
    {
      title: languageTranslatorUtil(language,"my_orders_page","tableHeaders","orderId"),
      dataIndex: "id",
      key: "id",
      sortable: false,
      render: (id) => <span className={textCommonStyles}>{id}</span>,
      minWidth: "100px",
    },
    {
      title: languageTranslatorUtil(language,"my_orders_page","tableHeaders","eventTitle"),
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        if (record?.schedulingType === SCHEDULING_TYPES.ONETIME) {
          return (
            <span
              title={record?.name}
              className={`${textCommonStyles} max-w-[20px] text-wrap truncate whitespace-nowrap overflow-hidden text-ellipsis`}
            >
              {record?.name || "N/A"}
            </span>
          );
        } else if (record?.schedulingType === SCHEDULING_TYPES.RECURRING) {
          // NOTE: mapping related monthe names for recurring event titles
          return (
            <span
              title={record?.name}
              className={`${textCommonStyles} max-w-[20px] text-wrap truncate whitespace-nowrap overflow-hidden text-ellipsis`}
            >
              {`${record?.name} - ${languageTranslatorUtil(language,"months",format_MMMM_DD(record?.startDate).split(" ")[0])} ${format_MMMM_DD(record?.startDate).split(" ")[1]}` || "N/A"}
            </span>
          );
        }
      },
      maxWidth: "20px",
    },
    {
      title: languageTranslatorUtil(language,"my_orders_page","tableHeaders","eventDateTime"),
      dataIndex: "date",
      key: "date",
      render: (_, record) => {
        if (record?.schedulingType === SCHEDULING_TYPES.ONETIME) {
          return (
            <span className={textCommonStyles}>
              {formatYYYY_MM_DD(record?.date)} /{" "}
              {formatHH_MM_SS(record?.startingTime)} -{" "}
              {formatHH_MM_SS(record?.endingTime)}
            </span>
          );
        } else if (record?.schedulingType === SCHEDULING_TYPES.RECURRING) {
          return (
            <span className={textCommonStyles}>
              {formatYYYY_MM_DD(record?.startDate)} /{" "}
              {formatHH_MM_SS(record?.startingTime)} -{" "}
              {formatHH_MM_SS(record?.endingTime)}
            </span>
          );
        }
      },
      minWidth: "150px",
    },
    {
      title: languageTranslatorUtil(language,"my_orders_page","tableHeaders","payment"),
      dataIndex: "status",
      key: "status",
      render: (_, record) => {        
        textColor = record?.paymentStatus === paymentStatus.PENDING
          ? "blue"
          :record?.paymentStatus === paymentStatus.CANCELED
          ? "orange"
          : "green";
        // const status = record?.paymentStatus === paymentStatus.PENDING
        //   ? CLIENT_PAYMENT_STATUS.PENDING
        //   : CLIENT_PAYMENT_STATUS.COMPLETED;
        const status = record?.paymentStatus;
        return (
          <span className={textCommonStyles} style={{ color: (record?.isEventCancelledByServiceProvider && record?.isRefunded) ? "red" : textColor }}>
            {(record?.isEventCancelledByServiceProvider && record?.isRefunded) ? languageTranslatorUtil(language,"paymentStatus",capitalize(CLIENT_PAYMENT_STATUS.REFUNDED))
             : languageTranslatorUtil(language,"paymentStatus",capitalize(status))}
          </span>
        );
      },
    },
    {
      title:languageTranslatorUtil(language,"my_orders_page","tableHeaders","orderDateTime"),
      dataIndex: "date",
      key: "date",
      render: (_, record) => {
          const item = record?.schedulingType === SCHEDULING_TYPES.ONETIME? record?.participants?.find(it => it?.user === userState?._id) : record?.participants?.find(it => it?.user === userState?._id);          
          return(
            <span className={textCommonStyles}>{formatYYYY_MM_DD(item?.date)} / {formatHH_MM_SS(item?.date)}</span>
          );
      },
      minWidth: "150px",
    },
    {
      title:languageTranslatorUtil(language,"my_orders_page","tableHeaders","price"),
      dataIndex: "price",
      key: "price",
      render: (_, record) => {
        return (
          <span className={textCommonStyles}>
            {currencyFormatter.format(record?.schedulingType === SCHEDULING_TYPES.RECURRING ? record?.serviceProviderAmount : record?.price)}
          </span>
        );
      },
    },
    {
      title: languageTranslatorUtil(language,"my_orders_page","tableHeaders","actions"),
      key: "actions",
      render: (_, record) => (
        <div className="relative flex items-center gap-3">
          <button
            className={twMerge("w-[32px] h-[32px] cursor-pointer", record?.isDeleted ? "opacity-40 cursor-not-allowed" : "")}
            onClick={() => {
              navigate(`/events/${record?._id}`);
            }}
            disabled={record?.isDeleted}
          >
            <img
              src={EyeIcon}
              alt="View"
              className=" w-full h-full object-fill"
            />
          </button>
        </div>
      ),
      minWidth: "80px",
    },
  ];

  const UPDATED_PAYMENT_STATUS_OPTIONS = [
    { _id: 1, name: languageTranslatorUtil(language,"my_orders_page","statusOptions","completed") },
    { _id: 2, name: languageTranslatorUtil(language,"ms_values","pending") }
  ];

  // Render menu in a portal outside the table
  const actionMenu = openActionRow
    ? createPortal(
        <div
          ref={menuRef}
          className="absolute w-[180px] bg-[#DDE1E6] rounded-[8px] z-50 flex flex-col justify-center shadow-lg"
          style={{
            top: dropdownPosition.top + 6,
            left:
              dropdownPosition.left -
              (portalWidth === 180 ? 150 : portalWidth - 30),
          }}
        >
            {
                (openActionRow?.schedulingType === SCHEDULING_TYPES.RECURRING && !openActionRow?.subscriptionCancelDate) && (
                  openActionRow?.paymentMethod === paymentMethod.PREZELWAY_24 && openActionRow?.renewalReminderSent &&
                  <span
                      onClick={() => {navigate(`/events/${openActionRow?._id}/checkout?paynow=true`)}}
                      className="font-inter font-medium leading-6 text-text-level-9 text-content cursor-pointer px-3 py-2 hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    {languageTranslatorUtil(language,"ms_values","payNow")}
                  </span>
                )
            }
            {
                (openActionRow?.schedulingType === SCHEDULING_TYPES.RECURRING && openActionRow?.userSelectedPaymentMethod === PAYMENT_METHODS.SUBSCRIPTION && !openActionRow?.subscriptionCancelDate) &&
                <span
                    onClick={async () => {
                      const isConfirmed = await requestConfirmation({
                        type: "accept",
                        title: languageTranslatorUtil(language,"unsubscribe_popup","title"),
                        message: languageTranslatorUtil(language,"unsubscribe_popup","message"),
                        confirmText: languageTranslatorUtil(language,"unsubscribe_popup","yesUnsubscribeButton"),
                        cancelText: languageTranslatorUtil(language,"unsubscribe_popup","goBackButton"),
                      });
                      if(isConfirmed){
                        if(openActionRow?.userSelectedPaymentMethod === PAYMENT_METHODS.SUBSCRIPTION && openActionRow?.paymentMethod !== paymentMethod.PREZELWAY_24){
                          const result = await doUnsubscribeEvent({ subscriptionId: openActionRow?.subscriptionId });                        
                          if(result?.success){
                            showToast("success", languageTranslatorUtil(language,"toastMessages","staticSuccessMsgs","unsubscribeSuccess"));
                          }else{
                            showToast("error", result?.error?.message || languageTranslatorUtil(language,"toastMessages","staticErrors","errorOccurred"));
                          }
                        }else{
                          const result = await doUnsubscribeEventP24({ _id: openActionRow?._id });                        
                          if(result?.success){
                            showToast("success", languageTranslatorUtil(language,"toastMessages","staticSuccessMsgs","unsubscribeSuccess"));
                          }else{
                            showToast("error", result?.error?.message || languageTranslatorUtil(language,"toastMessages","staticErrors","errorOccurred"));
                          }
                        }
                      }
                    }}
                    className="font-inter font-medium leading-6 text-text-level-9 text-content cursor-pointer px-3 py-2 hover:bg-primary hover:text-white transition-all duration-300"
                >
                              {languageTranslatorUtil(language,"unsubscribe_popup","title")}
                </span>
            }
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <title>All Orders</title>
      <div className="flex flex-col flex-grow">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row gap-2 font-roboto font-medium text-level-2 custom-w-br-360:text-level-1 leading-[100%] tracking-normal">
             
              <p className="text-primary-text">{languageTranslatorUtil(language,"ms_values","my")}</p>
              <p className="text-primary">{languageTranslatorUtil(language,"ms_values","orders")}</p>
              
          </div>
        </div>
        <div className="flex flex-col font-roboto flex-grow gap-9 px-[30px] sm:px-[59px] mt-5 mb-10 py-[30px] w-[80.61%] mx-auto rounded-xl bg-white">
          <div className="flex flex-col custom-w-br-920:flex-row gap-3">
            <div className="flex flex-col custom-w-br-680:flex-row gap-2 w-full max-w-[603px]">
              <div className="flex w-full mr-2">
                <SearchBar
                    type="text"
                    placeholder={languageTranslatorUtil(language,"my_orders_page","searchPlaceholder")}
                    className="h-[40px] pt-10 py-2  border border-gray-300 rounded-md text-sm font-medium text-gray-700"
                    searchIcon={true}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                    value={searchValue}
                    outerContainerStyle=""
                    inputStyle={` placeholder:text-[#C1C3C3] placeholder-opacity-50 placeholder:font-normal focus:border-primary`}
                    title="Type to search"
                />
              </div>
              <div className="flex flex-row gap-1">
                <CustomButton
                    type="button"
                    buttonText={languageTranslatorUtil(language,"common_stringTemplates","searchButton")}
                    loading={false}
                    onClick={handleSearch}
                    className="bg-primary text-level-6 font-semibold text-white flex items-center justify-center rounded-[5px] h-[39px] w-full custom-w-br-680:w-[100px]"
                    textWeight="font-[600] font-inter"
                />
                <CustomButton
                    type="button"
                    buttonText={languageTranslatorUtil(language,"my_orders_page","resetButton")}
                    bgColor="bg-white"
                    borderColor="border-primary"
                    textColor="text-primary"
                    className="h-[39px] rounded-[5px] w-full custom-w-br-680:w-[100px] hover:bg-[#FFF7ED]"
                    hoverTextColor = "hover:text-primary"
                    hoverBorderColor = "hover:border-dark-orange"
                    textWeight="font-[600] font-inter"
                    loading={false}
                    onClick={handleReset}
                />
              </div>
            </div>
            <div className="flex flex-row gap-1 justify-end w-full custom-w-br-920:w-[48%]">
              <div className="hidden custom-w-br-920:flex justify-center items-center w-full"></div>
              <div className="flex flex-row custom-w-br-920:justify-end gap-2 sm:gap-0 w-full">
                <p className="flex justify-center items-center font-roboto font-medium text-dark-gray w-[90px] text-nowrap mx-3">
                  {languageTranslatorUtil(language,"my_orders_page","filterByLabel")}
                </p>
                <DropDownNew
                    options={PAYMENT_STATUS_OPTIONS}
                    placeholder={languageTranslatorUtil(language,"my_orders_page","statusLabel")}
                    defaultOption={selectedCategory}
                    onSelect={handleSelectedCategory}
                    wrapperClassName="font-roboto"
                    buttonClassName="rounded-[5px] py-[8.5px] px-3"
                    dropdownClassName="rounded-md"
                    optionClassName="text-light-gray hover:bg-primary-light"
                    displayKey="name"
                    idKey="_id"
                    isRequired={true}
                    outerContainerStyle="w-full custom-w-br-680:w-[154px] rounded-[5px] top-[20px] left-[40px]"
                />
              </div>
            </div>
          </div>

          {/* Tab Buttons */}
          <div>
            <TabButtonPlane
                options={Object.values(CLIENT_ORDERS_TABLE_TABS)}
                selectedOption={selectedOption}
                setSelectedOptions={handleTabChange}
                isDisabled={filters?.search?.length > 0}
            />
          </div>

          <div className=" flex flex-col flex-grow gap-4">
            <DataTable
                columns={columns}
                fetchData={getAllEvents}
                setMetaData={setMetaData}
                // rowKey="_id"
                rowKey={(record) =>
                    record?.schedulingType === SCHEDULING_TYPES.RECURRING
                        ? `${record?._id}-${new Date(record?.startDate).toISOString()}`
                        : record?._id
                }
                filters={{
                  ...filters,
                  search: searchParams.get("search") || "",
                  payment_status: searchParams.get("payment_status") || "",
                  status:
                      searchParams.get("status") || CLIENT_ORDERS_TABLE_TABS.ALL,
                }}
                initialPageSize={5}
                enableUrlParams={true}
                hasSubTable={false}
                subTableConfig={{
                  columns: [],
                  rowKey: "_id",
                }}
                refreshTrigger={refreshTrigger} // Pass refresh trigger to DataTable
                customQueryParams={(params) => {
                  const apiParams = { ...params };

                  // Handle search
                  if (apiParams.search) {
                    apiParams.searchTerm = apiParams.search;
                    delete apiParams.search;
                  }

                  // Handle category filter
                  if (apiParams.payment_status) {
                    // Map category ID to actual category name if needed
                    const categoryOption = PAYMENT_STATUS_OPTIONS.find(
                        (opt) => opt._id === Number(apiParams.payment_status)
                    );
                    if (categoryOption) {
                      apiParams.payment_status = categoryOption?.name;
                    }
                  }

                  // Handle status
                  if (apiParams.status) {
                    apiParams.status = apiParams.status;
                  }

                  return apiParams;
                }}
            />
          </div>

          {/* Render action menu */}
          {actionMenu}
        </div>

        {/* Add Review Modal */}
        <AddOrderReviewModal
            isOpen={isReviewModalOpen}
            onSubmit={handleReviewSubmit}
            onClose={() => setIsReviewModalOpen(false)}
            setIsOpen={setIsReviewModalOpen}
            title={languageTranslatorUtil(language,"add_review_popup","title")}
            loading={isAddingReview}
        />

        {/* Confirmation Modal */}
        <ConfirmationModal
            isOpen={confirmation.isOpen}
            options={confirmation.options}
            onConfirm={confirm}
            onCancel={cancel}
        />
      </div>
    </>
  );
};

export default AllOrders;
