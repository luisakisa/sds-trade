import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { lotsMiddleware } from "store/middlewares";

export interface Request {
  id: number;
  quantity: number;
  price: number;
  name: string;
  deliveryTime: string;
  supplier: string;
}

export interface Position {
  id: number;
  name: string;
  quantity: number;
  price: number;
  requests: Request[];
  winner: string;
}

export interface Lot {
  id: number;
  name: string;
  endDate: string;
  startDate: string;
  status: string;
  possibility: boolean;
  recipient: string;
  positions: Position[];
  group: string;
  deliveryType: string;
  paymentType: string;
  comment: string;
}

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
