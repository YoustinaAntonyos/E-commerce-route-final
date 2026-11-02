'use server'

import z from "zod";
import { loginschema, LoginValues } from "../schema/login.schema";
import { AxiosRequestConfig, isAxiosError } from "axios";
import { apiClient } from "@/shared/services/apiClient";


type LoginFieldErrors = Partial<Record<keyof LoginValues, string[]>>
type LoginResponse = {
    message: string;
    user:{
        _id?: string;
        name: string;
        email: string;
        role: string;
        phone?: string;
    };
    token: string;
}

type LoginActionResult = 
{success: true, message: string, data:LoginResponse} | {success: false, message: string, fieldErrors?: LoginFieldErrors}

function getErrorMessage(data: unknown): string | undefined {
    if (typeof data === "string" && data.trim()) {
        return data;
    }

    if (data && typeof data === "object" && "message" in data) {
        const message = data.message;
        if (typeof message === "string" && message.trim()) {
            return message;
        }
    }

    return undefined;
}

export async function loginAction(values:LoginValues):Promise<LoginActionResult>{
    const validationResult = loginschema.safeParse(values);

    if(!validationResult.success){
        const {formErrors, fieldErrors} =z.flattenError(validationResult.error);

        return{
            success: false,
            message: formErrors[0] ?? 'fix highlight errors',
            fieldErrors
        }
    }

    try{
        const option:AxiosRequestConfig ={
            url: '/auth/signin',
            method: 'POST',
            data: validationResult.data
        }

        const {data} = await apiClient.request(option)

        return{
            success: true,
            message: 'user logged in successfully',
            data,
        }
    } catch(error){
        if(isAxiosError(error)){
            const message = getErrorMessage(error.response?.data);
            return{
                success: false,
                message: message
                    ?? (error.response
                        ? `Login failed with status ${error.response.status}. Please try again.`
                        : error.code === "ECONNABORTED"
                            ? "The login server took too long to respond. Please try again."
                            : "Unable to connect to the login server. Check your connection and try again.")
            }
        }

        return{
            success:false,
            message: 'something went wrong'
        }
    }
}