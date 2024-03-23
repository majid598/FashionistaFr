import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productApi";
import { productReducer } from "./reducers/productReducer";
import { userReducer } from "./reducers/userReducer";
import { userApi } from "./api/userApi";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [productReducer.name]: productReducer.reducer,
    [userApi.name]: userApi.reducer,
    [userReducer.name]: userReducer.reducer,
  },
  middleware: (mid) => [...mid(), productApi.middleware, userApi.middleware],
});
