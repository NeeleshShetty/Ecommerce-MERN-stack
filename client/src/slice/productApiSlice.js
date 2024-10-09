import { PRODUCTS_URL, UPLOADURL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: ({ keyword, pageNumber }) => ({
				url: PRODUCTS_URL,
				params: { keyword, pageNumber },
			}),
			keepUnusedDataFor: 5,
			providesTags: ['Products'],
		}),
		
		uploadProductImage: builder.mutation({
			query: (data) => ({
				url: `${UPLOADURL}`,
				method: 'POST',
				body: data,
			}),
		}),
		getTopProducts: builder.query({
			query: () => `${PRODUCTS_URL}/top`,
			keepUnusedDataFor: 5,
		}),
	}),
});

export const {
	useGetProductsQuery,
	// useGetProductDetailsQuery,
	// useCreateProductMutation,
	// useUpdateProductMutation,
	useUploadProductImageMutation,
	// useDeleteProductMutation,
	// useCreateReviewMutation,
	useGetTopProductsQuery,
} = productsApiSlice;
