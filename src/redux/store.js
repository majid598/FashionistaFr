import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import { notificationReducer, productReducer } from "./reducers/productReducer";
import authSlice from "./reducers/userReducer";
import cartReducer from "./reducers/cartReducer";

export const server = "http://localhost:5000";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [cartReducer.name]: cartReducer.reducer,
    [productReducer.name]: productReducer.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (mid) => [...mid(), api.middleware],
});
