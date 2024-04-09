import { createAsyncThunk } from "@reduxjs/toolkit";
import { signIn } from "api/auth";
import { getLots } from "api/lots";

export const authMiddleware = createAsyncThunk(
  "auth/signIn",
  async (
    { login, password }: { login: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await signIn(login, password);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const lotsMiddleware = createAsyncThunk(
  "lots/getLots",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getLots();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
