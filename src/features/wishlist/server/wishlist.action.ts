'use server';

import axios from "axios";
import { cookies } from "next/headers";
import { apiClient } from "@/shared/services/apiClient";
import {
  WishlistErrorResponse,
  WishlistMutationResponse,
  WishlistResponse,
} from "../types/wishlist.type";

async function getWishlistToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value ?? null;
}

function isValidProductId(productId: string): boolean {
  return /^[a-f\d]{24}$/i.test(productId);
}

export async function getWishlistItems(): Promise<
  WishlistResponse | WishlistErrorResponse
> {
  const token = await getWishlistToken();
  if (!token) {
    return {
      status: "fail",
      message: "You must be signed in to view your wishlist.",
    };
  }

  try {
    const { data } = await apiClient.get<WishlistResponse>("/wishlist", {
      headers: { token },
    });
    return data;
  } catch (error) {
    console.error("Loading wishlist failed:", error);
    return {
      status: "error",
      message: "Unable to load your wishlist. Please try again.",
    };
  }
}

export async function addToWishlist(
  productId: string,
): Promise<WishlistMutationResponse | WishlistErrorResponse> {
  if (!isValidProductId(productId)) {
    return {
      status: "fail",
      message: "A valid product is required to update your wishlist.",
    };
  }

  const token = await getWishlistToken();
  if (!token) {
    return {
      status: "fail",
      message: "You must be signed in to update your wishlist.",
    };
  }

  try {
    const { data } = await apiClient.post<WishlistMutationResponse>(
      "/wishlist",
      { productId },
      { headers: { token } },
    );
    return data;
  } catch (error) {
    console.error("Adding product to wishlist failed:", error);
    return {
      status: "error",
      message: axios.isAxiosError(error)
        ? error.response?.data?.message || "Unable to update your wishlist."
        : "Unable to update your wishlist.",
    };
  }
}

export async function removeFromWishlist(
  productId: string,
): Promise<WishlistMutationResponse | WishlistErrorResponse> {
  if (!isValidProductId(productId)) {
    return {
      status: "fail",
      message: "A valid product is required to update your wishlist.",
    };
  }

  const token = await getWishlistToken();
  if (!token) {
    return {
      status: "fail",
      message: "You must be signed in to update your wishlist.",
    };
  }

  try {
    const { data } = await apiClient.delete<WishlistMutationResponse>(
      `/wishlist/${productId}`,
      { headers: { token } },
    );
    return data;
  } catch (error) {
    console.error("Removing product from wishlist failed:", error);
    return {
      status: "error",
      message: axios.isAxiosError(error)
        ? error.response?.data?.message || "Unable to update your wishlist."
        : "Unable to update your wishlist.",
    };
  }
}
