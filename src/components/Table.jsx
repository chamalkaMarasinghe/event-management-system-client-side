import React, { useEffect, useState, useMemo } from "react";
import { Pagination, Skeleton, Table } from "antd";
import { useSearchParams } from "react-router-dom";
import CustomExpandIcon from "../CustomExpandIcon";
import { useThunk } from "../../hooks/useThunk";

const DataTable = ({
  columns,
  fetchData,
  rowKey = "_id",
  filters = {},
  initialPageSize = 10,
  tableStyle = {},
  headingBgColor = "#DDE1E6",
  headingTextColor = "#5C5F6A",
  enableUrlParams = true,
  customQueryParams,
  dataSource,
  hasSubTable = false, // Prop to enable sub-table
  subTableConfig = {}, // Configuration for sub-table (columns, data field)
  refreshTrigger = 0, // Refresh trigger for the table
  setStaticalData = null,
  setLoadingReport = null,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  // Use the custom useThunk hook to fetch data
  // const [doFetchData, isFetchingData, fetchDataError] = useThunk(fetchData);
  const [isFetchingData, setIsFetchingData] = useState(false);

  // Get pagination values from URL params or use defaults
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentPageSize =
    Number(searchParams.get("pageSize")) || initialPageSize;

  // Update URL parameters and return the updated params object
  const updateUrlParams = (newParams) => {
    if (!enableUrlParams) return newParams;

    const updatedParams = new URLSearchParams(searchParams);

    // Update or remove parameters
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        updatedParams.set(key, value.toString());
      } else {
        updatedParams.delete(key);
      }
    });

    setSearchParams(updatedParams, { replace: true });
    return newParams;
  };

  useEffect(() => {
    // Create a reference to the previous filters
    const filterValues = Object.entries(filters).filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    );

    if (filterValues.length > 0) {
      const newParams = new URLSearchParams(searchParams.toString());

      // Update filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "") {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });

      // Reset page to 1 ONLY when filters change, not on component mount
      newParams.set("page", "1");

      // Only update if something actually changed to avoid unnecessary rerenders
      if (newParams.toString() !== searchParams.toString()) {
        setSearchParams(newParams);
      }
    }
  }, [filters]);

  // Get all current parameters (pagination, sorting, filters)
  const getCurrentParams = () => {
    const params = {
      page: currentPage,
      pageSize: currentPageSize,
      sortField: searchParams.get("sortField") || "",
      sortOrder: searchParams.get("sortOrder") || "",
    };

    // Add all active filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params[key] = value;
      }
    });

    // Add any other search params not covered by filters
    Array.from(searchParams.entries()).forEach(([key, value]) => {
      if (
        !params[key] &&
        !["page", "pageSize", "sortField", "sortOrder"].includes(key)
      ) {
        params[key] = value;
      }
    });

    return params;
  };

  // Load data from API
  const loadData = async () => {
    try {
      setLoading(true);

      // Get current parameters
      const params = getCurrentParams();

      // Convert page & pageSize to offset & limit for API
      const apiParams = { ...params };
      apiParams.offset = (params.page - 1) * params.pageSize;
      apiParams.limit = params.pageSize;

      // Remove UI pagination params
      delete apiParams.page;
      delete apiParams.pageSize;

      // Apply any custom transformations
      const backendParams = customQueryParams
        ? customQueryParams(apiParams)
        : apiParams;
        
      // const result2 = await doFetchData(backendParams);

      // Testing Object for Table
      const result = {
        "success": true,
        "response": {
          "status": 200,
          "message": "Orders Fetched Successfully.",
          "data": {
            "data": [
              {
                "_id": "67f8f0960f387b8aa77c2847",
                "id": "ID2120",
                "title": "Tom Felton",
                "description": "Testing",
                "user": {
                  "_id": "67a9c602f33a18205df6b4d7",
                  "firstName": "Silvestor",
                  "lastName": "Kumara",
                  "email": "mandu@indigobook.com",
                  "profilePicture": "https://youtube.com",
                  "roles": [
                    "USER",
                    "TASKER"
                  ],
                  "aboutMe": {
                    "isVerified": true,
                    "primary": "I am a professional tasker"
                  },
                  "idNumber": {
                    "isVerified": true,
                    "primary": "1234567890V"
                  },
                  "idImages": {
                    "primary": [
                      "https://youtube.com",
                      "https://youtube.com"
                    ],
                    "isVerified": true,
                    "secondary": []
                  },
                  "professionalDetails": {
                    "primary": [
                      {
                        "categoryName": "Home Service",
                        "skills": [
                          {
                            "skillName": "Appliance Installation and Repairs",
                            "description": "Proficiency in installations and repairs",
                            "_id": "67a9c711f33a18205df6b519"
                          },
                          {
                            "skillName": "Pest Control Assistance",
                            "description": "Proficiency in pest control assistance",
                            "_id": "67a9c711f33a18205df6b51a"
                          }
                        ],
                        "_id": "67a9c711f33a18205df6b518",
                        "createdAt": "2025-02-10T09:29:53.886Z",
                        "updatedAt": "2025-02-10T09:29:53.886Z"
                      }
                    ],
                    "isVerified": true,
                    "secondary": []
                  },
                  "servingAreas": {
                    "primary": [
                      {
                        "cityName": "Tamale",
                        "subcities": [
                          "Sagnarigu",
                          "Savelugu"
                        ],
                        "_id": "67a9c711f33a18205df6b51b",
                        "createdAt": "2025-02-10T09:29:53.886Z",
                        "updatedAt": "2025-02-10T09:29:53.886Z"
                      }
                    ],
                    "isVerified": true,
                    "secondary": []
                  },
                  "wallet": {
                    "type": "user",
                    "amount": 0,
                    "pending": 29217.600000000002,
                    "_id": "67a9c602f33a18205df6b4d6",
                    "createdAt": "2025-02-10T09:25:22.677Z",
                    "updatedAt": "2025-03-31T08:15:41.463Z"
                  },
                  "payoutDetailsMobileMoney": {
                    "isVerified": true,
                    "primary": {
                      "mobileMoneyProvider": "AirtelTigo Money",
                      "mobileNumber": "0331243568",
                      "accHolderFullName": "Steve SmithJR",
                      "_id": "67a9c711f33a18205df6b51c",
                      "createdAt": "2025-02-11T05:07:42.592Z",
                      "updatedAt": "2025-02-11T05:07:42.592Z"
                    }
                  },
                  "payoutDetailsBankDetails": {
                    "isVerified": true,
                    "primary": {
                      "bankName": "Zenith Bank Ghana",
                      "accHolderFullName": "Black MythJR",
                      "accNumber": "00334455663",
                      "branchName": "Example branch",
                      "_id": "67a9c711f33a18205df6b51d",
                      "createdAt": "2025-02-11T05:07:42.593Z",
                      "updatedAt": "2025-02-11T05:07:42.593Z"
                    }
                  },
                  "verifiedByAdmin": true,
                  "createdAt": "2025-02-10T09:25:22.678Z",
                  "updatedAt": "2025-04-07T08:08:14.582Z",
                  "__v": 3,
                  "phoneNumber": "0331232124",
                  "id": "ID1002",
                  "paymentType": "BANK",
                  "proofAddress": {
                    "isVerified": false,
                    "primary": [],
                    "secondary": []
                  },
                  "expiredAt": "2025-04-07T08:14:14.576Z",
                  "verifyToken": "a2551f42a3093f09e1d766a3fd4ed4a74b17e768977d5e33937803776e53350d"
                },
                "tasker": {
                  "_id": "67a9c3f5e57bc3b49b29e715",
                  "firstName": "Chamalka",
                  "lastName": "Marasinghe",
                  "email": "chamalkaauth@freesourcecodes.com",
                  "phoneNumber": "0331232123",
                  "profilePicture": "https://firebasestorage.googleapis.com/v0/b/realstate-aa106.appspot.com/o/profilepictures%2F1744612099266client-howItWork.7dbe86f1af5b4b690080.jpg?alt=media&token=3df0d17d-61ff-429f-b08f-9118ec0a7fcd",
                  "roles": [
                    "USER",
                    "TASKER"
                  ],
                  "aboutMe": {
                    "primary": "I am a professional tasker",
                    "isVerified": true
                  },
                  "idNumber": {
                    "primary": "1244567890V",
                    "isVerified": true
                  },
                  "idImages": {
                    "primary": [
                      "https://youtube.com",
                      "https://youtube.com"
                    ],
                    "isVerified": true
                  },
                  "professionalDetails": {
                    "primary": [
                      {
                        "categoryName": "Home Service",
                        "skills": [
                          {
                            "skillName": "Appliance Installation and Repairs",
                            "description": "Proficiency in installations and repairs",
                            "_id": "67fcfe1239cfb992384d1403"
                          },
                          {
                            "skillName": "Pest Control Assistance",
                            "description": "Proficiency in pest control assistance",
                            "_id": "67fcfe1239cfb992384d1404"
                          }
                        ],
                        "_id": "67fcfe1239cfb992384d1402",
                        "createdAt": "2025-04-14T12:22:42.489Z",
                        "updatedAt": "2025-04-14T12:22:42.489Z"
                      }
                    ],
                    "isVerified": true
                  },
                  "servingAreas": {
                    "primary": [
                      {
                        "cityName": "Tamale",
                        "subcities": [
                          "Sagnarigu",
                          "Savelugu"
                        ],
                        "_id": "67fcfe1239cfb992384d1405",
                        "createdAt": "2025-04-14T12:22:42.490Z",
                        "updatedAt": "2025-04-14T12:22:42.490Z"
                      }
                    ],
                    "isVerified": true
                  },
                  "wallet": {
                    "type": "user",
                    "amount": 18524,
                    "pending": 69590.39999999995,
                    "_id": "67a9c3f5e57bc3b49b29e714",
                    "createdAt": "2025-02-10T09:16:37.933Z",
                    "updatedAt": "2025-04-11T10:36:07.491Z"
                  },
                  "payoutDetailsMobileMoney": {
                    "primary": {
                      "mobileMoneyProvider": "MTN Mobile Money (MTN MoMo)",
                      "mobileNumber": "0551234987",
                      "accHolderFullName": "Steve Smithdfg",
                      "_id": "67fcfe1239cfb992384d1407",
                      "createdAt": "2025-04-14T12:22:42.490Z",
                      "updatedAt": "2025-04-28T13:09:57.060Z"
                    },
                    "isVerified": true
                  },
                  "payoutDetailsBankDetails": {
                    "primary": {
                      "bankName": null,
                      "accHolderFullName": null,
                      "accNumber": null,
                      "branchName": null,
                      "_id": "67fcfe1239cfb992384d1409",
                      "createdAt": "2025-04-14T12:22:42.491Z",
                      "updatedAt": "2025-04-28T13:09:57.060Z"
                    },
                    "isVerified": true
                  },
                  "verifiedByAdmin": true,
                  "createdAt": "2025-02-10T09:16:37.934Z",
                  "updatedAt": "2025-04-28T13:09:57.060Z",
                  "__v": 25,
                  "jobTitle": "Junior",
                  "level": 3,
                  "taskerRequestedAt": "2025-03-13T18:48:57.456Z",
                  "isRequest": false,
                  "id": "ID1001",
                  "isSuspended": false,
                  "taskerRequestedAndStillNotVerified": false,
                  "taskerSuspendedAt": "2025-03-13T16:08:25.478Z",
                  "taskerVerifiedAt": "2025-03-14T10:19:45.459Z",
                  "paymentType": "MOBILE_MONEY",
                  "bankCode": "",
                  "mobileMoneyProviderCode": "mtn",
                  "proofAddress": {
                    "primary": [
                      "https://firebasestorage.googleapis.com/v0/b/realstate-aa106.appspot.com/o/undefined%2F1744633344480IMG_20250414_160248.jpg?alt=media&token=ea4439e8-9fea-4884-a66f-80c90e80d1dd"
                    ],
                    "isVerified": true
                  },
                  "paystackCustomerId": "CUS_ydwjqy4uoo1iqmr",
                  "paystackRecipientCode": "RCP_fvk6q4u21y2fycq",
                  "expiredAt": "2025-04-07T08:13:40.011Z",
                  "verifyToken": "bae1976c8f6a30454604bcb82d11c035e20f6da7141b0a826d52ebbe4c2d9e54",
                  "location": "Sekondi-Takoradi"
                },
                "status": "ORDER_DELIVERED",
                "offerId": "67f74fabbb5e944420fcc601",
                "paid": true,
                "price": 300,
                "paymentDetils": {
                  "id": "ID2118",
                  "paid": true,
                  "_id": "67f8f0960f387b8aa77c2848",
                  "createdAt": "2025-04-11T10:36:06.717Z",
                  "updatedAt": "2025-04-11T10:36:06.717Z"
                },
                "category": "Home Service",
                "time": "10:28",
                "date": "2025-04-10T00:00:00.000Z",
                "finalDeliverables": [
                  "https://firebasestorage.googleapis.com/v0/b/realstate-aa106.appspot.com/o/orders%2F1744736541841login_img01.jpg?alt=media&token=098d72df-e367-4580-ba9b-38ed110a4ae6",
                  "https://firebasestorage.googleapis.com/v0/b/realstate-aa106.appspot.com/o/orders%2F1744736543647client-howItWork.7dbe86f1af5b4b690080.jpg?alt=media&token=ffffa067-0b2e-4e14-acd1-c2ed2a3f560f",
                  "https://firebasestorage.googleapis.com/v0/b/realstate-aa106.appspot.com/o/orders%2F174473654699120943865.jpg?alt=media&token=998a5be0-28e7-4fda-befb-fd3bec62df28"
                ],
                "orderProgress": [
                  {
                    "progressStatus": "ORDER_IN_PROGRESS",
                    "progressDate": "2025-04-11T10:36:06.716Z",
                    "_id": "67f8f0960f387b8aa77c2849"
                  },
                  {
                    "progressStatus": "ORDER_DELIVERED",
                    "progressDate": "2025-04-15T17:02:38.722Z",
                    "_id": "67fe912eabb6812372b2ac45"
                  }
                ],
                "revisions": [],
                "createdAt": "2025-04-11T10:36:06.717Z",
                "updatedAt": "2025-04-15T17:02:38.729Z",
                "__v": 1,
                "deliveredDate": "2025-04-15T17:02:38.722Z",
                "deliveryNotes": "done"
              },
              {
                "_id": "67ea143b56f46a560e39d3f9",
                "id": "ID2061",
                "title": "price 2009",
                "description": "qwqwqwqwewew",
                "user": {
                  "_id": "67a9c602f33a18205df6b4d7",
                  "firstName": "Silvestor",
                  "lastName": "Kumara",
                  "email": "mandu@indigobook.com",
                  "profilePicture": "https://youtube.com",
                  "roles": [
                    "USER",
                    "TASKER"
                  ],
                  "aboutMe": {
                    "isVerified": true,
                    "primary": "I am a professional tasker"
                  },
                  "idNumber": {
                    "isVerified": true,
                    "primary": "1234567890V"
                  },
                  "idImages": {
                    "primary": [
                      "https://youtube.com",
                      "https://youtube.com"
                    ],
                    "isVerified": true,
                    "secondary": []
                  },
                  "professionalDetails": {
                    "primary": [
                      {
                        "categoryName": "Home Service",
                        "skills": [
                          {
                            "skillName": "Appliance Installation and Repairs",
                            "description": "Proficiency in installations and repairs",
                            "_id": "67a9c711f33a18205df6b519"
                          },
                          {
                            "skillName": "Pest Control Assistance",
                            "description": "Proficiency in pest control assistance",
                            "_id": "67a9c711f33a18205df6b51a"
                          }
                        ],
                        "_id": "67a9c711f33a18205df6b518",
                        "createdAt": "2025-02-10T09:29:53.886Z",
                        "updatedAt": "2025-02-10T09:29:53.886Z"
                      }
                    ],
                    "isVerified": true,
                    "secondary": []
                  },
                  "servingAreas": {
                    "primary": [
                      {
                        "cityName": "Tamale",
                        "subcities": [
                          "Sagnarigu",
                          "Savelugu"
                        ],
                        "_id": "67a9c711f33a18205df6b51b",
                        "createdAt": "2025-02-10T09:29:53.886Z",
                        "updatedAt": "2025-02-10T09:29:53.886Z"
                      }
                    ],
                    "isVerified": true,
                    "secondary": []
                  },
                  "wallet": {
                    "type": "user",
                    "amount": 0,
                    "pending": 29217.600000000002,
                    "_id": "67a9c602f33a18205df6b4d6",
                    "createdAt": "2025-02-10T09:25:22.677Z",
                    "updatedAt": "2025-03-31T08:15:41.463Z"
                  },
                  "payoutDetailsMobileMoney": {
                    "isVerified": true,
                    "primary": {
                      "mobileMoneyProvider": "AirtelTigo Money",
                      "mobileNumber": "0331243568",
                      "accHolderFullName": "Steve SmithJR",
                      "_id": "67a9c711f33a18205df6b51c",
                      "createdAt": "2025-02-11T05:07:42.592Z",
                      "updatedAt": "2025-02-11T05:07:42.592Z"
                    }
                  },
                  "payoutDetailsBankDetails": {
                    "isVerified": true,
                    "primary": {
                      "bankName": "Zenith Bank Ghana",
                      "accHolderFullName": "Black MythJR",
                      "accNumber": "00334455663",
                      "branchName": "Example branch",
                      "_id": "67a9c711f33a18205df6b51d",
                      "createdAt": "2025-02-11T05:07:42.593Z",
                      "updatedAt": "2025-02-11T05:07:42.593Z"
                    }
                  },
                  "verifiedByAdmin": true,
                  "createdAt": "2025-02-10T09:25:22.678Z",
                  "updatedAt": "2025-04-07T08:08:14.582Z",
                  "__v": 3,
                  "phoneNumber": "0331232124",
                  "id": "ID1002",
                  "paymentType": "BANK",
                  "proofAddress": {
                    "isVerified": false,
                    "primary": [],
                    "secondary": []
                  },
                  "expiredAt": "2025-04-07T08:14:14.576Z",
                  "verifyToken": "a2551f42a3093f09e1d766a3fd4ed4a74b17e768977d5e33937803776e53350d"
                },
                "tasker": {
                  "_id": "67a9c3f5e57bc3b49b29e715",
                  "firstName": "Chamalka",
                  "lastName": "Marasinghe",
                  "email": "chamalkaauth@freesourcecodes.com",
                  "phoneNumber": "0331232123",
                  "profilePicture": "https://firebasestorage.googleapis.com/v0/b/realstate-aa106.appspot.com/o/profilepictures%2F1744612099266client-howItWork.7dbe86f1af5b4b690080.jpg?alt=media&token=3df0d17d-61ff-429f-b08f-9118ec0a7fcd",
                  "roles": [
                    "USER",
                    "TASKER"
                  ],
                  "aboutMe": {
                    "primary": "I am a professional tasker",
                    "isVerified": true
                  },
                  "idNumber": {
                    "primary": "1244567890V",
                    "isVerified": true
                  },
                  "idImages": {
                    "primary": [
                      "https://youtube.com",
                      "https://youtube.com"
                    ],
                    "isVerified": true
                  },
                  "professionalDetails": {
                    "primary": [
                      {
                        "categoryName": "Home Service",
                        "skills": [
                          {
                            "skillName": "Appliance Installation and Repairs",
                            "description": "Proficiency in installations and repairs",
                            "_id": "67fcfe1239cfb992384d1403"
                          },
                          {
                            "skillName": "Pest Control Assistance",
                            "description": "Proficiency in pest control assistance",
                            "_id": "67fcfe1239cfb992384d1404"
                          }
                        ],
                        "_id": "67fcfe1239cfb992384d1402",
                        "createdAt": "2025-04-14T12:22:42.489Z",
                        "updatedAt": "2025-04-14T12:22:42.489Z"
                      }
                    ],
                    "isVerified": true
                  },
                  "servingAreas": {
                    "primary": [
                      {
                        "cityName": "Tamale",
                        "subcities": [
                          "Sagnarigu",
                          "Savelugu"
                        ],
                        "_id": "67fcfe1239cfb992384d1405",
                        "createdAt": "2025-04-14T12:22:42.490Z",
                        "updatedAt": "2025-04-14T12:22:42.490Z"
                      }
                    ],
                    "isVerified": true
                  },
                  "wallet": {
                    "type": "user",
                    "amount": 18524,
                    "pending": 69590.39999999995,
                    "_id": "67a9c3f5e57bc3b49b29e714",
                    "createdAt": "2025-02-10T09:16:37.933Z",
                    "updatedAt": "2025-04-11T10:36:07.491Z"
                  },
                  "payoutDetailsMobileMoney": {
                    "primary": {
                      "mobileMoneyProvider": "MTN Mobile Money (MTN MoMo)",
                      "mobileNumber": "0551234987",
                      "accHolderFullName": "Steve Smithdfg",
                      "_id": "67fcfe1239cfb992384d1407",
                      "createdAt": "2025-04-14T12:22:42.490Z",
                      "updatedAt": "2025-04-28T13:09:57.060Z"
                    },
                    "isVerified": true
                  },
                  "payoutDetailsBankDetails": {
                    "primary": {
                      "bankName": null,
                      "accHolderFullName": null,
                      "accNumber": null,
                      "branchName": null,
                      "_id": "67fcfe1239cfb992384d1409",
                      "createdAt": "2025-04-14T12:22:42.491Z",
                      "updatedAt": "2025-04-28T13:09:57.060Z"
                    },
                    "isVerified": true
                  },
                  "verifiedByAdmin": true,
                  "createdAt": "2025-02-10T09:16:37.934Z",
                  "updatedAt": "2025-04-28T13:09:57.060Z",
                  "__v": 25,
                  "jobTitle": "Junior",
                  "level": 3,
                  "taskerRequestedAt": "2025-03-13T18:48:57.456Z",
                  "isRequest": false,
                  "id": "ID1001",
                  "isSuspended": false,
                  "taskerRequestedAndStillNotVerified": false,
                  "taskerSuspendedAt": "2025-03-13T16:08:25.478Z",
                  "taskerVerifiedAt": "2025-03-14T10:19:45.459Z",
                  "paymentType": "MOBILE_MONEY",
                  "bankCode": "",
                  "mobileMoneyProviderCode": "mtn",
                  "proofAddress": {
                    "primary": [
                      "https://firebasestorage.googleapis.com/v0/b/realstate-aa106.appspot.com/o/undefined%2F1744633344480IMG_20250414_160248.jpg?alt=media&token=ea4439e8-9fea-4884-a66f-80c90e80d1dd"
                    ],
                    "isVerified": true
                  },
                  "paystackCustomerId": "CUS_ydwjqy4uoo1iqmr",
                  "paystackRecipientCode": "RCP_fvk6q4u21y2fycq",
                  "expiredAt": "2025-04-07T08:13:40.011Z",
                  "verifyToken": "bae1976c8f6a30454604bcb82d11c035e20f6da7141b0a826d52ebbe4c2d9e54",
                  "location": "Sekondi-Takoradi"
                },
                "status": "ORDER_DELIVERED",
                "offerId": "67e678edea056aa10b5f70b2",
                "paid": true,
                "price": 2009,
                "paymentDetils": {
                  "id": "ID2059",
                  "paid": true,
                  "_id": "67ea143b56f46a560e39d3fa",
                  "createdAt": "2025-03-31T04:04:11.019Z",
                  "updatedAt": "2025-03-31T04:04:11.019Z"
                },
                "category": "Home Service",
                "time": "01:00 AM",
                "date": "2025-03-29T00:00:00.000Z",
                "finalDeliverables": [
                  "https://firebasestorage.googleapis.com/v0/b/realstate-aa106.appspot.com/o/orders%2F1743658339086job%2Bseekers%2BSurge%2BForce-1200px.png?alt=media&token=b84b6179-6ee5-444b-baf9-f27445cbf2c8"
                ],
                "orderProgress": [
                  {
                    "progressStatus": "ORDER_IN_PROGRESS",
                    "progressDate": "2025-03-31T04:04:11.018Z",
                    "_id": "67ea143b56f46a560e39d3fb"
                  },
                  {
                    "progressStatus": "ORDER_DELIVERED",
                    "progressDate": "2025-04-03T05:32:27.232Z",
                    "_id": "67ee1d6bddf9416cc5bb76d9"
                  }
                ],
                "revisions": [],
                "createdAt": "2025-03-31T04:04:11.019Z",
                "updatedAt": "2025-04-03T05:32:27.235Z",
                "__v": 1,
                "deliveredDate": "2025-04-03T05:32:27.232Z",
                "deliveryNotes": "Order ID2061- Delivery Note"
              },
              {
                "_id": "67e46b1c1bf738aa0953ebbe",
                "id": "ID1040",
                "title": "price 680",
                "description": "qwqwqwqwewew",
                "user": {
                  "_id": "67a9c602f33a18205df6b4d7",
                  "firstName": "Silvestor",
                  "lastName": "Kumara",
                  "email": "mandu@indigobook.com",
                  "profilePicture": "https://youtube.com",
                  "roles": [
                    "USER",
                    "TASKER"
                  ],
                  "aboutMe": {
                    "isVerified": true,
                    "primary": "I am a professional tasker"
                  },
                  "idNumber": {
                    "isVerified": true,
                    "primary": "1234567890V"
                  },
                  "idImages": {
                    "primary": [
                      "https://youtube.com",
                      "https://youtube.com"
                    ],
                    "isVerified": true,
                    "secondary": []
                  },
                  "professionalDetails": {
                    "primary": [
                      {
                        "categoryName": "Home Service",
                        "skills": [
                          {
                            "skillName": "Appliance Installation and Repairs",
                            "description": "Proficiency in installations and repairs",
                            "_id": "67a9c711f33a18205df6b519"
                          },
                          {
                            "skillName": "Pest Control Assistance",
                            "description": "Proficiency in pest control assistance",
                            "_id": "67a9c711f33a18205df6b51a"
                          }
                        ],
                        "_id": "67a9c711f33a18205df6b518",
                        "createdAt": "2025-02-10T09:29:53.886Z",
                        "updatedAt": "2025-02-10T09:29:53.886Z"
                      }
                    ],
                    "isVerified": true,
                    "secondary": []
                  },
                  "servingAreas": {
                    "primary": [
                      {
                        "cityName": "Tamale",
                        "subcities": [
                          "Sagnarigu",
                          "Savelugu"
                        ],
                        "_id": "67a9c711f33a18205df6b51b",
                        "createdAt": "2025-02-10T09:29:53.886Z",
                        "updatedAt": "2025-02-10T09:29:53.886Z"
                      }
                    ],
                    "isVerified": true,
                    "secondary": []
                  },
                  "wallet": {
                    "type": "user",
                    "amount": 0,
                    "pending": 29217.600000000002,
                    "_id": "67a9c602f33a18205df6b4d6",
                    "createdAt": "2025-02-10T09:25:22.677Z",
                    "updatedAt": "2025-03-31T08:15:41.463Z"
                  },
                  "payoutDetailsMobileMoney": {
                    "isVerified": true,
                    "primary": {
                      "mobileMoneyProvider": "AirtelTigo Money",
                      "mobileNumber": "0331243568",
                      "accHolderFullName": "Steve SmithJR",
                      "_id": "67a9c711f33a18205df6b51c",
                      "createdAt": "2025-02-11T05:07:42.592Z",
                      "updatedAt": "2025-02-11T05:07:42.592Z"
                    }
                  },
                  "payoutDetailsBankDetails": {
                    "isVerified": true,
                    "primary": {
                      "bankName": "Zenith Bank Ghana",
                      "accHolderFullName": "Black MythJR",
                      "accNumber": "00334455663",
                      "branchName": "Example branch",
                      "_id": "67a9c711f33a18205df6b51d",
                      "createdAt": "2025-02-11T05:07:42.593Z",
                      "updatedAt": "2025-02-11T05:07:42.593Z"
                    }
                  },
                  "verifiedByAdmin": true,
                  "createdAt": "2025-02-10T09:25:22.678Z",
                  "updatedAt": "2025-04-07T08:08:14.582Z",
                  "__v": 3,
                  "phoneNumber": "0331232124",
                  "id": "ID1002",
                  "paymentType": "BANK",
                  "proofAddress": {
                    "isVerified": false,
                    "primary": [],
                    "secondary": []
                  },
                  "expiredAt": "2025-04-07T08:14:14.576Z",
                  "verifyToken": "a2551f42a3093f09e1d766a3fd4ed4a74b17e768977d5e33937803776e53350d"
                },
                "tasker": {
                  "_id": "67a9c3f5e57bc3b49b29e715",
                  "firstName": "Chamalka",
                  "lastName": "Marasinghe",
                  "email": "chamalkaauth@freesourcecodes.com",
                  "phoneNumber": "0331232123",
                  "profilePicture": "https://firebasestorage.googleapis.com/v0/b/realstate-aa106.appspot.com/o/profilepictures%2F1744612099266client-howItWork.7dbe86f1af5b4b690080.jpg?alt=media&token=3df0d17d-61ff-429f-b08f-9118ec0a7fcd",
                  "roles": [
                    "USER",
                    "TASKER"
                  ],
                  "aboutMe": {
                    "primary": "I am a professional tasker",
                    "isVerified": true
                  },
                  "idNumber": {
                    "primary": "1244567890V",
                    "isVerified": true
                  },
                  "idImages": {
                    "primary": [
                      "https://youtube.com",
                      "https://youtube.com"
                    ],
                    "isVerified": true
                  },
                  "professionalDetails": {
                    "primary": [
                      {
                        "categoryName": "Home Service",
                        "skills": [
                          {
                            "skillName": "Appliance Installation and Repairs",
                            "description": "Proficiency in installations and repairs",
                            "_id": "67fcfe1239cfb992384d1403"
                          },
                          {
                            "skillName": "Pest Control Assistance",
                            "description": "Proficiency in pest control assistance",
                            "_id": "67fcfe1239cfb992384d1404"
                          }
                        ],
                        "_id": "67fcfe1239cfb992384d1402",
                        "createdAt": "2025-04-14T12:22:42.489Z",
                        "updatedAt": "2025-04-14T12:22:42.489Z"
                      }
                    ],
                    "isVerified": true
                  },
                  "servingAreas": {
                    "primary": [
                      {
                        "cityName": "Tamale",
                        "subcities": [
                          "Sagnarigu",
                          "Savelugu"
                        ],
                        "_id": "67fcfe1239cfb992384d1405",
                        "createdAt": "2025-04-14T12:22:42.490Z",
                        "updatedAt": "2025-04-14T12:22:42.490Z"
                      }
                    ],
                    "isVerified": true
                  },
                  "wallet": {
                    "type": "user",
                    "amount": 18524,
                    "pending": 69590.39999999995,
                    "_id": "67a9c3f5e57bc3b49b29e714",
                    "createdAt": "2025-02-10T09:16:37.933Z",
                    "updatedAt": "2025-04-11T10:36:07.491Z"
                  },
                  "payoutDetailsMobileMoney": {
                    "primary": {
                      "mobileMoneyProvider": "MTN Mobile Money (MTN MoMo)",
                      "mobileNumber": "0551234987",
                      "accHolderFullName": "Steve Smithdfg",
                      "_id": "67fcfe1239cfb992384d1407",
                      "createdAt": "2025-04-14T12:22:42.490Z",
                      "updatedAt": "2025-04-28T13:09:57.060Z"
                    },
                    "isVerified": true
                  },
                  "payoutDetailsBankDetails": {
                    "primary": {
                      "bankName": null,
                      "accHolderFullName": null,
                      "accNumber": null,
                      "branchName": null,
                      "_id": "67fcfe1239cfb992384d1409",
                      "createdAt": "2025-04-14T12:22:42.491Z",
                      "updatedAt": "2025-04-28T13:09:57.060Z"
                    },
                    "isVerified": true
                  },
                  "verifiedByAdmin": true,
                  "createdAt": "2025-02-10T09:16:37.934Z",
                  "updatedAt": "2025-04-28T13:09:57.060Z",
                  "__v": 25,
                  "jobTitle": "Junior",
                  "level": 3,
                  "taskerRequestedAt": "2025-03-13T18:48:57.456Z",
                  "isRequest": false,
                  "id": "ID1001",
                  "isSuspended": false,
                  "taskerRequestedAndStillNotVerified": false,
                  "taskerSuspendedAt": "2025-03-13T16:08:25.478Z",
                  "taskerVerifiedAt": "2025-03-14T10:19:45.459Z",
                  "paymentType": "MOBILE_MONEY",
                  "bankCode": "",
                  "mobileMoneyProviderCode": "mtn",
                  "proofAddress": {
                    "primary": [
                      "https://firebasestorage.googleapis.com/v0/b/realstate-aa106.appspot.com/o/undefined%2F1744633344480IMG_20250414_160248.jpg?alt=media&token=ea4439e8-9fea-4884-a66f-80c90e80d1dd"
                    ],
                    "isVerified": true
                  },
                  "paystackCustomerId": "CUS_ydwjqy4uoo1iqmr",
                  "paystackRecipientCode": "RCP_fvk6q4u21y2fycq",
                  "expiredAt": "2025-04-07T08:13:40.011Z",
                  "verifyToken": "bae1976c8f6a30454604bcb82d11c035e20f6da7141b0a826d52ebbe4c2d9e54",
                  "location": "Sekondi-Takoradi"
                },
                "status": "ORDER_DELIVERED",
                "offerId": "67e46af6389c77ce88e10a7b",
                "paid": true,
                "price": 680,
                "paymentDetils": {
                  "id": "ID1038",
                  "paid": true,
                  "_id": "67e46b1c1bf738aa0953ebbf",
                  "createdAt": "2025-03-26T21:01:16.232Z",
                  "updatedAt": "2025-03-26T21:01:16.232Z"
                },
                "category": "Home Service",
                "time": "02:00 AM",
                "date": "2025-03-28T00:00:00.000Z",
                "finalDeliverables": [
                  "https://example.com/final-report.png"
                ],
                "orderProgress": [
                  {
                    "progressStatus": "ORDER_IN_PROGRESS",
                    "progressDate": "2025-03-26T21:01:16.230Z",
                    "_id": "67e46b1c1bf738aa0953ebc0"
                  },
                  {
                    "progressStatus": "ORDER_DELIVERED",
                    "progressDate": "2025-03-26T21:04:46.952Z",
                    "_id": "67e46bee389c77ce88e10b08"
                  }
                ],
                "revisions": [],
                "createdAt": "2025-03-26T21:01:16.232Z",
                "updatedAt": "2025-03-26T21:04:46.955Z",
                "__v": 1,
                "deliveredDate": "2025-03-26T21:04:46.952Z",
                "deliveryNotes": "The project IO has been completed successfully. Please find the final deliverables attached."
              },
              {
                "_id": "67e45ad31bf738aa0953eaca",
                "id": "ID1039",
                "title": "260",
                "description": "260",
                "user": {
                  "_id": "67a9c602f33a18205df6b4d7",
                  "firstName": "Silvestor",
                  "lastName": "Kumara",
                  "email": "mandu@indigobook.com",
                  "profilePicture": "https://youtube.com",
                  "roles": [
                    "USER",
                    "TASKER"
                  ],
                  "aboutMe": {
                    "isVerified": true,
                    "primary": "I am a professional tasker"
                  },
                  "idNumber": {
                    "isVerified": true,
                    "primary": "1234567890V"
                  },
                  "idImages": {
                    "primary": [
                      "https://youtube.com",
                      "https://youtube.com"
                    ],
                    "isVerified": true,
                    "secondary": []
                  },
                  "professionalDetails": {
                    "primary": [
                      {
                        "categoryName": "Home Service",
                        "skills": [
                          {
                            "skillName": "Appliance Installation and Repairs",
                            "description": "Proficiency in installations and repairs",
                            "_id": "67a9c711f33a18205df6b519"
                          },
                          {
                            "skillName": "Pest Control Assistance",
                            "description": "Proficiency in pest control assistance",
                            "_id": "67a9c711f33a18205df6b51a"
                          }
                        ],
                        "_id": "67a9c711f33a18205df6b518",
                        "createdAt": "2025-02-10T09:29:53.886Z",
                        "updatedAt": "2025-02-10T09:29:53.886Z"
                      }
                    ],
                    "isVerified": true,
                    "secondary": []
                  },
                  "servingAreas": {
                    "primary": [
                      {
                        "cityName": "Tamale",
                        "subcities": [
                          "Sagnarigu",
                          "Savelugu"
                        ],
                        "_id": "67a9c711f33a18205df6b51b",
                        "createdAt": "2025-02-10T09:29:53.886Z",
                        "updatedAt": "2025-02-10T09:29:53.886Z"
                      }
                    ],
                    "isVerified": true,
                    "secondary": []
                  },
                  "wallet": {
                    "type": "user",
                    "amount": 0,
                    "pending": 29217.600000000002,
                    "_id": "67a9c602f33a18205df6b4d6",
                    "createdAt": "2025-02-10T09:25:22.677Z",
                    "updatedAt": "2025-03-31T08:15:41.463Z"
                  },
                  "payoutDetailsMobileMoney": {
                    "isVerified": true,
                    "primary": {
                      "mobileMoneyProvider": "AirtelTigo Money",
                      "mobileNumber": "0331243568",
                      "accHolderFullName": "Steve SmithJR",
                      "_id": "67a9c711f33a18205df6b51c",
                      "createdAt": "2025-02-11T05:07:42.592Z",
                      "updatedAt": "2025-02-11T05:07:42.592Z"
                    }
                  },
                  "payoutDetailsBankDetails": {
                    "isVerified": true,
                    "primary": {
                      "bankName": "Zenith Bank Ghana",
                      "accHolderFullName": "Black MythJR",
                      "accNumber": "00334455663",
                      "branchName": "Example branch",
                      "_id": "67a9c711f33a18205df6b51d",
                      "createdAt": "2025-02-11T05:07:42.593Z",
                      "updatedAt": "2025-02-11T05:07:42.593Z"
                    }
                  },
                  "verifiedByAdmin": true,
                  "createdAt": "2025-02-10T09:25:22.678Z",
                  "updatedAt": "2025-04-07T08:08:14.582Z",
                  "__v": 3,
                  "phoneNumber": "0331232124",
                  "id": "ID1002",
                  "paymentType": "BANK",
                  "proofAddress": {
                    "isVerified": false,
                    "primary": [],
                    "secondary": []
                  },
                  "expiredAt": "2025-04-07T08:14:14.576Z",
                  "verifyToken": "a2551f42a3093f09e1d766a3fd4ed4a74b17e768977d5e33937803776e53350d"
                },
                "tasker": {
                  "_id": "67a9c3f5e57bc3b49b29e715",
                  "firstName": "Chamalka",
                  "lastName": "Marasinghe",
                  "email": "chamalkaauth@freesourcecodes.com",
                  "phoneNumber": "0331232123",
                  "profilePicture": "https://firebasestorage.googleapis.com/v0/b/realstate-aa106.appspot.com/o/profilepictures%2F1744612099266client-howItWork.7dbe86f1af5b4b690080.jpg?alt=media&token=3df0d17d-61ff-429f-b08f-9118ec0a7fcd",
                  "roles": [
                    "USER",
                    "TASKER"
                  ],
                  "aboutMe": {
                    "primary": "I am a professional tasker",
                    "isVerified": true
                  },
                  "idNumber": {
                    "primary": "1244567890V",
                    "isVerified": true
                  },
                  "idImages": {
                    "primary": [
                      "https://youtube.com",
                      "https://youtube.com"
                    ],
                    "isVerified": true
                  },
                  "professionalDetails": {
                    "primary": [
                      {
                        "categoryName": "Home Service",
                        "skills": [
                          {
                            "skillName": "Appliance Installation and Repairs",
                            "description": "Proficiency in installations and repairs",
                            "_id": "67fcfe1239cfb992384d1403"
                          },
                          {
                            "skillName": "Pest Control Assistance",
                            "description": "Proficiency in pest control assistance",
                            "_id": "67fcfe1239cfb992384d1404"
                          }
                        ],
                        "_id": "67fcfe1239cfb992384d1402",
                        "createdAt": "2025-04-14T12:22:42.489Z",
                        "updatedAt": "2025-04-14T12:22:42.489Z"
                      }
                    ],
                    "isVerified": true
                  },
                  "servingAreas": {
                    "primary": [
                      {
                        "cityName": "Tamale",
                        "subcities": [
                          "Sagnarigu",
                          "Savelugu"
                        ],
                        "_id": "67fcfe1239cfb992384d1405",
                        "createdAt": "2025-04-14T12:22:42.490Z",
                        "updatedAt": "2025-04-14T12:22:42.490Z"
                      }
                    ],
                    "isVerified": true
                  },
                  "wallet": {
                    "type": "user",
                    "amount": 18524,
                    "pending": 69590.39999999995,
                    "_id": "67a9c3f5e57bc3b49b29e714",
                    "createdAt": "2025-02-10T09:16:37.933Z",
                    "updatedAt": "2025-04-11T10:36:07.491Z"
                  },
                  "payoutDetailsMobileMoney": {
                    "primary": {
                      "mobileMoneyProvider": "MTN Mobile Money (MTN MoMo)",
                      "mobileNumber": "0551234987",
                      "accHolderFullName": "Steve Smithdfg",
                      "_id": "67fcfe1239cfb992384d1407",
                      "createdAt": "2025-04-14T12:22:42.490Z",
                      "updatedAt": "2025-04-28T13:09:57.060Z"
                    },
                    "isVerified": true
                  },
                  "payoutDetailsBankDetails": {
                    "primary": {
                      "bankName": null,
                      "accHolderFullName": null,
                      "accNumber": null,
                      "branchName": null,
                      "_id": "67fcfe1239cfb992384d1409",
                      "createdAt": "2025-04-14T12:22:42.491Z",
                      "updatedAt": "2025-04-28T13:09:57.060Z"
                    },
                    "isVerified": true
                  },
                  "verifiedByAdmin": true,
                  "createdAt": "2025-02-10T09:16:37.934Z",
                  "updatedAt": "2025-04-28T13:09:57.060Z",
                  "__v": 25,
                  "jobTitle": "Junior",
                  "level": 3,
                  "taskerRequestedAt": "2025-03-13T18:48:57.456Z",
                  "isRequest": false,
                  "id": "ID1001",
                  "isSuspended": false,
                  "taskerRequestedAndStillNotVerified": false,
                  "taskerSuspendedAt": "2025-03-13T16:08:25.478Z",
                  "taskerVerifiedAt": "2025-03-14T10:19:45.459Z",
                  "paymentType": "MOBILE_MONEY",
                  "bankCode": "",
                  "mobileMoneyProviderCode": "mtn",
                  "proofAddress": {
                    "primary": [
                      "https://firebasestorage.googleapis.com/v0/b/realstate-aa106.appspot.com/o/undefined%2F1744633344480IMG_20250414_160248.jpg?alt=media&token=ea4439e8-9fea-4884-a66f-80c90e80d1dd"
                    ],
                    "isVerified": true
                  },
                  "paystackCustomerId": "CUS_ydwjqy4uoo1iqmr",
                  "paystackRecipientCode": "RCP_fvk6q4u21y2fycq",
                  "expiredAt": "2025-04-07T08:13:40.011Z",
                  "verifyToken": "bae1976c8f6a30454604bcb82d11c035e20f6da7141b0a826d52ebbe4c2d9e54",
                  "location": "Sekondi-Takoradi"
                },
                "status": "ORDER_DELIVERED",
                "offerId": "67e459484a727412710f423e",
                "paid": true,
                "price": 260,
                "paymentDetils": {
                  "id": "ID1037",
                  "paid": true,
                  "_id": "67e45ad31bf738aa0953eacb",
                  "createdAt": "2025-03-26T19:51:47.130Z",
                  "updatedAt": "2025-03-26T19:51:47.130Z"
                },
                "category": "Home Service",
                "time": "02:00 AM",
                "date": "2025-03-28T00:00:00.000Z",
                "finalDeliverables": [
                  "https://example.com/final-report.png"
                ],
                "orderProgress": [
                  {
                    "progressStatus": "ORDER_IN_PROGRESS",
                    "progressDate": "2025-03-26T19:51:47.128Z",
                    "_id": "67e45ad31bf738aa0953eacc"
                  },
                  {
                    "progressStatus": "ORDER_DELIVERED",
                    "progressDate": "2025-03-26T19:55:21.116Z",
                    "_id": "67e45ba939fb1a00485c056d"
                  }
                ],
                "revisions": [],
                "createdAt": "2025-03-26T19:51:47.130Z",
                "updatedAt": "2025-03-26T19:55:21.122Z",
                "__v": 1,
                "deliveredDate": "2025-03-26T19:55:21.115Z",
                "deliveryNotes": "The project IO has been completed successfully. Please find the final deliverables attached."
              }
            ],
            "pagination": {
              "offset": 0,
              "limit": 5,
              "totalDocuments": 10
            }
          }
        }
      }

      if (result?.success) {
        if (result?.response?.data?.isCategoryReport) {
          if (setStaticalData) {
            setStaticalData(result?.response?.data?.data[0] || []);
          }
          setData(result?.response?.data?.data[0]?.categoryList || []);
        } else if (result?.response?.data?.isPaymentHistoryReport) {
          if (setStaticalData) {
            setStaticalData(result?.response?.data?.data[0] || []);
          }
          setData(result?.response?.data?.data[0]?.paymentHistoryList || []);
        } else {
          setData(result?.response?.data?.data || []);
        }
        setTotalItems(result?.response?.data?.pagination?.totalDocuments || 0);
      } else {
        console.error("Error fetching data:", result?.error);
        setData([]);
        setTotalItems(0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  // Load data when component mounts or when relevant params change
  useEffect(() => {
    loadData();
  }, [
    currentPage,
    currentPageSize,
    searchParams.get("sortField"),
    searchParams.get("sortOrder"),
    JSON.stringify(filters),
    refreshTrigger,
  ]);

  // Update Loading state for category report
  useEffect(() => {
    if (setLoadingReport) {
      setLoadingReport(isFetchingData);
    }
  }, [isFetchingData]);

  // Handle pagination change
  const handlePaginationChange = (page, pageSize) => {
    // Update URL params directly
    updateUrlParams({
      page: page,
      pageSize: pageSize,
    });

    // Data will be loaded in the useEffect when URL params change
  };

  // Handle table sorting
  const handleTableChange = (pagination, filters, sorter) => {
    if (sorter.order) {
      // Update sort params and reset to page 1
      updateUrlParams({
        sortField: sorter.field,
        sortOrder: sorter.order,
        page: 1,
      });
    } else if (searchParams.has("sortField") || searchParams.has("sortOrder")) {
      // Clear sorting if it was previously set
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("sortField");
      newParams.delete("sortOrder");
      setSearchParams(newParams);
    }
  };

  // Enhanced columns with conditional sorting
  const enhancedColumns = columns.map((col) => ({
    ...col,
    sorter: col.sortable === true ? true : false,
    sortOrder:
      searchParams.get("sortField") === col.key
        ? searchParams.get("sortOrder")
        : null,
    onCell: () => ({
      style: {
        maxWidth: col.maxWidth || "auto",
        whiteSpace: col.maxWidth ? "nowrap" : "pre-wrap",
        overflow: col.maxWidth ? "hidden" : "visible",
        textOverflow: col.maxWidth ? "ellipsis" : "clip",
        minWidth: col.minWidth || "100px", // default minWidth here
      },
    }),

    // Handle nested data paths in dataIndex
    render:
      col.render ||
      ((text, record) => {
        if (typeof col.dataIndex === "string") {
          return text;
        }
        // Handle array dataIndex for nested data
        if (Array.isArray(col.dataIndex)) {
          let value = record;
          for (const key of col.dataIndex) {
            value = value?.[key];
          }
          return value;
        }
        return text;
      }),
  }));

  // sub-table render function to handle both nested and parent data
  const expandedRowRender = (record) => {    
    if (!hasSubTable || !subTableConfig.columns) {
      return null;
    }
    
    // Create a combined data object that includes both parent and nested data
    // const subTableData = {
    //   ...record,
    //   ...(subTableConfig.dataField
    //     ? { paymentDetails: record[subTableConfig.dataField] }
    //     : {}),
    // };

    return (
      <>
        <Table
          columns={subTableConfig.columns}
          dataSource={[record]} // Pass as single-item array since we're showing details
          pagination={false}
          rowKey={subTableConfig.rowKey || "id"}
          components={{
            header: {
              cell: (props) => (
                <th
                  {...props}
                  style={{
                    backgroundColor: "#FFF7ED",
                    fontFamily: "Inter",
                    fontWeight: 500,
                    fontSize: "14px",
                    color: headingTextColor,
                    letterSpacing: "0.014em",
                    padding: "12px",
                  }}
                />
              ),
            },
            body: {
              cell: (props) => (
                <td
                  {...props}
                  style={{
                    fontSize: "12px", // Change text size
                    fontFamily: "Inter",
                    padding: "12px",
                  }}
                />
              ),
            },
          }}
        />
        {
          subTableConfig.columns_second_level?.length > 0 && (
            <Table
              columns={subTableConfig.columns_second_level}
              dataSource={[record]} // Pass as single-item array since we're showing details
              pagination={false}
              rowKey={subTableConfig.rowKey || "id"}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{
                        backgroundColor: "#FFF7ED",
                        fontFamily: "Inter",
                        fontWeight: 500,
                        fontSize: "14px",
                        color: headingTextColor,
                        letterSpacing: "0.014em",
                        padding: "12px",
                      }}
                    />
                  ),
                },
                body: {
                  cell: (props) => (
                    <td
                      {...props}
                      style={{
                        fontSize: "12px", // Change text size
                        fontFamily: "Inter",
                        padding: "12px",
                      }}
                    />
                  ),
                },
              }}
            />
          )
        }
      </>
    );
  };

  // Create skeleton loader for the table
  const renderSkeleton = () => {
    const skeletonRows = Array(currentPageSize)
      .fill(null)
      .map((_, index) => ({
        key: `skeleton-${index}`,
        isSkeletonRow: true,
      }));

    // Custom render function for skeleton columns
    const skeletonColumns = enhancedColumns.map((col) => ({
      ...col,
      render: (text, record) => {
        if (record.isSkeletonRow) {
          return (
            <Skeleton.Button
              active
              style={{ width: "100%", height: 20 }}
              size="small"
            />
          );
        }
        return col.render ? col.render(text, record) : text;
      },
    }));

    return (
      <Table
        columns={skeletonColumns}
        dataSource={skeletonRows}
        pagination={false}
        rowKey="key"
        style={{
          borderRadius: "8px",
          border: "1px solid #dde1e6",
          minWidth: "100%",
          ...tableStyle,
        }}
        components={{
          header: {
            cell: (props) => (
              <th
                {...props}
                style={{
                  backgroundColor: headingBgColor,
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: "14px",
                  color: headingTextColor,
                  letterSpacing: "0.014em",
                  padding: "12px",
                }}
              />
            ),
          },
          body: {
            cell: (props) => (
              <td
                {...props}
                style={{
                  fontSize: "12px",
                  fontFamily: "Inter",
                  color: "#333",
                  padding: "12px",
                }}
              />
            ),
          },
        }}
      />
    );
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-col flex-grow w-full overflow-x-auto">
        {loading ? (
          renderSkeleton()
        ) : (
          <Table
            columns={enhancedColumns}
            dataSource={data}
            rowKey={rowKey}
            loading={false} // We're handling loading state with Skeleton
            onChange={handleTableChange}
            pagination={false} // Disable built-in pagination
            expandable={
              hasSubTable
                ? {
                    expandedRowRender,
                    // expandRowByClick: true,
                    expandRowByClick: false,
                    expandIcon: ({ expanded, onExpand, record }) => (
                      <CustomExpandIcon
                        expanded={expanded}
                        onExpand={onExpand}
                        record={record}
                      />
                    ),
                  }
                : undefined
            }
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              borderRadius: "8px",
              border: "1px solid #dde1e6",
              minWidth: "100%",
              ...tableStyle,
            }}
            components={{
              header: {
                cell: (props) => (
                  <th
                    {...props}
                    style={{
                      backgroundColor: '#FAFAFA',
                      fontFamily: "Inter",
                      fontWeight: 600,
                      fontSize: "14px",
                      color: headingTextColor,
                      letterSpacing: "0.014em",
                      padding: "12px",
                      borderTop: "1px solid #E6E7EC",
                      borderBottom: "1px solid #E6E7EC",
                      borderBottom: "1px solid #E6E7EC",
                    }}
                  />
                ),
              },
              body: {
                cell: (props) => (
                  <td
                    {...props}
                    style={{
                      backgroundColor: '#FFFFFF',
                      fontSize: "14px", // Change text size
                      fontFamily: "Inter",
                      color: "#5C5F6A", // Adjust text color if needed
                      padding: "12px",
                      fontWeight: 400,
                    }}
                  />
                ),
              },           
            }}
          />
        )}
      </div>
      {/* Render Pagination outside the table */}
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginTop: "16px", // Adjust margin as needed
        }}
      >
        <Pagination
          current={currentPage}
          pageSize={currentPageSize}
          total={totalItems}
          onChange={handlePaginationChange}
          showSizeChanger={false} // Optional: Enable size changer
        />
        
      </div>
    </div>
  );
};

export default DataTable;
