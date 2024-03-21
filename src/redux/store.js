import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productApi";
import { productReducer } from "./reducers/productReducer";

export const store = configureStore({
  reducer: {
    [productApi.name]: productApi.reducer,
    [productReducer.name]: productReducer.reducer,
  },
});
