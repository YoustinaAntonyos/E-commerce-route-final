import { apiClient } from "@/shared/services/apiClient";
import { AxiosRequestConfig } from "axios";
import { ProductsApiResponse } from "../types/products.type";


export default async function getAllProduct(categoryId?: string):Promise<ProductsApiResponse>{
const options:AxiosRequestConfig = {
    url: '/products',
    method: 'GET',
    params: categoryId ? { category: categoryId } : undefined,
}
const {data} = await apiClient.request(options)
return data
}