import { createSlice } from "@reduxjs/toolkit";
import type { IProductsSlice } from "../types/product.type";



export const PRODUCTS_SLICE_NAME = "products";

const initialState: IProductsSlice = {
  products: [],
  selectedProduct: null,
};

const productsSlice = createSlice({
  name: PRODUCTS_SLICE_NAME,
  initialState,
  reducers: {
    setProductsSlice: (state, action) => {
      return { ...state, ...action.payload };
    },
    setSelectedProductSlice: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
});

export const {
  setProductsSlice,
  setSelectedProductSlice,
  clearSelectedProduct,
} = productsSlice.actions;

export const selectProducts = (state: { [PRODUCTS_SLICE_NAME]: IProductsSlice }) =>
  state[PRODUCTS_SLICE_NAME];

export default productsSlice.reducer;
