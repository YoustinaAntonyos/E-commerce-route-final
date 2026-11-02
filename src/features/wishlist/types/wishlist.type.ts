export interface WishlistProduct {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  priceAfterDiscount?: number;
  quantity: number;
  category?: {
    name: string;
  };
}

export interface WishlistResponse {
  status: "success";
  message?: string;
  count?: number;
  data: WishlistProduct[];
}

export interface WishlistMutationResponse {
  status: "success";
  message?: string;
  data?: WishlistProduct[];
}

export interface WishlistErrorResponse {
  status: "fail" | "error";
  message: string;
}

export interface WishlistState {
  status: string;
  message: string;
  data: WishlistProduct[];
}
