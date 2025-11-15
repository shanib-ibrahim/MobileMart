import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { productsApi } from "../services/productApi";
import productsSlice, { PRODUCTS_SLICE_NAME } from "../features/productSlice";

const rootReducer = combineReducers({
  // RTK Query reducer
  [productsApi.reducerPath]: productsApi.reducer,

  // Custom slice
  [PRODUCTS_SLICE_NAME]: productsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(productsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
