'use server';

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import type { UserOrdersResponse } from "../types/order.types";

export async function getUserOrders({id}:{id:string}):Promise<UserOrdersResponse>{
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || null;

    if(!token){
        throw new Error('authentication required')
    }

    try{
        const options:AxiosRequestConfig= {
            url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
            method:'GET',
        };

        const {data} = await axios.request<UserOrdersResponse>(options);
        return data;
    }catch(error){
        throw error;
    }
}