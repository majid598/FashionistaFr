import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/product/",
  }),
  endpoints: (builder) => ({
    newProduct: builder.mutation({
      query: (product) => ({
        url: "new",
        method: "POST",
        body: product,
      }),
    }),
  }),
});

export const { useNewProductMutation } = productApi;
