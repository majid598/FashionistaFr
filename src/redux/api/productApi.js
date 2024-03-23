import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/product/",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    newProduct: builder.mutation({
      query: (product) => ({
        url: "new",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),
    getAllProducts: builder.query({
      query: () => "all",
      providesTags: ["Products"],
    }),
  }),
});

export const { useNewProductMutation, useGetAllProductsQuery } = productApi;
