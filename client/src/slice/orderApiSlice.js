import { apiSlice } from './apiSlice';
import { ORDERS_URL, PAYPAL_URL } from '../constants';

export const orderApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		payOrder: builder.mutation({
			query: ({ orderId, details }) => ({
				url: `${ORDERS_URL}/${orderId}/pay`,
				method: 'PUT',
				body: details,
			}),
		}),
		getPaypalClientId: builder.query({
			query: () => ({
				url: PAYPAL_URL,
			}),
			keepUnusedDataFor: 5,
		}),
	}),
});


export const {
	usePayOrderMutation,
	useGetPaypalClientIdQuery,
} = orderApiSlice;