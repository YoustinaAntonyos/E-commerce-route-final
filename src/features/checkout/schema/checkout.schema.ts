import z from "zod";


export const shippingAddress = z.object({
    details:z
    .string()
    .nonempty()
    .min(10,'address must be at least 10 characters long')
    .max(200,'address must be at most 200 characters long'),
    
    phone:z
    .string()
    .nonempty()
    .regex(/^(\+2)?01[0125][0-9]{8}$/,'invalid egyptian phone number'),

    city:z
    .string()
    .nonempty()
    .min(2, 'city must be at least 2 characters long')
    .max(50, 'city must be at most 50 characters long'),
})

export type shippingAddress = z.infer<typeof shippingAddress>