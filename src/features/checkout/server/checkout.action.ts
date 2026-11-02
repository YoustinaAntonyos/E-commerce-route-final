'use server';

import axios, { AxiosRequestConfig } from "axios";
import { cookies, headers } from "next/headers";
import { shippingAddress } from "../schema/checkout.schema";


// type shippingAddress ={
//     details: string;
//         phone: string;
//         city: string;
// }

export async function createCashOrder({cartId, shippingAddress}:{cartId:string, shippingAddress:shippingAddress}){

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value || null

    if(!token){
        throw new Error("authentication required")
    }

    try{
        const options:AxiosRequestConfig={
            url:`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
            method: 'POST',
            headers:{
                token
            },
            data:{
                shippingAddress
            }
        }

        const {data} = await axios.request(options)
        return data;
    }catch(error){
        throw error
    }
}


export async function createOnlineOrder({cartId, shippingAddress}:{cartId:string, shippingAddress:shippingAddress}){

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value || null

    if(!token){
        throw new Error("authentication required")
    }

    const origin = (await headers()).get("origin")
    if (!origin) {
        throw new Error("Unable to determine the checkout origin")
    }

    const options:AxiosRequestConfig={
        url:`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(origin)}`,
        method: 'POST',
        headers:{
            token
        },
        data:{
            shippingAddress
        }
    }

    const {data} = await axios.request(options)
    return data;
}