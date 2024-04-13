import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
  }),
  tagTypes: ["Product", "Notification", "User"],
  endpoints: (builder) => ({
    newProduct: builder.mutation({
      query: (product) => ({
        url: "product/new",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    getAllProducts: builder.query({
      query: () => "product/all",
      providesTags: ["Product"],
    }),
    getProductById: builder.query({
      query: (id) => `product/${id}`,
      providesTags: ["Product"],
    }),
    getAllNotifications: builder.query({
      query: () => "notification/all",
      providesTags: ["Notification"],
    }),
    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `notification/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),
    getAllUsers: builder.query({
      query: () => "user/all",
      providesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (id) => `user/admin/${id}`,
      providesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `admin/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useNewProductMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetAllNotificationsQuery,
  useDeleteNotificationMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useDeleteProductMutation
} = api;
