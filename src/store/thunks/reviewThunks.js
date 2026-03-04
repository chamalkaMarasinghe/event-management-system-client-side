import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../config/api";

// NOTE: Add a review for an event
export const addEventReview = createAsyncThunk(
    "review/addEventReview",
    async ({ eventId, reviewData }, { rejectWithValue }) => {
            const response = await api.post(`/review/${eventId}`, {
                feedback: reviewData.feedBack,
                rating: reviewData.rating
            });
            return response.data;
    }
);

// NOTE: Get reviews for a specific service pro in client application
export const getClientServiceProReviews = createAsyncThunk(
    "clientReview/getServiceProReviews",
    async ({ serviceProId, offset = 0, limit = 10 }, { rejectWithValue }) => {
            const queryParams = new URLSearchParams();
            queryParams.set('offset', offset);
            queryParams.set('limit', limit);

            const response = await api.get(`/review/service-pro/${serviceProId}?${queryParams.toString()}`);
            return response.data;
    }
);