import { configureStore } from '@reduxjs/toolkit';
import cartSliceReducer from './slice/cartSlice';
import authSliceReducer from './slice/authSlice';
import { apiSlice } from './slice/apiSlice';

const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		cart: cartSliceReducer,
		auth: authSliceReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});

export default store;
