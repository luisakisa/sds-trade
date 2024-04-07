import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authMiddleware } from "store/middlewares";

enum Role {
  Admin = "Admin",
  Supplier = "Supplier",
  SupplierSpecialist = "Supplier Specialist",
}

export interface Auth {
  isAuthenticated: boolean;
  token: string | undefined;
  role: Role.Admin | Role.Supplier | Role.SupplierSpecialist | undefined;
}

const initialState: Auth = {
  isAuthenticated: false,
  token: undefined,
  role: undefined,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authMiddleware.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.role = action.payload.role;
    });

    builder.addCase(authMiddleware.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.token = undefined;
    });
  },
});