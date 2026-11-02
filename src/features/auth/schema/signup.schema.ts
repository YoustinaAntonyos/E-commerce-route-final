// import { error } from "console";
import z from "zod";

export const signupSchema = z.object({
    name: z.string().min(1,{error: 'name is required'}),
    email: z.email({error: 'email is invalid, please try another one'}).min(1, {error: 'email is required'}),
    password: z.string().min(1, {error: 'password is required'})
    .regex(/[A-Z]/,{ error: 'password must contains at least 1 uppercase letter'})
    .regex(/[a-z]/,{ error: 'password must contains at least 1 lowercase letter'})
    .regex(/[0-9]/,{ error: 'password must contains at least 1 number'})
    .regex(/[@#$%^&*!_]/,{ error: 'password must contains at least 1 of the following special character @,#,$,%,^,&,*,!,_'}),
    rePassword: z.string().min(1,{error: 'confirm password is required'}),
    phone: z.string().min(1,{error: 'phone is required'})
    .regex(/^01[0125][0-9]{8}$/, {error: 'we only accept egyptian phone numbers'}) 
}).refine((data)=> data.password === data.rePassword, {
    error: 'password and confirm password should be the same',
    path: ['rePassword']
})


export type SignupValue = z.infer <typeof signupSchema>