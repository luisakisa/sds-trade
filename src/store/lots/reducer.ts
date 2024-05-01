import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Lot } from "interfaces/lots";
import { lotsMiddleware } from "store/middlewares";

const initialLotState: Lot[] = [];


export const lots = createSlice({
  name: "lots",
  initialState: initialLotState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(lotsMiddleware.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});
