import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import filterProductReducer from "./slices/filterProductSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    filterPr: filterProductReducer,
  },
});
