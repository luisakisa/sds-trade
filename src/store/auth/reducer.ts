import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Auth } from "interfaces/auth";
import { authMiddleware } from "store/middlewares";

const initialState: Auth = {
  isAuthenticated: false,
  token: undefined,
  role: undefined,
  email: undefined,
  id: undefined,
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
      state.email = action.payload.email;
      state.id = action.payload.id;
    });

    builder.addCase(authMiddleware.rejected, (state) => {
      state.isAuthenticated = false;
      state.token = undefined;
      state.email = undefined;
      state.role = undefined;
      state.id = undefined;
    });
  },
});
