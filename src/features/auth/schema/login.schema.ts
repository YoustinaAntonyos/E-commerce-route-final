import z from "zod";

export const loginschema = z.object({
    email: z.string().min(1, {error:'email is required'})
    .pipe(z.email({error:'email in invalid, try another one'})),

    password: z.string().min(1, {error: 'password is required'})
        .regex(/[A-Z]/,{ error: 'password must contains at least 1 uppercase letter'})
        .regex(/[a-z]/,{ error: 'password must contains at least 1 lowercase letter'})
        .regex(/[0-9]/,{ error: 'password must contains at least 1 number'})
        .regex(/[@#$%^&*!_]/,{ error: 'password must contains at least 1 of the following special character @,#,$,%,^,&,*,!,_'}),
})

export type LoginValues = z.infer<typeof loginschema>