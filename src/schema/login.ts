import { z } from 'zod';

export const LoginReqSchema = z.object({
    username: z.string().min(1, 'Username/Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginReqFormData = z.infer<typeof LoginReqSchema>;

export const LoginResSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
});

export type LoginResFormData = z.infer<typeof LoginResSchema>;
