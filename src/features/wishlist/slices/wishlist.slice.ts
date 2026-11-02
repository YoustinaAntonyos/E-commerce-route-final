import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  WishlistProduct,
  WishlistState,
  WishlistResponse,
} from "../types/wishlist.type";

export const wishlistInitialValues: WishlistState = {
  status: "success",
  message: "",
  data: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: wishlistInitialValues,
  reducers: {
    setWishlistInfo: (state, action: PayloadAction<WishlistResponse>) => {
      state.status = action.payload.status;
      state.message = action.payload.message || "";
      state.data = action.payload.data;
    },
    setWishlistProducts: (state, action: PayloadAction<WishlistProduct[]>) => {
      state.status = "success";
      state.message = "";
      state.data = action.payload;
    },
    setWishlistError: (
      state,
      action: PayloadAction<{ status: string; message: string }>,
    ) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
    resetWishlist: (state) => {
      state.status = wishlistInitialValues.status;
      state.message = wishlistInitialValues.message;
      state.data = [];
    },
  },
});

export const wishlistReducer = wishlistSlice.reducer;
export const wishlistActions = wishlistSlice.actions;
