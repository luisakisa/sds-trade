import { createAsyncThunk } from "@reduxjs/toolkit";
import { signIn } from "api/auth";

export const authMiddleware = createAsyncThunk(
  'auth/signIn',
  async ({ login, password }: { login: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await signIn(login, password);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
