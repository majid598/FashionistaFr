import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/user/",
  }),
  endpoints: (builder) => ({
    newUser: builder.mutation({
      query: (user) => ({
        url: "new",
        method: "POST",
        body: user,
      }),
    }),
    // allProducts: builder.query({
    //   query: () => "all",
    // }),
  }),
});

export const { useNewUserMutation } = userApi;
