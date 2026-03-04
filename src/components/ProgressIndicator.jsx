import React from "react";
import { orderStatus, revitionStatus, roles } from "../../constants/commonConstants";
import { formatIndicatorDate } from "../../utils/dateFormating";
import { localStorageUtil } from "../../utils/localStorageUtil";

const ProgressIndicator = ({ orderFlow, revitions, orderData }) => {

  const {role} = localStorageUtil.get('auth');

  const getCurrentStatus = () => {
    if (!Array.isArray(orderFlow) || orderFlow.length === 0) {
      return "Unknown"; 
    }
    
    let filteredOrderData;

    let lastStatus = orderFlow[orderFlow.length - 1]?.progressStatus;

    if(role === roles.USER) {
      filteredOrderData = orderFlow.filter((order) => 
         order.progressStatus !== orderStatus.ISSUE_RAISED &&
        order.progressStatus !== orderStatus.ISSUE_RESOLVED
      );
    } else if(role === roles.TASKER) {
      filteredOrderData = orderFlow.filter((order) => 
        order.progressStatus !== orderStatus.COMPLAINT_RAISED &&
        order.progressStatus !== orderStatus.COMPLAINT_RESOLVED
      );
    } else {
      filteredOrderData = [...orderFlow];
    }

    if(
     lastStatus === orderStatus.IN_REVISION 
     && Array.isArray(revitions) 
     && revitions.length > 0) {
      const lastRevition = revitions[0];

      if (lastRevition.status === revitionStatus.ACTIVE) {
        return orderStatus.IN_REVISION
      }

      if(lastRevition.status === revitionStatus.COMPLETED) {
        return orderStatus.ORDER_DELIVERED
      }
    } 

    return filteredOrderData[filteredOrderData.length - 1]?.progressStatus || "Unknown";
  };

  
  // const getStatusDate = (status) => {
  //   const statusEntry = orderFlow.find((flow) => flow.status === status);
  //   return statusEntry?.date;
  // };

  const getStatusDate = (status) => {
    if (!Array.isArray(orderFlow)) return null; // Prevents error
    const statusEntry = orderFlow.find((order) => order.progressStatus === status);
    return statusEntry?.progressDate || null;
  };

  // const hasStatus = (status) => {
  //   return orderFlow.some((flow) => flow.status === status);
  // };

  // const hasStatus = (status) => {
  //   return Array.isArray(orderFlow) && orderFlow.some((order) => order.progressDate === status);
  // };

  const hasStatus = (status) => {
    return Array.isArray(orderFlow) && orderFlow.some((order) => order.progressStatus === status);
  };
  
  // Get the next expected status based on current status
  const getNextStatus = (currentStatus) => {
    
    switch (currentStatus) {

      case orderStatus.ORDER_IN_PROGRESS:
        return orderStatus.ORDER_DELIVERED;

      case orderStatus.ORDER_DELIVERED:
        return orderStatus.COMPLETED;

      case orderStatus.IN_REVISION:
        return orderStatus.ORDER_DELIVERED;

      case orderStatus.COMPLAINT_RAISED:
        return orderStatus.COMPLAINT_RESOLVED;

      default:
        return null;
    }
  };

  // Modified to handle next step status
  const getStepStatus = (stepStatus) => {

    const currentStatus = getCurrentStatus();
    const nextStatus = getNextStatus(currentStatus);  // After delivered -> completed || Revition 

    // console.log('currentStatus',currentStatus);
    // console.log('nextStatus', getNextStatus(currentStatus));
    // console.log('stepStatus',stepStatus);


    // If the step is the next expected status
    if (stepStatus === nextStatus) return "next";

    // If the step status exists in flow, mark as completed
    if (hasStatus(stepStatus)) return "completed";

    // If it's the current status
    if (stepStatus === currentStatus) return "inProgress";

    return "pending";
  };

  const getLatestRevisionDate = () => {
    if (!Array.isArray(revitions) || revitions.length === 0) {
      return null;
    }
    
    // Sort the revitions array by `updatedAt` in descending order to get the latest update
    const latestRevision = revitions.sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    )[0];
  
    // console.log("Latest Revision Date:", latestRevision?.updatedAt);
    return latestRevision?.updatedAt || null;
  };
  
  const getLatestDeliveryDate = () => {
    if (!Array.isArray(revitions) || revitions.length === 0) {
      return null;
    }
    
    // Sort the revitions array by `updatedAt` in descending order to get the latest update 
    const latestDelivery = revitions.sort(
      (a, b) => new Date(b.deliveredDate) - new Date(a.deliveredDate)
    )[0];

    // console.log("Latest Revision Date:", latestDelivery?.deliveredDate);
    return latestDelivery?.deliveredDate || null;
  };

  const getAllDeliveredDates = () => {
    const deliveryDates = [];

    // 1. From top-level deliveredDate field
    if(orderData?.deliveredDate) {
      deliveryDates.push(orderData?.deliveredDate);
    }

    // 2. From revisions where deliveredDate exists (usually with status === "COMPLETED")
    if(Array.isArray(revitions)) {
      const revisionDeliveredDates = revitions?.filter((rev) => rev?.deliveredDate)
        .map((rev) => rev.deliveredDate);

      deliveryDates.push(...revisionDeliveredDates);
    }

    return deliveryDates;
  }

  

  const generateSteps = () => {
    const currentStatus = getCurrentStatus();

    const steps = [
      {
        label: "In Progress",
        status: getStepStatus(orderStatus.ORDER_IN_PROGRESS),
        timestamp: formatIndicatorDate(getStatusDate(orderStatus.ORDER_IN_PROGRESS)),
      },
    ];

    if (currentStatus === orderStatus.ORDER_IN_PROGRESS) {
      const x = getStepStatus(orderStatus.ORDER_IN_PROGRESS);
      console.log('step status of Inprogress -', x);
      steps.push({
        label: "Delivered",
        status: getStepStatus(orderStatus.ORDER_DELIVERED),
        timestamp: null,
      })
    }


    if (hasStatus(orderStatus.ORDER_DELIVERED)) {

      const deliveredDates = getAllDeliveredDates();
      // console.log('Delivered Hitt')

      if(currentStatus === orderStatus.ORDER_DELIVERED) {
        // console.log('Delivered Hitt 2')

        // steps.push({
        //   label: "Delivered",
        //   status: getStepStatus(orderStatus.ORDER_DELIVERED),
        //   timestamp: formatIndicatorDate(deliveredDates[deliveredDates.length - 1]) // formatIndicatorDate(deliveredDates  [deliveredDates.length - 1]),
        // });

        // steps.push({
        //   label: "Completed",
        //   status: getStepStatus(orderStatus.ORDER_DELIVERED),
        //   timestamp: null,
        // })
      }

      if(currentStatus !== orderStatus.IN_REVISION && !hasStatus(orderStatus.IN_REVISION)) {
        // console.log('Delivered Hitt 3')

        steps.push({
          label: "Delivered",
          status: getStepStatus(orderStatus.ORDER_DELIVERED),
          timestamp: formatIndicatorDate(deliveredDates[deliveredDates.length - 1]) // formatIndicatorDate(deliveredDates  [deliveredDates.length - 1]),
        });
      }

      if(hasStatus(orderStatus.IN_REVISION)) {
        // console.log('Delivered Hitt 4')

        steps.push({
          label: "In Revision",
          status: getStepStatus(orderStatus.IN_REVISION),
          timestamp: formatIndicatorDate(getLatestRevisionDate()),
        });
  
        // Add next delivery step if currently in revision
        // console.log('revition deliver', revitions[0]?.status === revitionStatus.ACTIVE);

        if (Array.isArray(revitions) && revitions[0]?.status === revitionStatus.ACTIVE) {
          steps.push({
            label: "Delivered",
            status: "next",
            timestamp: null,
          });
        }

        if( 
          hasStatus(orderStatus.ORDER_DELIVERED) && 
          Array.isArray(revitions) && 
          revitions[0]?.status === revitionStatus.COMPLETED
        ) {
          steps.push({
            label: "Delivered",
            status: getStepStatus(orderStatus.ORDER_DELIVERED),
            timestamp: formatIndicatorDate(deliveredDates[deliveredDates.length - 1])
          });
        }
      }
    }

    // Add completed if it exists or should be next
    if (
      hasStatus(orderStatus.COMPLETED) ||
      (currentStatus === orderStatus.ORDER_DELIVERED &&
        !hasStatus(orderStatus.IN_REVISION))
    ) {
      steps.push({
        label: "Completed",
        status: getStepStatus(orderStatus.COMPLETED),
        timestamp: formatIndicatorDate(getStatusDate(orderStatus.COMPLETED)),
      });
    }

    // Add complaint steps
    if (role === roles.USER && hasStatus(orderStatus.COMPLAINT_RAISED)) {

      steps.push({
        label: "Complaint Raised",
        status: getStepStatus(orderStatus.COMPLAINT_RAISED),
        timestamp: formatIndicatorDate(
          getStatusDate(orderStatus.COMPLAINT_RAISED)
        ),
      });

      // Add resolved as next step if complaint is raised
      if (
        currentStatus === orderStatus.COMPLAINT_RAISED ||
        hasStatus(orderStatus.COMPLAINT_RESOLVED)
      ) {
        // console.log('complaint Hit');
        steps.push({
          label: "Complaint Resolved",
          status: getStepStatus(orderStatus.COMPLAINT_RESOLVED),
          timestamp: formatIndicatorDate(getStatusDate(orderStatus.COMPLAINT_RESOLVED)),
        });
      }
    }

    if (role === roles.TASKER && hasStatus(orderStatus.ISSUE_RAISED)) {

      steps.push({
        label: "Issue Raised",
        status: getStepStatus(orderStatus.ISSUE_RAISED),
        timestamp: formatIndicatorDate(
          getStatusDate(orderStatus.ISSUE_RAISED)
        ),
      });

      // Add resolved as next step if complaint is raised
      if (
        currentStatus === orderStatus.ISSUE_RAISED ||
        hasStatus(orderStatus.ISSUE_RESOLVED)
      ) {
        steps.push({
          label: "Issue Resolved",
          status: getStepStatus(orderStatus.ISSUE_RESOLVED),
          timestamp: formatIndicatorDate(getStatusDate(orderStatus.ISSUE_RESOLVED)),
        });
      }
    }
    
    return steps;
  };

  const steps = generateSteps();

  return (
    <div className="bg-white lg:sticky lg:top-24 h-fit border border-light-blue rounded-[20px] p-6 shadow-sm w-full lg:w-[379px] lg:max-w-[379px] min-h-[300px]">
      <h3 className="text-primary font-nonito_sans font-semibold text-[24px] mb-6">
        Progress Indicator
      </h3>

      <div className="flex flex-col">
        {steps.map((step, index) => (
          <React.Fragment key={`${step.label}-${index}`}>
            <div
              className={`flex items-center ${
                step.status === "pending" ? "items-center" : "items-start"
              } gap-4 relative max-h-[38px] h-[38px]`}
            >
              <div className="flex items-center gap-[32px]">
                <div className="flex items-center gap-3">
                  <div
                    className={`relative z-10 flex items-center justify-center w-[32px] h-[32px] rounded-full border-2 ${
                      step.status === "completed" ||
                      step.status === "inProgress"
                        ? "bg-primary border-primary"
                        : // : step.status === "next"
                          // ? "bg-white border-primary"
                          "bg-white border-[#C1C3C3]"
                    }`}
                  >
                    {step.status === "completed" ||
                    step.status === "inProgress" ? (
                      <svg
                        className="w-4 h-4 text-[var(--tertiary-color)]"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <span
                        className={`text-[13px] font-inter font-medium ${
                          // step.status === "next" ? "text-primary" : "text-[#242E39]"
                          "text-[#242E39]"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div
                      className={`flex ${
                        step.status === "pending"
                          ? "items-center flex-col"
                          : "items-start flex-col"
                      } gap-[10px] font-inter text-[13px]`}
                    >
                      <span
                        className={`${
                          step.status === "next"
                            ? "text-content font-medium "
                            : "text-primary font-bold"
                        }`}
                      >
                        {step.label}
                      </span>
                      {step.timestamp && (
                        <span className="text-[10px] font-inter text-[#555F7E]">
                          {step.timestamp}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {index !== steps.length - 1 && (
              <div className="w-[32px] h-[32px] flex items-center justify-center">
                <div
                  className={`w-[2px] h-[32px] ${
                    step.status === "completed" ? "bg-primary" : "bg-[#C1C3C3]"
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
