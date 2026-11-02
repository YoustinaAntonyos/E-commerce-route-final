import { apiClient } from "@/shared/services/apiClient";
import axios, { AxiosRequestConfig } from "axios";
import { CategoriesApiResponse } from "../types/categories.type";

export async function getAllCategories():Promise<CategoriesApiResponse>{
    try {
        const options:AxiosRequestConfig= {
            url: '/categories',
            method: 'GET'
        }
        const {data} = await apiClient.request<CategoriesApiResponse>(options)

        return data
    } catch (error) {
        console.error("Loading categories failed:", error);
        return {
            results: 0,
            metadata: { currentPage: 1, numberOfPages: 0, limit: 0 },
            data: [],
            error: axios.isAxiosError(error)
                ? error.response?.data?.message || "Unable to load categories."
                : "Unable to load categories.",
        };
    }
}
