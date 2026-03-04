import axios from "axios";
import showToast from "../utils/toastNotifications";
import { CONFIGURATIONS } from "./envConfig";

export const payStackApi = axios.create({
  baseURL: `${CONFIGURATIONS.API_PAYSTACK_BASE_URL}/`,
  withCredentials: false, // Ensures cookies are included in all requests
});

payStackApi.interceptors.request.use(
  (config) => {
    if (!config?.voidAuth) {
      const key = config?.useSecretKey
        ? CONFIGURATIONS.API_PAYSTACK_SECRET_KEY
        : CONFIGURATIONS.API_PAYSTACK_PUBLIC_KEY;

      config.headers["Authorization"] = `Bearer ${key}`;
    }
    delete config.voidAuth;
    delete config.useSecretKey;

    return config;
  },
  (error) => {
    console.log("Request error:", error);
    return Promise.reject(error);
  }
);

payStackApi.interceptors.response.use(
  async (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      showToast(
        "error",
        "Authentication failed. Please try again or contact support."
      );
    }

    if (error.response) {
      // Extract relevant error data
      const { message, status, statusCode } = error.response.data || {};

      error.message = message || "An error occurred";
      error.code = `${error.response?.status || "500"}`;
      error.name = statusCode || status || "Axios Error";
    } else {
      console.log("Request error occurred");
      error.message = error.message || "Unknown error occurred";
      error.code = "500";
    }

    return Promise.reject(error);
  }
);
