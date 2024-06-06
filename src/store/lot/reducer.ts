import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { List } from "interfaces/lots";
import { lotMiddleware } from "store/middlewares";

const initialLotState: List = {
  positions: [],
  requests: [],
  files: [],
  rules: [],
  lot: {
    id: 0,
    canOwnWay: false,
    closeDate: "",
    groupEts: "",
    lotCreator: "",
    filePath: "",
    name: "",
    openDate: "",
    rules: {
      comment: "",
      paymentMethodId: 0,
      shippingMethodId: 0,
    },
    status: "",
  },
};

export const list = createSlice({
  name: "list",
  initialState: initialLotState,
  reducers: {
    completeLot(state, action: PayloadAction<number>) {
     state.lot.status = "Завершен";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(lotMiddleware.fulfilled, (_state, action) => {
      return action.payload;
    });
  },
});
