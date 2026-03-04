import { createSlice } from "@reduxjs/toolkit";
import {
  createRaistComplaint,
  createRequestRevision,
} from "../thunks/orderThunks";

const orderSlice = createSlice({
  name: "order",
  initialState: {},
  extraReducers(builder) {
    builder
      // Raise complaint order
      .addCase(createRaistComplaint.fulfilled, (state, action) => {
        console.log("Raise Complaint Response", action.payload);
      });

    // create request revision
    builder.addCase(createRequestRevision.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  },
});
export default orderSlice;
