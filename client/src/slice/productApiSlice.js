import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `/api/upload`,
                method: 'POST',
                body: data,
            }),
        })
    })

})

export const {useUploadProductImageMutation} = productsApiSlice