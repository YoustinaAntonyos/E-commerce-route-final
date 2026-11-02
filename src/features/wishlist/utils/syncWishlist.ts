'use client';

import { AppDispatch } from "@/store/store";
import { getWishlistItems } from "../server/wishlist.action";
import { wishlistActions } from "../slices/wishlist.slice";
import { WishlistProduct } from "../types/wishlist.type";

export async function syncWishlist(
  dispatch: AppDispatch,
  fallbackProducts: WishlistProduct[],
): Promise<boolean> {
  dispatch(wishlistActions.setWishlistProducts(fallbackProducts));

  const response = await getWishlistItems();
  if (response.status !== "success") {
    return false;
  }

  dispatch(wishlistActions.setWishlistInfo(response));
  return true;
}
