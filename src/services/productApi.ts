/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "../types/product.type";
import { setProductsSlice } from "../features/productSlice";

const BASE_URL = "http://localhost:4000"; 

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      providesTags: ["Products"],
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProductsSlice({ products: data }));
        } catch (error: any) {
          console.error("Failed to fetch products:", error?.data?.message);
        }
      },
    }),

    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProductsSlice({ products: [data] })); // optional
        } catch (error: any) {
          console.error("Failed to add product:", error?.data?.message);
        }
      },
    }),

    updateProduct: builder.mutation<Product, Product>({
      query: ({ id, ...body }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Products"],
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProductsSlice({ products: [data] })); // optional
        } catch (error: any) {
          console.error("Failed to update product:", error?.data?.message);
        }
      },
    }),

    deleteProduct: builder.mutation<{ id: number }, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(setProductsSlice({ products: [] })); // optional
        } catch (error: any) {
          console.error("Failed to delete product:", error?.data?.message);
        }
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
