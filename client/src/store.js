import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./slice/cartSlice";
import authSliceReducer from './slice/authSlice'

const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    auth: authSliceReducer
  },
})

export default store;
