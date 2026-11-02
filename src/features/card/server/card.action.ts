'use server';

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { CartResponse, CartResponseError } from "../types/cart.type";

export async function getCartItems():Promise<CartResponse | CartResponseError>{
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if(!token){
        return{
            status: 'fail',
            message: 'you are not logged in, please log in to get access'
        }
    }

    try{
        const options:AxiosRequestConfig ={
            url: `https://ecommerce.routemisr.com/api/v2/cart`,
            method: 'GET',
            headers:{
                token:token?.value
            }
        }

        const {data} = await axios.request(options)
        console.log(data);
        return data;
        
    } catch(error){
        console.log(error);
        return{
            status: 'fail',
            message: 'something went wrong, try again later' 
        }
        
    }
}



export async function addProductToCart(id:string):Promise<CartResponse | CartResponseError>{
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if(!token){
        return{
            status: 'fail',
            message: 'you are not logged in, please log in to get access'
        }
    }

    try{
        const options:AxiosRequestConfig ={
            url: `https://ecommerce.routemisr.com/api/v2/cart`,
            method: 'POST',
            headers:{
                token: token.value
            },
            data:{
                productId: id
            }
        }

         const {data} = await axios.request(options)
        console.log(data);
        return data;
        
    } catch(error){
        console.log(error);
        return{
            status: 'fail',
            message: 'something went wrong, try again later' 
        }
        
    
    }
}


export async function removeFromCart(id:string):Promise<CartResponse | CartResponseError>{
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if(!token){
        return{
            status: 'fail',
            message: 'you are not logged in, please log in to get access'
        }
    }

    try{
        const options:AxiosRequestConfig ={
            url: `https://ecommerce.routemisr.com/api/v2/cart/${id}`,
            method: 'DELETE',
            headers:{
                token: token.value
            }
        }

         const {data} = await axios.request(options)
        console.log(data);
        return data;
        
    } catch(error){
        console.log(error);
        return{
            status: 'fail',
            message: 'something went wrong, try again later' 
        }
        
    
    }
}


export async function clearCart():Promise<CartResponse | CartResponseError>{
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if(!token){
        return{
            status: 'fail',
            message: 'you are not logged in, please log in to get access'
        }
    }

    try{
        const options:AxiosRequestConfig ={
            url: `https://ecommerce.routemisr.com/api/v2/cart`,
            method: 'DELETE',
            headers:{
                token: token.value
            }
        }

         const {data} = await axios.request(options)
        console.log(data);
        return data;
        
    } catch(error){
        console.log(error);
        return{
            status: 'fail',
            message: 'something went wrong, try again later' 
        }
        
    
    }
}



export async function updateProductQuantity(productId:string, count:number){
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || null

    if(!token){
        throw new Error('authentication required')
    }

    try{
        const options:AxiosRequestConfig ={
            url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            method: 'PUT',
            headers:{
                token
            },
            data:{
                count
            }
        }

         const {data} = await axios.request(options)
        console.log(data);
        return data;
        
    } catch(error){
        console.log(error);
        throw error
        
    
    }
}