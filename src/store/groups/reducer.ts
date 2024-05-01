import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Group } from "interfaces/groups";
import { groupsMiddleware } from "store/middlewares";

const initialState: Group[] = [];

export const groups = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(groupsMiddleware.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});
