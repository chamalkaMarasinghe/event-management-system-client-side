// Imports Icons
import PolandFlag from '../assets/images/poland_flag.svg';
import UsFlag from '../assets/images/us_flag.svg';

export const LANGUAGE = {
  ENGLISH: {value: "ENGLISH", flag: UsFlag},
  POLISH: {value: "POLISH", flag: PolandFlag},
}

export const customBreakpoints = {
  "320px": 320,
  "360px": 360,
  "380px": 380,
  "480px": 480,
  "520px": 520,
  "640px": 640,
  "680px": 680,
  "768px": 768,
  "920px": 920,
  "1024px": 1024,
  "1280px": 1280,
  "1536px": 1536,
};

export const CLIENT_PAYMENT_STATUS = {
  COMPLETED: "COMPLETED",
  PENDING: "PENDING",
  REFUNDED: "REFUNDED"
}

export const PAYMENT_METHODS = {
  INHOUSE: "INHOUSE",
  ONLINE: "ONLINE",
  SUBSCRIPTION: "SUBSCRIPTION",
};

export const PAYMENT_TYPES = {
  SUBSCRIPTION_BASED: "SUBSCRIPTION_BASED", 
  PAY_FOR_ONLY_ONE: "PAY_FOR_ONLY_ONE", 
};

export const SCHEDULING_TYPES = {
  ONETIME: "ONETIME",
  RECURRING: "RECURRING",
  SUBSCRIPTION: "SUBSCRIPTION",
};

export const EVENT_TYPES = {
  OPEN: "OPEN",
  PUBLIC: "PUBLIC",
  PRIVATE: "PRIVATE",
  RECURRING: "RECURRING",
  SUBSCRIPTION: "SUBSCRIPTION",
};

export const CLIENT_ORDERS_TABLE_TABS = {
  ALL: "ALL",
  UPCOMING: "UPCOMING",
  COMPLETED: "COMPLETED",
};

export const paymentStatus = {
  PENDING: "PENDING",
  PAID: "PAID",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
  CANCELED: "CANCELED"
};

export const paymentMethod = {
  CREDIT_CARD: "CREDIT_CARD",
  PREZELWAY_24: "PREZELWAY_24"
};

export const payoutStatus = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED"
};

export const refundStatus = {
  PENDING: "PENDING",
  REFUNDED: "REFUNDED"
};

export const eventStatus = {
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
  CANCELED: "CANCELED",
};

export const AUTH_POPUP_VARIANTS = {
  REGISTER: "register",
  SIGNIN: "signin",
  FORGOT_PASSWORD: "forgot_password",
  RESET_PASSWORD: "reset_password",
};

export const FORM_MODES = {
  VIEW: "view",
  EDIT: "edit",
  ADD: "add",
};

// INFO: User Roles
export const roles = {
  USER: "USER",
  TASKER: "TASKER",
};

export const revitionStatus = {
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
};

export const paymentHistoryTypes = {
  PAYMENT: "PAYMENT",
  PAYOUT: "PAYOUT",
};

// INFO: User Roles For Dropdown
export const rolesForDropdown = [
  { label: "Client", id: "USER" },
  { label: "Service Provider", id: "TASKER" },
];

export const firebaseUplaodFolders = {
  F_ID_IMAGES: "idimages",
  F_OFFERS: "offers",
  F_ORDERS: "orders",
  F_PROFILE_PICTURES: "profilepictures",
  F_COMPLAINTS: "complaints",
  F_ISSUES: "issues",
  F_MESSAGES: "messages",
  F_MESSAGES_ATTACHMENTS: "message_attachments",
  F_REFERENCES: "references",
  F_JOB_POSTS: "jobposts",
  F_ADDRESS_PROOF: "addressproof",
};

// INFO: order states
export const orderStatus = {
  ORDER_IN_PROGRESS: "ORDER_IN_PROGRESS",
  ORDER_DELIVERED: "ORDER_DELIVERED",
  IN_REVISION: "IN_REVISION",
  COMPLETED: "COMPLETED",
  COMPLAINT_RAISED: "COMPLAINT_RAISED",
  COMPLAINT_RESOLVED: "COMPLAINT_RESOLVED",
  ISSUE_RAISED: "ISSUE_RAISED",
  ISSUE_RESOLVED: "ISSUE_RESOLVED",
};

// export const IGNORED_STATUSES = {
//   USER: [orderStatus.ISSUE_RAISED, orderStatus.ISSUE_RESOLVED],
//   TASKER: [orderStatus.COMPLAINT_RAISED, orderStatus.COMPLAINT_RESOLVED],
// };

// INFO: offers states
export const offerStatus = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  DECLINED: "DECLINED",
  CANCELLED: "CANCELLED",
};

// INFO: message types
export const messageTypes = {
  OFFER: "OFFER",
  OFFER_ACTION: "OFFER_ACTION",
  TEXT: "TEXT",
};

// INFO: offer action messages
// export const offerActionMessages = {
//   ACCEPTED: "Offer has been accepted",
//   DECLINED: "Offer has been declined",
// };

export const referencesFormats = {
  JPEG_JPG: { mime: "image/jpeg", extensions: [".jpeg", ".jpg"] },
  PNG: { mime: "image/png", extensions: [".png"] },
  PDF: { mime: "application/pdf", extensions: [".pdf"] },
  DOC: { mime: "application/msword", extensions: [".doc"] },
  DOCX: {
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    extensions: [".docx"],
  },
  XLSX: {
    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    extensions: [".xlsx"],
  },
  PPTX: {
    mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    extensions: [".pptx"],
  },
  CSV: { mime: "text/csv", extensions: [".csv"] },
  TXT: { mime: "text/plain", extensions: [".txt"] },
  ZIP: { mime: "application/zip", extensions: [".zip"] },
  RAR: { mime: "application/vnd.rar", extensions: [".rar"] },
};

export const maximumImagesUploadingSizes = {
  size_300KB: 0.3, // 300KB
  size_450KB: 0.45, // 300KB
  size_1MB: 1, // 300KB
};

// export const paymentMetrics = {
//   taskerCommision: 80, // 80%
//   clientFee: 6, // 6%
//   boundaryAmount: 200, // GHS
//   minimumAmount: 30, // GHS
//   flatFee: 20, // GHS
// };

// kidsplan
export const eventCategories = [
  { _id: 1, name: "Sports & Fitness" },
  { _id: 2, name: "Education & Learning" },
  { _id: 3, name: "Arts & Culture" },
  { _id: 4, name: "Technology & Innovation" },
  { _id: 5, name: "Business & Professional" },
  { _id: 6, name: "Health & Wellness" },
  { _id: 7, name: "Entertainment & Games" },
  { _id: 8, name: "Community & Social" },
  { _id: 9, name: "Other" },
];

export const PAYMENT_STATUS_OPTIONS = [
  { _id: 1, name: "Completed" },
  { _id: 2, name: "Pending" }
];

export const complaintTypes = [
    { id: "Event Issue", value: "Event Issue" },
    { id: "Service Complaint", value: "Service Complaint" },
    { id: "Billing Problem", value: "Billing Problem" },
    { id: "Event Delay", value: "Event Delay" },
    { id: "Other", value: "Other" },
];
