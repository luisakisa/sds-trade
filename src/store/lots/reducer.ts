import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Lot } from "interfaces/lots";
import { lotsMiddleware } from "store/middlewares";

const initialLotState: Lot[] = [];

export const lots = createSlice({
  name: "lots",
  initialState: initialLotState,
  reducers: {
    completeLot(state, action: PayloadAction<number>) {
      const foundLot = state.find((lot) => lot?.id === Number(action.payload));
      if (foundLot) {
        foundLot.status = "complete";
      }
    },
  },  
  extraReducers: (builder) => {
    builder.addCase(lotsMiddleware.fulfilled, (_state, action) => {
      return action.payload;
    });
  },
});
