'use server';

import { apiClient } from "@/shared/services/apiClient";
import { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { userInfo } from "os";

export async function setToken(token: string):Promise<void>{
    const cookieStore = await cookies()
    cookieStore.set('token', token, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true
    })
}



export async function getToken():Promise<string|null>{
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    if(!token) return null;

    return token?.value
}


export async function deleteToken():Promise<void>{
    const cookieStore = await cookies()
    cookieStore.delete('token')
}


export async function verifyTooken(){
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if(!token){
        return{
            isAuthenticated:false,
            userInfo: null

        }
    }

    try{
        const option:AxiosRequestConfig ={
            url:'/auth/verifyToken',
            method: 'GET',
            headers:{
                token: token.value
            }
        }

        const {data} = await apiClient.request(option)
        if(data.message === 'verified'){
            return{
                isAuthenticated:true,
                userInfo:{
                    id: data.decoded.id,
                    name: data.decoded.name,
                    email: data.decoded.email,
                    phone: data.decoded.phone,
                    role: data.decoded.role
                }
            }
        }
        return{
            isAuthenticated: false,
            userInfo: null
        }

    } catch(error){
        return{
            isAuthenticated: false,
            userInfo: null
        }
    }
}