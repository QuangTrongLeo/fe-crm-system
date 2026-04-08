import { z } from "zod";

export const NoteResponseSchema = z.object({
    id: z.number(),
    customerId: z.number(),
    customerName: z.string(),
    userId: z.number(),
    userName: z.string(),
    content: z.string(),
    isImportant: z.boolean(),
    createdAt: z.string(),
});

export type NoteResponseFormData = z.infer<typeof NoteResponseSchema>;

export const CreateNoteReqSchema = z.object({
    customerId: z.number(),
    userId: z.number(),
    content: z.string(),
    isImportant: z.boolean(),
})

export type CreateNoteReqFormData = z.infer<typeof CreateNoteReqSchema>;