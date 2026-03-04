import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getOrderStatusColor } from "../../utils/getOrderStatusColor";
import { CLIENT_ORDERS_TABLE_TABS, customBreakpoints, orderStatus } from "../../constants/commonConstants";
import { currencyFormatter, formatOrderStatus } from            "../../utils/formatting";
import Dropdown from "../../components/Form/Dropdown";
import { orderStatusForDropdown } from "../../constants/commonConstants";
import DataTable from "./Table";
import { useNavigate, useSearchParams } from "react-router-dom";
import { formatYYYY_MM_DD } from "../../utils/dateFormating";
import Input from "../../components/Form/Input";
import DateRangePicker from "../../components/Form/DateRangePicker";
import EyeIcon from "../../assets/actions/eye.svg";
import MoreIcon from "../../assets/actions/more.svg";
import { logout } from "../../store";
import SearchBar from "./SearchBar";
import DropDownNew from "./DropDownNew";
import CustomButton from "./CustomButton";
import { searchableDropdownOptionsForTesting } from "../../Data/Data";
import TabButtonPlane from "./TabButtonsPlane";
import AddOrderReviewModal from "./AddOrderReviewModal";

const AllOrders = ({
  textColor = "#555F7E",
  textCommonStyles = `font-inter font-normal text-level-10 leading-[16.8px] text-content`,
}) => {

  const navigate = useNavigate();
  // Manage filters state
  const [searchParams, setSearchParams] = useSearchParams();
  
  const fetchOrders = 'fetchOrders';

  // STATE: Refs ==============================================================================================

  const actionButtonRef = useRef(null);
  const menuRef = useRef(null);

  // STATE: Component States ====================================================================================

  const [openActionRow, setOpenActionRow] = useState(null);
  const [portalWidth, setPortalWidth] = useState(240); // Default to md:w-[240px]
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [filters, setFilters] = useState({
    status: searchParams.get("status") || "",
    activeTab: searchParams.get("activeTab") || "",
    multipleStatus: searchParams.get("multipleStatus") || "",
    userName: searchParams.get("userName") || "",
    startingDate: searchParams.get("startingDate") || "",
    endingDate: searchParams.get("endingDate") || "",
  });
  // search
  const [searchValue, setSerachValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchableDropdownOptionsForTesting.find(
      (option) => option.id === Number(searchParams.get("category"))
    ) || null
  );
  const [selectedOption, setSelectedOptions] = useState(CLIENT_ORDERS_TABLE_TABS.UPCOMING);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  // STATE: Helper Functions ====================================================================================

  const handleSelectedCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleOpenMenu = (event, record) => {
    event.stopPropagation();

    if (openActionRow === record._id) {
      setOpenActionRow(null);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    setDropdownPosition({ top: rect.bottom + window.scrollY, left: rect.left });
    setOpenActionRow(record._id);
  };

  const handleOpenReviewModal = (orderId) => {
    setSelectedOrder(orderId);
    setIsReviewModalOpen(true);
    setOpenActionRow(null); // Close the action menu
  };

  const handleReviewSubmit = (reviewData) => {
    console.log("Review submitted for order:", selectedOrder, reviewData);
  };

  const handleAction = (orderId, action) => {
    if (action === "accept") {
      // Handle Raise Complaint
      console.log("Raise complaint for order:", orderId);
      setOpenActionRow(null);
    } else if (action === "delete") {
      // Handle Add Review - now opens the modal
      handleOpenReviewModal(orderId);
    }
  };

  // const [activeTab, setActiveTab] = useState(
  //   searchParams.get("activeTab") || ""
  // );
  // For tracking the real-time filter changes before debouncing
  // const [debouncedFilters, setDebouncedFilters] = useState(filters);

  // track previous filters for comparison
  // const prevFiltersRef = useRef(JSON.stringify(filters));

  // Update URL params whenever filters change
  // useEffect(() => {
  //   const newParams = new URLSearchParams(searchParams);
  //   const currentFiltersStr = JSON.stringify(filters);
  //   const prevFiltersStr = prevFiltersRef.current;

  //   // Update or remove parameters based on filter values
  //   Object.entries(filters).forEach(([key, value]) => {
  //     if (value && value !== "") {
  //       newParams.set(key, value);
  //     } else {
  //       newParams.delete(key);
  //     }
  //   });

  //   // Only reset page to 1 if filters actually changed
  //   if (currentFiltersStr !== prevFiltersStr) {
  //     newParams.set("page", "1");
  //     prevFiltersRef.current = currentFiltersStr;
  //   }

  //   setSearchParams(newParams);
  // }, [filters]);

  // Debounce effect for applying filter changes
  // useEffect(() => {
  //   // Only create debounce timer if userName has changed
  //   if (debouncedFilters.userName === filters.userName) return;

  //   const timer = setTimeout(() => {
  //     setFilters((prev) => ({
  //       ...prev,
  //       userName: debouncedFilters.userName,
  //     }));
  //   }, 500);

  //   return () => clearTimeout(timer);
  // }, [debouncedFilters.userName]);


  // Handle status filter change
  // const handleStatusChange = (option) => {
  //   setFilters((prev) => ({
  //     ...prev,
  //     status: option?.id || "",
  //     multipleStatus: "", // Clear multiple status when single status is selected
  //     activeTab: "", // Clear active tab when status filter is used
  //   }));
  //   setActiveTab("");
  // };

  // Handle tab change
  // const handleTabChange = (tab) => {
  //   const activeTab = tab === "all" ? "" : tab;
  //   setActiveTab(activeTab);

  //   const ongoingStatuses = [
  //     orderStatus.ORDER_IN_PROGRESS,
  //     orderStatus.IN_REVISION,
  //     orderStatus.ORDER_DELIVERED,
  //   ];
  //   const completedStatuses = [
  //     orderStatus.COMPLETED,
  //     orderStatus.COMPLAINT_RAISED,
  //     orderStatus.ISSUE_RESOLVED,
  //   ];

  //   setFilters((prev) => ({
  //     ...prev,
  //     activeTab: activeTab,
  //     status: "", // Clear single status when tab is selected
  //     multipleStatus:
  //       tab === "ongoing"
  //         ? ongoingStatuses.join(",")
  //         : tab === "completed"
  //         ? completedStatuses.join(",")
  //         : "", // Empty string for "all" tab
  //   }));
  // };

  // Handle search input change - update the debounced value
  // const handleSearchChange = (e) => {
  //   setDebouncedFilters((prev) => ({
  //     ...prev,
  //     userName: e.target.value,
  //   }));
  // };

  // const StatusFilter = (
  //   <div className="flex items-center gap-3 md:flex-row flex-col w-full md:w-auto">
  //     <span className="text-sm self-start md:self-center font-medium text-primary whitespace-nowrap">
  //       Filter By
  //     </span>
  //     <div className=" flex items-center gap-3 md:flex-row flex-col w-full md:w-auto">
  //       <Dropdown
  //         options={orderStatusForDropdown}
  //         idKey="id"
  //         displayKey="label"
  //         outerContainerStyle="w-full md:w-[170px]"
  //         wrapperClassName="w-full md:w-[170px] h-[40px] rounded-[5px] border-light-blue font-inter text-level-9"
  //         placeholder="Status"
  //         buttonClassName="rounded-[5px] h-full text-[14px] border-light-blue font-inter leading-[10px] py-[10px]"
  //         optionClassName="font-inter text-[14px] font-normal px-1 text-content"
  //         dropdownClassName="px-[6px] py-2"
  //         onSelect={handleStatusChange}
  //         defaultOption={
  //           orderStatusForDropdown.find(
  //             (status) => status.id === filters.status
  //           ) || ""
  //         }
  //       />

  //       <DateRangePicker
  //         placeholder={["Start Date", "End Date"]}
  //         value={[filters.startingDate, filters.endingDate]}
  //         onChange={(value) => {
  //           setFilters((prev) => ({
  //             ...prev,
  //             startingDate: value[0] || "",
  //             endingDate: value[1] || "",
  //           }));
  //         }}
  //         outerContainerStyle="w-full md:w-[200px]"
  //       />
  //     </div>
  //   </div>
  // );

  // const SearchInput = (
  //   <Input
  //     type="text"
  //     placeholder="Search Client/Service Pro by Full Name"
  //     className="w-full h-10 px-10 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700"
  //     searchIcon={true}
  //     onChange={handleSearchChange}
  //     value={debouncedFilters.userName}
  //     outerContainerStyle="w-full md:w-[392px]"
  //     inputStyle={` placeholder:text-[#C1C3C3] placeholder-opacity-50 placeholder:font-normal`}
  //     title="Type to search"
  //   />
  // );

  // NOTE: Table Columns ======================================================================================

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      sortable: false,
      render: (id) => <span className={textCommonStyles}>{id}</span>,
      minWidth: "100px",
    },
    {
      title: "Event Title",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <span
          title={name}
          className={`${textCommonStyles} truncate whitespace-nowrap overflow-hidden text-ellipsis`}
        >
          {name || "N/A"}
        </span>
      ),
      maxWidth: "200px",
    },
    {
      title: "Event Date & Time",
      dataIndex: "date",
      key: "date",
      render: (date) => (
        <span className={textCommonStyles}>{formatYYYY_MM_DD(date)}</span>
      ),
    },
    {
      title: "Payment",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        // textColor = getOrderStatusColor(status);
        textColor = "green"
        return (
          <span className={textCommonStyles} style={{ color: textColor }}>
            {status}
          </span>
        );
      },
    },
    {
      title: "Order Date & Time",
      dataIndex: "date",
      key: "date",
      render: (date) => (
        <span className={textCommonStyles}>{formatYYYY_MM_DD(date)}</span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        return (
          <span className={textCommonStyles}>
            {currencyFormatter.format(price)}
          </span>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="relative flex items-center gap-3">
          <button
            className="w-[32px] h-[32px] cursor-pointer"
            onClick={() => {
              navigate(
                `/orders/${record?.id}?_id=${record?._id}&orderStatus=${record?.status}`
              );
            }}
          >
            <img
              src={EyeIcon}
              alt="View"
              className=" w-full h-full object-fill"
            />
          </button>
          <button
            ref={actionButtonRef}
            className="w-[32px] h-[32px] cursor-pointer"
            onClick={(e) => handleOpenMenu(e, record)}
          >
            <img
              src={MoreIcon}
              alt="more"
              className="w-full h-full object-fill"
            />
          </button>
        </div>
      ),
      minWidth: "80px",
    },
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
          <span
            onClick={() => handleAction(openActionRow, "accept")}
            className="font-inter font-medium leading-6 text-text-level-9 text-content cursor-pointer rounded-tl-md rounded-tr-md px-3 py-2 hover:bg-primary hover:text-white transition-all duration-300"
          >
            Raise Complaint
          </span>
          <span
            onClick={() => handleAction(openActionRow, "delete")}
            className="font-inter font-medium leading-6 text-text-level-9 text-content cursor-pointer rounded-bl-md rounded-br-md px-3 py-2 hover:bg-primary hover:text-white transition-all duration-300"
          >
            Add Review
          </span>
        </div>,
        document.body
      )
    : null;

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row gap-2 font-roboto font-medium text-level-2 custom-w-br-360:text-level-1 leading-[100%] tracking-normal">
          <p className="text-primary-text">My</p>
          <p className="text-primary">Orders</p>
        </div>
      </div>
      <div className="flex flex-col flex-grow gap-9 px-[4.6%] mt-5 mb-10 py-8 w-[88.88%] mx-auto rounded-xl bg-white">
        <div className="flex flex-col custom-w-br-920:flex-row gap-3">
          <div className="flex flex-col custom-w-br-680:flex-row gap-2 w-full custom-w-br-920:w-[52%]">
            <div className="flex w-full mr-2">
              <SearchBar
                type="text"
                placeholder="Search by Event Title/ID"
                className="h-[40px] pt-10 py-2  border border-gray-300 rounded-md text-sm font-medium text-gray-700"
                searchIcon={true}
                onChange={(e) => setSerachValue(e.target.value)}
                value={searchValue}
                outerContainerStyle=""
                inputStyle={` placeholder:text-[#C1C3C3] placeholder-opacity-50 placeholder:font-normal focus:border-primary`}
                title="Type to search"
              />
            </div>
            <div className="flex flex-row gap-1">
              <CustomButton
                type="button"
                buttonText="Search"
                loading={false}
                onClick={() => {}}
                className="bg-primary text-level-6 font-semibold text-white flex items-center justify-center rounded-[5px] h-[39px] w-full custom-w-br-680:w-[100px]"
                textWeight="font-[600] font-inter"
              />
              <CustomButton
                type="button"
                buttonText="Reset"
                bgColor="bg-white"
                borderColor="border-primary"
                textColor="text-primary"
                className="h-[39px] rounded-[5px] w-full custom-w-br-680:w-[100px]"
                textWeight="font-[600] font-inter"
                loading={false}
              />
            </div>
          </div>
          <div className="flex flex-row gap-1 justify-end w-full custom-w-br-920:w-[48%]">
            <div className="hidden custom-w-br-920:flex justify-center items-center w-full"></div>
            <div className="flex flex-row custom-w-br-920:justify-end w-full">
              <p className="flex justify-center items-center font-inter font-normal text-dark-gray w-[90px]">Filter By</p>
              <DropDownNew
                options={searchableDropdownOptionsForTesting}
                placeholder="Status"
                // isSearchable={true}
                defaultOption={selectedCategory}
                onSelect={handleSelectedCategory}
                wrapperClassName="font-inter"
                buttonClassName="rounded-[5px] py-[8.5px] px-3"
                dropdownClassName="rounded-md"
                optionClassName="text-light-gray hover:bg-primary-light"
                displayKey="value"
                idKey="id"
                isRequired={true}
                // label={`Category`}
                // isForm={true}
                outerContainerStyle="w-full custom-w-br-680:w-[154px] rounded-[5px] top-[20px] left-[40px]"
              />
            </div>
          </div>
        </div>

        {/* Tab Buttons */}
        <div>
          <TabButtonPlane options={Object.values(CLIENT_ORDERS_TABLE_TABS)} selectedOption={selectedOption} setSelectedOptions={setSelectedOptions}/>
        </div>

        <div className=" flex flex-col flex-grow gap-4">
          <DataTable
            columns={columns}
            fetchData={fetchOrders}
            rowKey="_id"
            filters={filters}
            initialPageSize={5}
            enableUrlParams={true}
            hasSubTable={false}
            subTableConfig={{
              columns: [],
              rowKey: "_id",
            }}
            customQueryParams={(params) => {
              // Transform params for the API
              // const apiParams = { ...params };
              // // Handle search by user name
              // if (apiParams.userName) {
              //   if (filters.userName === "") {
              //     delete apiParams.userName;
              //   }
              //   apiParams.userName = apiParams.userName;
              // }
              // // Handle multiple statuses vs single status
              // if (
              //   apiParams.multipleStatus &&
              //   apiParams.multipleStatus.includes(",") &&
              //   filters.status === ""
              // ) {
              //   if (activeTab === "" && apiParams.multipleStatus.includes(",")) {
              //     delete apiParams.multipleStatus;
              //   }
              //   delete apiParams.status;
              // } else if (apiParams.status) {
              //   if (filters.status === "") {
              //     delete apiParams.status;
              //   }
              //   delete apiParams.multipleStatus;
              // }
              // if (apiParams.startingDate && apiParams.endingDate) {
              //   if (filters.startingDate === "" && filters.endingDate === "") {
              //     delete apiParams.startingDate;
              //     delete apiParams.endingDate;
              //   }
              // }
              // // Remove UI-specific params
              // delete apiParams.activeTab;

              // return apiParams;
            }}
          />
          {/* <OrderHistoryHeader
            heading={"Order History"}
            filters={[StatusFilter]}
            searchInput={SearchInput}
            searchFilter={true}
            activeTab={activeTab}
            setActvieTab={setActiveTab}
            handleTabChange={handleTabChange}
            tabs={true}
          /> */}
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
          title="Add Review"
      />
    </div>
  );
};

export default AllOrders;
