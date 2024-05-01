import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SupplierSpecialist } from "interfaces/signUp";

const initialState: SupplierSpecialist = {
  email: "",
  password: "",
  groupEtsId: [],
};

export const SupplierSpecialistSlice = createSlice({
  name: "supplierSpecialists",
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setGroupEtsId(state, action: PayloadAction<number[]>) {
      state.groupEtsId = action.payload;
    },
  },
});
