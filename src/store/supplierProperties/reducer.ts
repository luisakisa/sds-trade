import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SupplierProperties } from "interfaces/signUp";

const initialState: SupplierProperties = {
  email: "",
  password: "",
  type_of_business: 0,
  company: "",
  first_name: "",
  middle_name: "",
  last_name: "",
  phone_number: null,
  region_or_address: "",
  NDS: false,
  site: null,
  INN: 0,
  KPP: 0,
  groupEtsId: [],
};

export const supplierProperties = createSlice({
  name: "supplierProperties",
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setTypeOfBusiness(state, action: PayloadAction<number>) {
      state.type_of_business = action.payload;
    },
    setCompany(state, action: PayloadAction<string>) {
      state.company = action.payload;
    },
    setFirstName(state, action: PayloadAction<string>) {
      state.first_name = action.payload;
    },
    setMiddleName(state, action: PayloadAction<string>) {
      state.middle_name = action.payload;
    },
    setLastName(state, action: PayloadAction<string>) {
      state.last_name = action.payload;
    },
    setPhoneNumber(state, action: PayloadAction<string | null>) {
      state.phone_number = action.payload;
    },
    setRegionOrAddress(state, action: PayloadAction<string>) {
      state.region_or_address = action.payload;
    },
    setNDS(state, action: PayloadAction<boolean>) {
      state.NDS = action.payload;
    },
    setSite(state, action: PayloadAction<string | null>) {
      state.site = action.payload;
    },
    setINN(state, action: PayloadAction<number>) {
      state.INN = action.payload;
    },
    setKPP(state, action: PayloadAction<number>) {
      state.KPP = action.payload;
    },
    setGroupEtsId(state, action: PayloadAction<number[]>) {
      state.groupEtsId = action.payload;
    },
  },
});
