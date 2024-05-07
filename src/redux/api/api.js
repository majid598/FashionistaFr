import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const server = import.meta.env.VITE_SERVER;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/`,
  }),
  tagTypes: ["Product", "Notification", "User", "Order"],
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
    userUpload: builder.mutation({
      query: (profile) => ({
        url: "user/upload",
        method: "POST",
        body: profile,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `admin/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    editUserRole: builder.mutation({
      query: (data) => ({
        url: `admin/user/role`,
        method: "PUT",
        body: data,
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
    createOrder: builder.mutation({
      query: (body) => ({
        url: "order/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
    getAllOrders: builder.query({
      query: () => "order/all",
      providesTags: ["Order"],
    }),
    cancelOrder: builder.mutation({
      query: (id) => ({
        url: `order/cancel/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Order"],
    }),
    cancelations: builder.query({
      query: (id) => `order/cancelations?id=${id}`,
      providesTags: ["Order"],
    }),
    getAdminSingleOrder: builder.query({
      query: (id) => `admin/order/${id}`,
      providesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation({
      query: (id) => ({
        url: `order/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Order"],
    }),
    getUserOrders: builder.query({
      query: (id) => `order/my?id=${id}`,
      providesTags: ["Orders"],
    }),
    getUserSingleOrder: builder.query({
      query: (id) => `order/${id}`,
      providesTags: ["Orders"],
    }),
    getAllCategories: builder.query({
      query: () => `product/categories`,
      providesTags: ["Product"],
    }),
    addReview: builder.mutation({
      query: (reviewData) => ({
        url: `review/add`,
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["Product"],
    }),
    getOtherUserProfile: builder.query({
      query: (id) => `user/other/${id}`,
      providesTags: ["User"],
    }),
    getOtherUserProfilePic: builder.query({
      query: (id) => `user/other/${id}/profile`,
      providesTags: ["User"],
    }),
    updateProduct: builder.mutation({
      query: (productDetails) => ({
        url: `product/update`,
        method: "PUT",
        body: productDetails,
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
  useUserUploadMutation,
  useDeleteUserMutation,
  useEditUserRoleMutation,
  useDeleteProductMutation,
  useCreateOrderMutation,
  useCancelOrderMutation,
  useGetAllOrdersQuery,
  useGetAdminSingleOrderQuery,
  useUpdateOrderStatusMutation,
  useGetUserOrdersQuery,
  useGetUserSingleOrderQuery,
  useGetAllCategoriesQuery,
  useAddReviewMutation,
  useGetOtherUserProfileQuery,
  useGetOtherUserProfilePicQuery,
  useUpdateProductMutation,
  useCancelationsQuery,
} = api;
