import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTaskerProfiles,
  getTaskerDetails,
  getTaskerProfile,
  contactUs,
  submitContactForm,
  getClientProfile,
  editClientProfile
} from "../thunks/userThunks";

const userSlice = createSlice({
  name: "user",
  initialState: {
    taskerProfiles: {
      profiles: [],
      pagination: {},
    },
    taskerProfile: {
      profile: {},
    },
    clientProfile: {
      profile: {},
    },
    fromToChat: "",
  },
  reducers: {
    fromToChatSaveSate: (state, action) => {
      state.fromToChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTaskerProfiles.fulfilled, (state, action) => {
      state.taskerProfiles.profiles = action.payload.data?.data || [];
      state.taskerProfiles.pagination = action.payload.data?.pagination || {};
    });

    builder.addCase(getTaskerDetails.fulfilled, (state, action) => {
      state.taskerProfile.profile = action.payload.data?.data[0] || {};
      console.log("Fetching tasker details");
    });

    builder.addCase(getTaskerProfile.fulfilled, (state, action) => {
      console.log("Fetching tasker profile");
    });

    builder.addCase(contactUs.fulfilled, (state, action) => {
      console.log("Contact us success");
    });

    // -----------------------KIDSPLAN-----------------------------------------------

    builder.addCase(getClientProfile.fulfilled, (state, action) => {
      state.clientProfile.profile = action.payload.data || {};
      console.log("Fetching client profile");
    });

    builder.addCase(editClientProfile.fulfilled, (state, action) => {
      state.clientProfile.profile = action.payload.data || {};
      console.log("Client profile updated");
    });

    builder.addCase(submitContactForm.fulfilled, (state, action) => {
      console.log("Contact form submitted successfully");
    });
  },
});

export const {
    fromToChatSaveSate
} = userSlice.actions;
export default userSlice.reducer;
