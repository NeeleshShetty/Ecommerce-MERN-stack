import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slice/apiSlice";
import { get } from "mongoose";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]:apiSlice.reducer
  },
  middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware),
  devTools:true
});

export default store;
