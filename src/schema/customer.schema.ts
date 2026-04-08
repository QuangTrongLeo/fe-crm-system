import { z } from 'zod';

export const CustomerResponseSchema = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phone: z.string(),
    company: z.string(),
    status: z.string(),
    assignedUserId: z.number(),
});

export type CustomerResponseFormData = z.infer<typeof CustomerResponseSchema>;


export const CreateCustomerReqSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phone: z.string(),
    company: z.string(),
    status: z.string(),
})

export type CreateCustomerReqFormData = z.infer<typeof CreateCustomerReqSchema>;
