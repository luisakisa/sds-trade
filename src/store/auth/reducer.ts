import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { authMiddleware } from "store/middlewares";

export enum Role {
  Admin = "Admin",
  Supplier = "Supplier",
  SupplierSpecialist = "Supplier Specialist",
}

export interface Auth {
  isAuthenticated: boolean;
  token: string | undefined;
  role: Role.Admin | Role.Supplier | Role.SupplierSpecialist | undefined;
  email: string | undefined;
}

const initialState: Auth = {
  isAuthenticated: false,
  token: undefined,
  role: undefined,
  email: undefined,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.email = undefined;
      state.isAuthenticated = false;
      state.token = undefined;
      state.role = undefined;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authMiddleware.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.role = action.payload.role;
    });

    builder.addCase(authMiddleware.rejected, (state) => {
      state.isAuthenticated = false;
      state.token = undefined;
    });
  },
});
