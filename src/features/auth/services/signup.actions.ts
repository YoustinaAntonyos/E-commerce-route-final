'use server';

import z, { success } from "zod";
import { signupSchema, SignupValue } from "../schema/signup.schema";
import { AxiosRequestConfig, isAxiosError } from "axios";
import { apiClient } from "@/shared/services/apiClient";


type SignupFieldErrors = Partial<Record<keyof SignupValue, string[]>>

type SignupActionResult = 
{success: true, message: string} | {success: false, message: string, fieldErrors?: SignupFieldErrors}


export async function signupAction(values: SignupValue):Promise<SignupActionResult>{
    const validationResult =signupSchema.safeParse(values)

    if(validationResult.success === false){
        const { formErrors, fieldErrors} = z.flattenError(validationResult.error)

        return{
            success: false,
            message: formErrors[0] ?? 'fix highlited errors',
            fieldErrors
        }
    }


    try{
        const options:AxiosRequestConfig ={
            method: 'POST',
            url:`/auth/signup`,
            data: validationResult.data
        }
        await apiClient.request(options)
        return{
            success: true,
            message: 'acount created successfully'
        }

    }catch(error){
        if(isAxiosError(error)){
            return{
                success: false,
                message: error.response?.data.message ?? 'can not reach server, try again later'
            }
        }

        return{
            success: false,
            message: 'something went wrong'
        }
    }

}