import { z } from "zod";

export const RegisterRequestSchema = z.object({
    username: z.string(),
    fullName: z.string(),
    email: z.string(),
    password: z.string(),
});

export type RegisterRequestFormData = z.infer<typeof RegisterRequestSchema>;