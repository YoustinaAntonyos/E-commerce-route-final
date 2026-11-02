import { apiClient } from "@/shared/services/apiClient";
import { AxiosRequestConfig } from "axios";
import { Product } from "../types/products.type";

export interface ProductApiResponse {
  status: string;
  data: Product;
}

export default async function getProductById(productId: string): Promise<Product> {
  const options: AxiosRequestConfig = {
    url: `/products/${productId}`,
    method: "GET",
  };

  const { data } = await apiClient.request<ProductApiResponse>(options);
  return data.data;
}
