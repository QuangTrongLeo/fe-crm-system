import { z } from "zod";

export const UserResponseSchema = z.object({
    id: z.number(),
    username: z.string(),
    fullName: z.string(),
    email: z.string(),
    role: z.string(),
});

export type UserResponseSchema = z.infer<typeof UserResponseSchema>;