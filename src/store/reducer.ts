import { persistReducer } from "redux-persist";
import { supplierProperties } from "store/supplierProperties/reducer";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { auth } from "./auth/reducer";
import { lots } from "./lots/reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const generalReducer = combineReducers({
  supplierProperties: supplierProperties.reducer,
  auth: auth.reducer,
  lots: lots.reducer,
});

export default persistReducer(persistConfig, generalReducer);
